import * as axios from 'axios';
const endpoint = '/api/v1/child_height_groups';

export const SET_CHILD_HEIGHT_GROUPS_LOADING =
  '/child_height_group/set_child_height_groups_loading';
export const LOAD_CHILD_HEIGHT_GROUPS =
  '/child_height_group/load_child_height_groups';
export const ADD_CHILD_HEIGHT_GROUP =
  '/child_height_group/add_child_height_group';
export const REFRESH_CHILD_HEIGHT_GROUPS =
  '/child_height_group/refresh_child_height_groups';
export const REMOVE_CHILD_HEIGHT_GROUP =
  '/child_height_group/remove_child_height_group';
export const SET_CHILD_HEIGHT_GROUP_DATA =
  '/child_height_group/set_child_height_group_data';

export function refreshData(childHeightGroupId) {
  return function(dispatch) {
    return axios
      .get(`${endpoint}/${childHeightGroupId}`)
      .then(response => {
        dispatch({
          type: SET_CHILD_HEIGHT_GROUP_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getChildHeightGroups(
  pageNumber = 0,
  pageSize = 9999,
  sortBy,
  filter,
) {
  return function(dispatch) {
    dispatch({
      type: SET_CHILD_HEIGHT_GROUPS_LOADING,
    });

    return axios
      .get(
        `${endpoint}?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_CHILD_HEIGHT_GROUPS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateChildHeightGroup(childHeightGroupId, data) {
  return function(dispatch) {
    return axios
      .put(`${endpoint}/${childHeightGroupId}`, data)
      .then(response => {
        dispatch({
          type: SET_CHILD_HEIGHT_GROUP_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createChildHeightGroup(data) {
  return function(dispatch) {
    return axios
      .post(endpoint, data)
      .then(response => {
        dispatch({
          type: ADD_CHILD_HEIGHT_GROUP,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteChildHeightGroup(childHeightGroupId) {
  return function(dispatch) {
    return axios
      .delete(`${endpoint}/${childHeightGroupId}`)
      .then(() => {
        dispatch({
          type: REMOVE_CHILD_HEIGHT_GROUP,
          data: {
            childHeightGroupId: childHeightGroupId,
          },
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
