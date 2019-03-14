import * as axios from 'axios';

export function setAuthToken(access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}
