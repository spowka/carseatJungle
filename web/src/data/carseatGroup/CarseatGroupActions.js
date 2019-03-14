import * as axios from 'axios';

export const SET_CARSEATGROUPS_LOADING =
  '/carseatgroup/set_carseatgroups_loading';
export const LOAD_CARSEATGROUPS = '/carseatgroup/load_carseatgroups';
export const ADD_CARSEATGROUP = '/carseatgroup/add_carseatgroup';
export const REFRESH_CARSEATGROUPS = '/carseatgroup/refresh_carseatgroups';
export const REMOVE_CARSEATGROUP = '/carseatgroup/remove_carseatgroup';
export const SET_CARSEATGROUP_DATA = '/carseatgroup/set_carseatgroup_data';

export function refreshData(idCarseatGroup) {
  return function(dispatch) {
    return axios
      .get(`/api/v1/carseat_groups/${idCarseatGroup}`)
      .then(response => {
        dispatch({
          type: SET_CARSEATGROUP_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getCarseatGroups(
  pageNumber = 0,
  pageSize = 9999,
  sortBy,
  filter,
) {
  return function(dispatch) {
    dispatch({
      type: SET_CARSEATGROUPS_LOADING,
    });

    return axios
      .get(
        `/api/v1/carseat_groups?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_CARSEATGROUPS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateCarseatGroup(idCarseatGroup, data) {
  return function(dispatch) {
    return axios
      .put(`/api/v1/carseat_groups/${idCarseatGroup}`, data)
      .then(response => {
        dispatch({
          type: SET_CARSEATGROUP_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createCarseatGroup(data) {
  return function(dispatch) {
    return axios
      .post(`/api/v1/carseat_groups`, data)
      .then(response => {
        dispatch({
          type: ADD_CARSEATGROUP,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteCarseatGroup(idCarseatGroup) {
  return function(dispatch) {
    return axios
      .delete(`/api/v1/carseat_groups/${idCarseatGroup}`)
      .then(() => {
        dispatch({
          type: REMOVE_CARSEATGROUP,
          data: idCarseatGroup,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
