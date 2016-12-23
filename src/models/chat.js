import firebase from '../utils/firebase';
import pathToRegexp from 'path-to-regexp';
import { fetch, send } from '../services/chat';
import { eventChannel } from 'redux-saga';
export default {

  namespace: 'chat',

  state: {},

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
    *enter({ payload }, { call, put }) {
      const cid = Date.now();
      yield put({ type: 'conversations/save', payload: {
        user: {
          userId: 'chat-room-1',
          userName: '默认聊天室',
        },
        cid,
        type: 'sessionStart',
        conversations: [],
      } });
      yield put({ type: 'loop', payload: { cid } });
      yield put({ type: 'users/loop', payload: { cid } });
    },
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
    },
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
  },

}
