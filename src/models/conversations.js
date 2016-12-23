import { query, remove } from '../services/conversations';
import { initRobot } from '../services/robot';
import { fetch } from '../services/chat';

export default {

  namespace: 'conversations',

  state: { list: [], active: 0, filterValue: null },

  effects: {
    *fetch({ payload }, { call }) {
      yield call(fetch);
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
    *remove({ userId }, { call, put }) {
      const result = yield call(remove, { userId });
      if (result.data.success === true) {
        yield put({ type: 'removeItem', payload: userId });
      }
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
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
    message(state, { payload }) {
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
