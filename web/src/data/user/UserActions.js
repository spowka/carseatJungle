/* eslint-disable no-console */
import * as axios from 'axios';
import * as auth from '../../common/authorization.js';

export const LOGOUT = 'LOGOUT';
export const SET_USER_LOGGING_IN = '/user/set_logging_in';
export const SET_LOGGED_IN_USER = '/user/set_logged_in_user';
export const LOGIN_ERROR = '/user/login_error';
export const REGISTRATION_ERROR = '/user/registration_error';
export const RESET_PASSWORD_ERROR = '/user/reset_password_error';

export const LOAD_ROLES = '/user/load_user_roles';

export const SET_USERS_LOADING = '/user/set_users_loading';
export const LOAD_USERS = '/user/load_users';
export const ADD_USER = '/user/add_user';
export const REFRESH_USERS = '/user/refresh_users';
export const REMOVE_USER = '/user/remove_user';
export const SET_USER_DATA = '/user/set_user_data';

let CLIENT_ID = '12to6uxur1fhzkl5rhemhmcfb6qmvmljg059e61a';

export function setUserLoggingIn() {
  return {
    type: SET_USER_LOGGING_IN,
  };
}

export function setLoggedInUser(user) {
  return {
    type: SET_LOGGED_IN_USER,
    data: user,
  };
}

export function logout() {
  auth.setAuthToken(null);
  sessionStorage.setItem('access_token', '');
  localStorage.setItem('access_token', '');

  return {
    type: LOGOUT,
  };
}

export function loginWithToken(accessToken) {
  return function(dispatch) {
    var data = new FormData();
    data.append('access_token', accessToken);
    data.append('client_id', CLIENT_ID);

    return axios
      .post('/api/v1/oauth/login', data)
      .then(response => {
        auth.setAuthToken(response.data.access_token);
        dispatch(setLoggedInUser(response.data));
        return true;
      })
      .catch(error => {
        console.log(error);
        localStorage.setItem('access_token', '');
        sessionStorage.setItem('access_token', '');
        dispatch(setLoggedInUser(null));
        return false;
      });
  };
}

export function login(email, password, keepLoggedIn) {
  return function(dispatch) {
    dispatch(setUserLoggingIn());

    var data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('client_id', CLIENT_ID);

    return axios
      .post('/api/v1/oauth/login', data)
      .then(response => {
        auth.setAuthToken(response.data.access_token);

        sessionStorage.setItem('access_token', response.data.access_token);

        if (keepLoggedIn) {
          localStorage.setItem('access_token', response.data.access_token);
        } else {
          localStorage.setItem('access_token', '');
        }

        dispatch(setLoggedInUser(response.data));
        return true;
      })
      .catch(error => {
        dispatch({
          type: LOGIN_ERROR,
          data: error.response.data,
        });
        return false;
      });
  };
}

export function socialLogin(email, provider, socialToken, firstName, lastName) {
  return function(dispatch) {
    var data = new FormData();
    data.append('email', email);
    data.append('provider', provider);
    data.append('social_token', socialToken);
    data.append('first_name', firstName);
    data.append('last_name', lastName);
    data.append('client_id', CLIENT_ID);

    return axios
      .post('/api/v1/oauth/social_login', data)
      .then(response => {
        auth.setAuthToken(response.data.access_token);

        sessionStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('access_token', response.data.access_token);

        dispatch(setLoggedInUser(response.data));
        return true;
      })
      .catch(error => {
        dispatch({
          type: LOGIN_ERROR,
          data: error.response.data,
        });
        return false;
      });
  };
}

export function register(email, firstName, lastName, password) {
  return function(dispatch) {
    var data = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      client_id: CLIENT_ID,
    };

    return axios
      .post('/api/v1/users/registration', data)
      .then(response => {
        dispatch(setLoggedInUser(response.data));
        return true;
      })
      .catch(error => {
        dispatch({
          type: REGISTRATION_ERROR,
          data: error.response.data,
        });
        return false;
      });
  };
}

export function sendNewPassword(email) {
  return function(dispatch) {
    var data = {
      action: 'reset',
      email: email,
    };

    return axios
      .post('/api/v1/users/password', data)
      .then(() => {
        dispatch({
          type: LOGIN_ERROR,
          data: 'Password reset link has been sent to your email.',
        });
        return true;
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: LOGIN_ERROR,
          data: 'Error sending mail.',
        });
        return false;
      });
  };
}

export function setNewPassword(email, code, password) {
  return function(dispatch) {
    var data = {
      action: 'new',
      email: email,
      code: code,
      password: password,
    };

    return axios
      .post('/api/v1/users/password', data)
      .then(() => {
        return true;
      })
      .catch(error => {
        /* eslint-disable-next-line */
        console.log(error);
        dispatch({
          type: RESET_PASSWORD_ERROR,
          data: 'Error resetting password.',
        });
        return false;
      });
  };
}

export function refreshData(idUser) {
  return function(dispatch) {
    return axios
      .get(`/api/v1/users/${idUser}`)
      .then(response => {
        dispatch({
          type: SET_USER_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getUsers(pageNumber, pageSize, sortBy, filter) {
  return function(dispatch) {
    dispatch({
      type: SET_USERS_LOADING,
    });

    return axios
      .get(
        `/api/v1/users?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_USERS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateUser(idUser, data) {
  return function(dispatch) {
    return axios
      .put(`/api/v1/users/${idUser}`, data)
      .then(response => {
        dispatch({
          type: SET_USER_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createUser(data) {
  return function(dispatch) {
    return axios
      .post(`/api/v1/users`, data)
      .then(response => {
        dispatch({
          type: ADD_USER,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteUser(idUser) {
  return function(dispatch) {
    return axios
      .delete(`/api/v1/users/${idUser}`)
      .then(() => {
        dispatch({
          type: REMOVE_USER,
          data: idUser,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function getRoles() {
  return function(dispatch) {
    return axios
      .get('/api/v1/users/roles')
      .then(response => {
        dispatch({
          type: LOAD_ROLES,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
