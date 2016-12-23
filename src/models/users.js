import { fetch } from '../services/users';
import { eventChannel } from 'redux-saga';
export default {

  namespace: 'users',

  state: { users: [] },

  effects: {
    *loop({ payload }, { call, put, take }) {
      const conversationsRef = yield call(fetch);
      function firebaseChannel() {
        return eventChannel(emitter => conversationsRef.on('value', emitter));
      }

      const cann = yield call(firebaseChannel);
      while (true) {
        const value = yield take(cann);
        yield put({ type: 'fetch', payload: { ...value.val() } });
      }
    },
  },

  reducers: {
    fetch(state, { payload }) {
      const users = [];
      for (const user in payload) {
        if (payload.hasOwnProperty(user)) {
          users.push(payload[user]);
        }
      }
      return { ...state, users };
    },
  },
};
