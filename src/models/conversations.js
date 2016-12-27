import { fetch, query, remove, createConversation, deleteConversation } from '../services/conversations';
import { initRobot } from '../services/robot';
import { eventChannel } from 'redux-saga';
// import { fetch } from '../services/chat';
import firebase from '../utils/firebase';
import pathToRegexp from 'path-to-regexp';
import getUserMeta from '../utils/getUserMeta';

function getConversations(list) {
  const conversations = [];
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
      const chatValue = list[key];
      conversations.push({
        from: 'chat',
        time: chatValue.time || Date.now(),
        type: 'text',
        content: chatValue.content,
        user: chatValue.user,
      });
    }
  }
  return conversations;
}
export default {

  namespace: 'conversations',

  state: { list: [], active: 0, filterValue: null },

  subscriptions: {
    autoStartChatSession({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathToRegexp('/chatroom').exec(pathname)) {
          dispatch({ type: 'enter', payload: 'default' });
        }
      });
    },
  },

  effects: {
    *enter({ payload }, { put }) {
      yield put({ type: 'users/loop' });
      yield put({ type: 'getDefaultChatRoom' });
    },
    *getDefaultChatRoom({ payload }, { put }) {
      const cid = 'default';
      yield put({
        type: 'save',
        payload: {
          user: {
            userId: 'chat-room-1',
            userName: '默认聊天室',
          },
          cid,
          type: 'sessionStart',
          conversations: [],
        },
      });
      yield put({ type: 'chat/loop', payload: { cid } });
    },
    *watch({ payload }, { call, put, take }) {
      const { uid } = payload.user;
      const conversationsRef = firebase.database().ref('conversations/')
        .orderByChild(`participants/${uid}/uid`)
        .equalTo(uid);

      function firebaseChannel() {
        return eventChannel(emitter => conversationsRef.on('value', emitter));
      }
      const cann = yield call(firebaseChannel);
      while (true) {
        const chats = yield take(cann);
        yield put({ type: 'update', payload: { chats, uid } });
      }
    },
    *add({ payload }, { call, put }) {
      const { from, to, cid } = payload;
      yield call(createConversation, { from, to });
      yield put({ type: 'chat/loop', payload: { cid } });
    },
    *loop({ payload }, { call, put }) {
      let i = 0;
      while (++i) {
        const result = yield call(query, i);
        const { content } = result.data;
        for (let j = 0; j < content.length; j++) {
          if (content[j].sessionType === 'robot') {
            const robotConfig = yield call(initRobot, content[j].robotParams);
            const robotParams = { ...content[j].robotParams, ...robotConfig.data.robotParams };
            yield put({
              type: 'save',
              payload: { ...content[j], robotParams, conversations: [
                { from: 'system', time: Date.now(), content: '已接入机器人。' },
                { from: 'robot', time: Date.now(), type: 'text', content: '您好，有什么可以帮您的么？' },
              ] },
            });
          } else {
            yield put({ type: 'save', payload: content[j] });
          }
        }
      }
    },
    *remove({ payload }, { call, put }) {
      const { sessionType, userId, cid } = payload;
      let result;
      if (sessionType === 'robot') {
        result = yield call(remove, { userId });
        if (result.data.success === true) {
          yield put({ type: 'removeItem', payload: userId });
        }
      } else {
        result = yield call(deleteConversation, { cid });
      }
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
    update(state, { payload }) {
      const list = [];
      payload.chats.forEach(value => {
        const chat = value.val();
        const cid = value.key;
        const userMeta = cid === 'default' ? {
          userId: 'chat-room-1',
          userName: '默认聊天室',
        } : getUserMeta(chat, payload.uid);
        list.unshift({
          ...userMeta,
          cid,
          sessionType: 'solo',
          conversations: getConversations(chat.chats),
        });
      });
      return { ...state, list };
    },
    save(state, { payload }) {
      const list = state.list.slice();
      const content = payload;
      switch (content.type) {
        case 'sessionStart':
          if (!list.find(item => item.userId === content.userId)) {
            list.push({
              cid: content.cid,
              userId: content.user.userId,
              userName: content.user.userName,
              avatar: content.avatar,
              sessionType: content.sessionType,
              robotParams: content.robotParams,
              conversations: content.conversations || [],
            });
          }
          break;
        default: break;
      }
      return { ...state, list };
    },
    userMessage(state, { payload }) {
      const list = state.list.map(item => {
        if (item.cid === payload.cid) {
          const conversations = item.conversations.slice();
          conversations.push({
            from: 'me',
            time: Date.now(),
            type: 'text',
            content: payload.message,
          });
          return { ...item, conversations };
        }
        return item;
      });
      return { ...state, list };
    },
    robotMessage(state, { payload }) {
      const list = state.list.map(item => {
        if (item.cid === payload.cid) {
          const conversations = item.conversations.slice();
          conversations.push({
            from: payload.type,
            time: payload.time || Date.now(),
            type: 'text',
            content: payload.content,
            user: payload.user,
          });
          return { ...item, conversations };
        }
        return item;
      });
      return { ...state, list };
    },
    message(state, { payload }) {
      const list = state.list.map(item => {
        if (item.cid === payload.cid) {
          const conversations = [];
          payload.chats.forEach(chat => {
            const chatValue = chat.val();
            conversations.push({
              from: chatValue.type,
              time: chatValue.time || Date.now(),
              type: 'text',
              content: chatValue.content,
              user: chatValue.user,
            });
          });

          return { ...item, conversations };
        }
        return item;
      });
      return { ...state, list };
    },
    setActive(state, { idx }) {
      return { ...state, active: idx };
    },
    removeItem(state, { payload }) {
      const list = state.list.filter(item => item.userId !== payload);
      return { ...state, list };
    },
    offline(state) {
      return { ...state, list: [] };
    },
    search(state, { payload }) {
      return { ...state, filterValue: payload };
    },
  },
};
