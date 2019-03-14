import * as axios from 'axios';

export const SET_CARSEATS_LOADING = '/carseat/set_carseats_loading';
export const LOAD_CARSEATS = '/carseat/load_carseats';
export const ADD_CARSEAT = '/carseat/add_carseat';
export const REFRESH_CARSEATS = '/carseat/refresh_carseats';
export const REMOVE_CARSEAT = '/carseat/remove_carseat';
export const SET_CARSEAT_DATA = '/carseat/set_carseat_data';

export const LOAD_CARSEAT_DETAILS = '/carseat/load_carseat_details';
export const TOGGLE_FILTER = '/carseat/toggle_filter';
export const SET_FILTER = '/carseat/set_filter';

export function getCarseats(
  pageNumber = 0,
  pageSize = 9999,
  sortBy,
  filter,
  searchData = null,
) {
  return function(dispatch) {
    dispatch({
      type: SET_CARSEATS_LOADING,
    });

    let searchQuery = '';
    if (searchData) {
      if (searchData.idCarseatTypes.length > 0) {
        searchQuery += '&carseat_types=' + searchData.idCarseatTypes.join(',');
      }

      if (searchData.isRearFacing != null) {
        searchQuery += '&is_rear_facing=' + searchData.isRearFacing;
      }

      if (searchData.isISizeCompliant != null) {
        searchQuery += '&is_i_size_compliant=' + searchData.isISizeCompliant;
      }

      if (searchData.hasIsofix != null) {
        searchQuery += '&has_isofix=' + searchData.hasIsofix;
      }

      if (searchData.hasSwivel != null) {
        searchQuery += '&has_swivel=' + searchData.hasSwivel;
      }

      if (searchData.isUKAvailable != null) {
        searchQuery += '&is_uk_available=' + searchData.isUKAvailable;
      }
    }

    return axios
      .get(
        `/api/v1/carseats?page=${pageNumber}&page_size=${pageSize}&sort_by=${sortBy}&filter=${filter}${searchQuery}`,
      )
      .then(response => {
        dispatch({
          type: LOAD_CARSEATS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function updateCarseat(idCarseat, data) {
  return function(dispatch) {
    return axios
      .put(`/api/v1/carseats/${idCarseat}`, data)
      .then(response => {
        dispatch({
          type: SET_CARSEAT_DATA,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function createCarseat(data) {
  return function(dispatch) {
    return axios
      .post(`/api/v1/carseats`, data)
      .then(response => {
        dispatch({
          type: ADD_CARSEAT,
          data: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function deleteCarseat(idCarseat) {
  return function(dispatch) {
    return axios
      .delete(`/api/v1/carseats/${idCarseat}`)
      .then(() => {
        dispatch({
          type: REMOVE_CARSEAT,
          data: idCarseat,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function getCarseatDetails(idCarseat) {
  return function(dispatch) {
    return axios
      .get(`/api/v1/carseats/${idCarseat}`)
      .then(response => {
        dispatch({
          type: LOAD_CARSEAT_DETAILS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function toggleFilter(filterName, filterValue) {
  return {
    type: TOGGLE_FILTER,
    data: {filterName, filterValue},
  };
}

export function setFilter(filterName, filterValue) {
  return {
    type: SET_FILTER,
    data: {filterName, filterValue},
  };
}
