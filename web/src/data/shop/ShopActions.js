import * as axios from 'axios';

export const SET_SHOPS_LOADING = '/shop/set_shops_loading';
export const LOAD_SHOPS = '/shop/load_shops';
export const ADD_SHOP = '/shop/add_shop';
export const REFRESH_SHOPS = '/shop/refresh_shops';
export const REMOVE_SHOP = '/shop/remove_shop';
export const SET_SHOP_DATA = '/shop/set_shop_data';

export function refreshData(idShop) {
  return function(dispatch) {
    return axios
      .get(`/api/v1/shops/${idShop}`)
      .then(response => {
        dispatch({
          type: SET_SHOP_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getShops(pageNumber = 0, pageSize = 9999, sortBy, filter) {
  return function(dispatch) {
    dispatch({
      type: SET_SHOPS_LOADING,
    });

    return axios
      .get(
        `/api/v1/shops?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_SHOPS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateShop(idShop, data) {
  return function(dispatch) {
    return axios
      .put(`/api/v1/shops/${idShop}`, data)
      .then(response => {
        dispatch({
          type: SET_SHOP_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createShop(data) {
  return function(dispatch) {
    return axios
      .post(`/api/v1/shops`, data)
      .then(response => {
        dispatch({
          type: ADD_SHOP,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteShop(idShop) {
  return function(dispatch) {
    return axios
      .delete(`/api/v1/shops/${idShop}`)
      .then(() => {
        dispatch({
          type: REMOVE_SHOP,
          data: idShop,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
