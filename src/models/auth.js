import firebase from '../utils/firebase';
import { login, logout, enterDefaultChatRoom } from '../services/chat';

const anonymouseUser = {
  displayName: `无名大侠-${(Math.random() * 1000).toFixed()}`,
  uid: Date.now(),
  photoURL: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
};


export default {
  namespace: 'auth',

  state: { user: firebase.auth().currentUser },

  effects: {
    *login({ payload }, { call, put }) {
      let provider;
      if (payload === 'google') {
        provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
      } else if (payload === 'github') {
        provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo');
      }
      let authResult;
      if (payload === 'anony') {
        authResult = yield call(() => firebase.auth().signInAnonymously());
      } else {
        authResult = yield call(() => firebase.auth().signInWithPopup(provider));
      }
      if (authResult) {
        const user = { ...anonymouseUser, ...authResult.user };
        yield call(login, user);
        yield call(enterDefaultChatRoom, user);
        yield put({ type: 'authed', payload: { ...authResult, user } });
        yield put({ type: 'conversations/watch', payload: { user } });
        yield put({ type: 'chat/watch', payload: { user } });

        window.onunload = function () {
          firebase.database().ref(`user/${user.uid}`).remove();
        };
      }
    },
    *logout({ payload }, { select, call }) {
      const state = yield select();
      const uid = state.auth.user.uid;
      if (uid) {
        yield call(logout, uid);
      }
    },
  },

  reducers: {
    authed(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
