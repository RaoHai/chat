import { eventChannel } from 'redux-saga';
import { CHAT_TAB, FRIEND_TAB } from '../constants';

export default {

  namespace: 'ui',

  state: { activeTab: CHAT_TAB },

  effects: {

  },

  reducers: {
    switchTab(state, { payload }) {
      return { ...state, activeTab: payload };
    },
  },
};
