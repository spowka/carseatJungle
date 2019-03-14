import * as axios from 'axios';

export const SET_ORIGINS_LOADING = '/origin/set_origins_loading';
export const LOAD_ORIGINS = '/origin/load_origins';
export const ADD_ORIGIN = '/origin/add_origin';
export const REFRESH_ORIGINS = '/origin/refresh_origins';
export const REMOVE_ORIGIN = '/origin/remove_origin';
export const SET_ORIGIN_DATA = '/origin/set_origin_data';

export function refreshData(idOrigin) {
  return function(dispatch) {
    return axios
      .get(`/api/v1/origins/${idOrigin}`)
      .then(response => {
        dispatch({
          type: SET_ORIGIN_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getOrigins(pageNumber = 0, pageSize = 9999, sortBy, filter) {
  return function(dispatch) {
    dispatch({
      type: SET_ORIGINS_LOADING,
    });

    return axios
      .get(
        `/api/v1/origins?page=${pageNumber &
          pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_ORIGINS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateOrigin(idOrigin, data) {
  return function(dispatch) {
    return axios
      .put(`/api/v1/origins/${idOrigin}`, data)
      .then(response => {
        dispatch({
          type: SET_ORIGIN_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createOrigin(data) {
  return function(dispatch) {
    return axios
      .post(`/api/v1/origins`, data)
      .then(response => {
        dispatch({
          type: ADD_ORIGIN,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteOrigin(idOrigin) {
  return function(dispatch) {
    return axios
      .delete(`/api/v1/origins/${idOrigin}`)
      .then(() => {
        dispatch({
          type: REMOVE_ORIGIN,
          data: idOrigin,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
