import { sendMessage } from '../services/robot';

export default {

  namespace: 'robot',

  state: {},

  effects: {
    *sendMessage({ payload }, { call, put }) {
      yield put({ type: 'conversations/userMessage', payload });
      const { data } = yield call(sendMessage, payload);
      yield put({ type: 'conversations/message', payload: {
        cid: payload.cid,
        content: data.content,
        type: 'robot',
      } });
    },
  },

  reducers: {
    sendMessage(state) {
      return { ...state };
    },
  },
};
