import * as axios from 'axios';
const endpoint = '/api/v1/ranking_providers';

export const SET_RANKING_PROVIDERS_LOADING =
  '/ranking_provider/set_ranking_providers_loading';
export const LOAD_RANKING_PROVIDERS =
  '/ranking_provider/load_ranking_providers';
export const ADD_RANKING_PROVIDER = '/ranking_provider/add_ranking_provider';
export const REFRESH_RANKING_PROVIDERS =
  '/ranking_provider/refresh_ranking_providers';
export const REMOVE_RANKING_PROVIDER =
  '/ranking_provider/remove_ranking_provider';
export const SET_RANKING_PROVIDER_DATA =
  '/ranking_provider/set_ranking_provider_data';

export function refreshData(rankingProviderId) {
  return function(dispatch) {
    return axios
      .get(`${endpoint}/${rankingProviderId}`)
      .then(response => {
        dispatch({
          type: SET_RANKING_PROVIDER_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getRankingProviders(
  pageNumber = 0,
  pageSize = 9999,
  sortBy,
  filter,
) {
  return function(dispatch) {
    dispatch({
      type: SET_RANKING_PROVIDERS_LOADING,
    });

    return axios
      .get(
        `${endpoint}?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_RANKING_PROVIDERS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateRankingProvider(rankingProviderId, data) {
  return function(dispatch) {
    return axios
      .put(`${endpoint}/${rankingProviderId}`, data)
      .then(response => {
        dispatch({
          type: SET_RANKING_PROVIDER_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createRankingProvider(data) {
  return function(dispatch) {
    return axios
      .post(endpoint, data)
      .then(response => {
        dispatch({
          type: ADD_RANKING_PROVIDER,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteRankingProvider(rankingProviderId) {
  return function(dispatch) {
    return axios
      .delete(`${endpoint}/${rankingProviderId}`)
      .then(() => {
        dispatch({
          type: REMOVE_RANKING_PROVIDER,
          data: {
            rankingProviderId: rankingProviderId,
          },
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
