import firebase from '../utils/firebase';
import { login, logout } from '../services/chat';

const anonymouseUser = {
  displayName: `无名大侠-${(Math.random() * 1000).toFixed()}`,
  uid: Date.now(),
  photoURL: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
};


export default {
  namespace: 'auth',

  state: { user: firebase.auth().currentUser },

  subscriptions: {
    unload({ dispatch }) {
      // window.onbeforeunload = function () {
      //   dispatch({ type: 'logout' });
      //   return false;
      // }
    },
  },

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
        const cid = Date.now();
        const user = { ...anonymouseUser, ...authResult.user };
        yield call(login, user);
        yield put({ type: 'authed', payload: { ...authResult, user } });
      }
    },
    *logout({ payload }, { select, call, put }) {
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

}
