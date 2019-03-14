import * as axios from 'axios';
const endpoint = '/api/v1/ranking_values';

export const SET_RANKING_VALUES_LOADING =
  '/ranking_value/set_ranking_values_loading';
export const LOAD_RANKING_VALUES = '/ranking_value/load_ranking_values';
export const ADD_RANKING_VALUE = '/ranking_value/add_ranking_value';
export const REFRESH_RANKING_VALUES = '/ranking_value/refresh_ranking_values';
export const REMOVE_RANKING_VALUE = '/ranking_value/remove_ranking_value';
export const SET_RANKING_VALUE_DATA = '/ranking_value/set_ranking_value_data';

export function refreshData(rankingValueId) {
  return function(dispatch) {
    return axios
      .get(`${endpoint}/${rankingValueId}`)
      .then(response => {
        dispatch({
          type: SET_RANKING_VALUE_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getRankingValues(
  pageNumber = 0,
  pageSize = 9999,
  sortBy,
  filter,
) {
  return function(dispatch) {
    dispatch({
      type: SET_RANKING_VALUES_LOADING,
    });

    return axios
      .get(
        `${endpoint}?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_RANKING_VALUES,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateRankingValue(rankingValueId, data) {
  return function(dispatch) {
    return axios
      .put(`${endpoint}/${rankingValueId}`, data)
      .then(response => {
        dispatch({
          type: SET_RANKING_VALUE_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createRankingValue(data) {
  return function(dispatch) {
    return axios
      .post(endpoint, data)
      .then(response => {
        dispatch({
          type: ADD_RANKING_VALUE,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteRankingValue(rankingValueId) {
  return function(dispatch) {
    return axios
      .delete(`${endpoint}/${rankingValueId}`)
      .then(() => {
        dispatch({
          type: REMOVE_RANKING_VALUE,
          data: {
            rankingValueId: rankingValueId,
          },
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
