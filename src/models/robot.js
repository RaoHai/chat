import { sendMessage } from '../services/robot';

export default {

  namespace: 'robot',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *sendMessage({ payload }, { call, put }) {
      yield put({ type: 'conversations/userMessage', payload });
      const { data } = yield call(sendMessage, payload);
      yield put({ type: 'conversations/robotMessage', payload: {
        cid: payload.cid,
        content: data.content,
      }});
    },
  },

  reducers: {
    sendMessage(state, action) {

      return { ...state};
    },
  },

}
