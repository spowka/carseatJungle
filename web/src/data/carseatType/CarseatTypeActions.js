import * as axios from 'axios';
const endpoint = '/api/v1/carseat_types';

export const SET_CARSEAT_TYPES_LOADING =
  '/carseat_type/set_carseat_types_loading';
export const LOAD_CARSEAT_TYPES = '/carseat_type/load_carseat_types';
export const ADD_CARSEAT_TYPE = '/carseat_type/add_carseat_type';
export const REFRESH_CARSEAT_TYPES = '/carseat_type/refresh_carseat_types';
export const REMOVE_CARSEAT_TYPE = '/carseat_type/remove_carseat_type';
export const SET_CARSEAT_TYPE_DATA = '/carseat_type/set_carseat_type_data';

export function refreshData(carseatTypeId) {
  return function(dispatch) {
    return axios
      .get(`${endpoint}/${carseatTypeId}`)
      .then(response => {
        dispatch({
          type: SET_CARSEAT_TYPE_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getCarseatTypes(
  pageNumber = 0,
  pageSize = 9999,
  sortBy,
  filter,
) {
  return function(dispatch) {
    dispatch({
      type: SET_CARSEAT_TYPES_LOADING,
    });

    return axios
      .get(
        `${endpoint}?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_CARSEAT_TYPES,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateCarseatType(carseatTypeId, data) {
  return function(dispatch) {
    return axios
      .put(`${endpoint}/${carseatTypeId}`, data)
      .then(response => {
        dispatch({
          type: SET_CARSEAT_TYPE_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createCarseatType(data) {
  return function(dispatch) {
    return axios
      .post(endpoint, data)
      .then(response => {
        dispatch({
          type: ADD_CARSEAT_TYPE,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteCarseatType(carseatTypeId) {
  return function(dispatch) {
    return axios
      .delete(`${endpoint}/${carseatTypeId}`)
      .then(() => {
        dispatch({
          type: REMOVE_CARSEAT_TYPE,
          data: {
            carseatTypeId: carseatTypeId,
          },
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
