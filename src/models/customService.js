import { ONLINE, OFFLINE, online, offline } from '../services/customerService';

export default {

  namespace: 'customerService',

  state: { serviceName: '', status: OFFLINE },

  effects: {
    *online({ payload }, { call, put }) {
      const { data } = yield call(online);
      if (data.status === ONLINE) {
        yield put({
          type: 'customerServiceOnline',
          payload: {
            serviceName: data.serviceName,
            status: data.status,
          },
        });
        yield put({ type: 'conversations/loop' });
      }
    },
    *offline({ payload }, { call, put }) {
      const { data } = yield call(offline);
      if (data.status === OFFLINE) {
        yield put({
          type: 'customerServiceOnline',
          payload: {
            serviceName: data.serviceName,
            status: data.status,
          },
        });
        yield put({ type: 'conversations/offline' });
      }
    },
  },

  reducers: {
    customerServiceOnline(states, { payload }) {
      return { ...states, ...payload };
    },
  },
};
