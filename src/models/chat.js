import firebase from '../utils/firebase';
import { fetch, send } from '../services/chat';
import { eventChannel } from 'redux-saga';
export default {

  namespace: 'chat',

  state: {},


  effects: {
    *loop({ payload }, { call, put, take }) {
      const cid = payload.cid;
      const conversationsRef = yield call(fetch);
      function firebaseChannel() {
        return eventChannel(emitter => conversationsRef.on('child_added', emitter))
      }

      const cann = yield call(firebaseChannel);
      while (true) {
        const value = yield take(cann);
        yield put({ type: 'conversations/message', payload: {...value.val(), cid, type: 'chat' } });
      }
    },
    *sendMessage({ payload }, { call, put }) {
      const sendResult = yield call(send, payload);
      console.log('>> sendMessage', sendResult);
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },

}
