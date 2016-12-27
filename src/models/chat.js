import firebase from '../utils/firebase';
import { fetch, send } from '../services/chat';
import { eventChannel } from 'redux-saga';
export default {

  namespace: 'chat',

  state: {},

  effects: {
    *loop({ payload }, { call, put, take }) {
      const cid = payload.cid;
      const conversationsRef = firebase.database().ref(`conversations/${cid}/chats`).limitToLast(100);
      conversationsRef.off();
      function firebaseChannel() {
        return eventChannel(emitter => conversationsRef.on('value', emitter));
      }

      const cann = yield call(firebaseChannel);
      while (true) {
        const chats = yield take(cann);
        yield put({
          type: 'conversations/message',
          payload: { chats, cid, type: 'chat' },
        });
      }
    },
    *sendMessage({ payload }, { call }) {
      yield call(send, payload);
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
