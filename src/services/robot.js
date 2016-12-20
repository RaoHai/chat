import request from '../utils/request';
import qs from 'qs';

export async function initRobot(params) {
  return request(`/api/robot/init?${qs.stringify(params)}`);
}

export async function sendMessage(params) {
  return request('/api/robot/getanswer', {
    method: 'post',
    body: JSON.stringify({...params.robotParams, question: params.message }),
  });
}
