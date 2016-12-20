import request from '../utils/request';

export async function query(times) {
  return request(`/api/fetchMessage?t=${times}`);
}

export async function remove({ userId }) {
  return request(`/api/visitorOffline/${userId}`);
}
