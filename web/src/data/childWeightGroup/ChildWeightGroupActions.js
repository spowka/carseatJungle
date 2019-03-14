import * as axios from 'axios';
const endpoint = '/api/v1/child_weight_groups';

export const SET_CHILD_WEIGHT_GROUPS_LOADING =
  '/child_weight_group/set_child_weight_groups_loading';
export const LOAD_CHILD_WEIGHT_GROUPS =
  '/child_weight_group/load_child_weight_groups';
export const ADD_CHILD_WEIGHT_GROUP =
  '/child_weight_group/add_child_weight_group';
export const REFRESH_CHILD_WEIGHT_GROUPS =
  '/child_weight_group/refresh_child_weight_groups';
export const REMOVE_CHILD_WEIGHT_GROUP =
  '/child_weight_group/remove_child_weight_group';
export const SET_CHILD_WEIGHT_GROUP_DATA =
  '/child_weight_group/set_child_weight_group_data';

export function refreshData(childWeightGroupId) {
  return function(dispatch) {
    return axios
      .get(`${endpoint}/${childWeightGroupId}`)
      .then(response => {
        dispatch({
          type: SET_CHILD_WEIGHT_GROUP_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getChildWeightGroups(
  pageNumber = 0,
  pageSize = 9999,
  sortBy,
  filter,
) {
  return function(dispatch) {
    dispatch({
      type: SET_CHILD_WEIGHT_GROUPS_LOADING,
    });

    return axios
      .get(
        `${endpoint}?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_CHILD_WEIGHT_GROUPS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateChildWeightGroup(childWeightGroupId, data) {
  return function(dispatch) {
    return axios
      .put(`${endpoint}/${childWeightGroupId}`, data)
      .then(response => {
        dispatch({
          type: SET_CHILD_WEIGHT_GROUP_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createChildWeightGroup(data) {
  return function(dispatch) {
    return axios
      .post(endpoint, data)
      .then(response => {
        dispatch({
          type: ADD_CHILD_WEIGHT_GROUP,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteChildWeightGroup(childWeightGroupId) {
  return function(dispatch) {
    return axios
      .delete(`${endpoint}/${childWeightGroupId}`)
      .then(() => {
        dispatch({
          type: REMOVE_CHILD_WEIGHT_GROUP,
          data: {
            childWeightGroupId: childWeightGroupId,
          },
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
