import { query, remove } from '../services/conversations';
import { initRobot } from '../services/robot';

export default {

  namespace: 'conversations',

  state: { list: [], active: 0 },

  subscriptions: {

  },

  effects: {
    *loop({ payload }, { call, put }) {
      let i = 0;
      while (++i) {
        const result = yield call(query, i);
        const { content } = result.data;
        for (let j = 0; j < content.length; j++) {
          if (content[j].sessionType === 'robot') {
            const robotConfig = yield call(initRobot, content[j].robotParams);
            yield put({
              type: 'save',
              payload: { ...content[j], robotConfig: robotConfig.data, conversations: [
                { from: 'system', time: Date.now(), content: '已接入机器人。' },
                { from: 'robot', time: Date.now(), type: 'text', content: '您好，有什么可以帮您的么？'},
              ]},
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
          console.log('>> sessionUuid', content.robotConfig);
          if (!list.find(item => item.userId === content.userId)) {
            list.push({
              cid: content.cid,
              userId: content.user.userId,
              userName: content.user.userName,
              sessionType: content.sessionType,
              robotParams: {...content.robotParams, sessionUuid: content.robotConfig.data.sessionUuid },
              conversations: content.conversations || [],
            });
          }
          break;
        default: break;
      }
      return {...state, list };
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
          return {...item, conversations };
        }
        return item;
      });
      return {...state, list};
    },
    robotMessage(state, { payload }) {
      const list = state.list.map(item => {
        if (item.cid === payload.cid) {
          const conversations = item.conversations.slice();
          conversations.push({
            from: 'robot',
            time: Date.now(),
            type: 'text',
            content: payload.content,
          });
          return {...item, conversations };
        }
        return item;
      });
      return {...state, list};
    },
    setActive(state, { idx }) {
      return {...state, active: idx };
    },
    removeItem(state, { payload }) {
      const list = state.list.filter(item => item.userId !== payload);
      return {...state, list };
    },
    offline(state, { payload }) {
      return {...state, list: [] };
    }
  },

}
