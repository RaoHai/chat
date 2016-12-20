import request from '../utils/request';

export async function online() {
  return request('/api/customerService/online');
}

export async function offline() {
  return request('/api/customerService/offline');
}

export const ONLINE = 1;
export const OFFLINE = -1;
