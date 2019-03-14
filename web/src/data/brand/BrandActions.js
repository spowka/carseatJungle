import * as axios from 'axios';

export const SET_BRANDS_LOADING = '/brand/set_brands_loading';
export const LOAD_BRANDS = '/brand/load_brands';
export const ADD_BRAND = '/brand/add_brand';
export const REFRESH_BRANDS = '/brand/refresh_brands';
export const REMOVE_BRAND = '/brand/remove_brand';
export const SET_BRAND_DATA = '/brand/set_brand_data';

export function refreshData(idBrand) {
  return function(dispatch) {
    return axios
      .get(`/api/v1/brands/${idBrand}`)
      .then(response => {
        dispatch({
          type: SET_BRAND_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getBrands(pageNumber = 0, pageSize = 9999, sortBy, filter) {
  return function(dispatch) {
    dispatch({
      type: SET_BRANDS_LOADING,
    });

    return axios
      .get(
        `/api/v1/brands?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}`,
      )
      .then(response => {
        console.log('response.data', response);
        dispatch({
          type: LOAD_BRANDS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateBrand(idBrand, data) {
  return function(dispatch) {
    return axios
      .put(`/api/v1/brands/${idBrand}`, data)
      .then(response => {
        dispatch({
          type: SET_BRAND_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createBrand(data) {
  return function(dispatch) {
    return axios
      .post(`/api/v1/brands`, data)
      .then(response => {
        dispatch({
          type: ADD_BRAND,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteBrand(idBrand) {
  return function(dispatch) {
    return axios
      .delete(`/api/v1/brands/${idBrand}`)
      .then(() => {
        dispatch({
          type: REMOVE_BRAND,
          data: idBrand,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
