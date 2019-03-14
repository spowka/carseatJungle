import * as OriginActions from './OriginActions.js';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  origins: [],
  originsPagination: {},
  originDetails: {},
};

export default function origin(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;
    case OriginActions.SET_ORIGINS_LOADING:
      return {
        ...state,
        originsPagination: {
          ...state.originsPagination,
          is_loading: true,
        },
      };
    case OriginActions.LOAD_ORIGINS:
      return {
        ...state,
        origins: action.data.results,
        originsPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case OriginActions.REFRESH_ORIGINS:
      return {
        ...state,
        origins: state.origins.map(origin =>
          origin.id_origin === action.data.id_origin ? action.data : origin,
        ),
      };
    case OriginActions.ADD_ORIGIN:
      return {
        ...state,
        origins: [...state.origins, action.data],
      };
    case OriginActions.REMOVE_ORIGIN:
      return {
        ...state,
        origins: state.origins.filter(
          origin => origin.id_origin !== action.data,
        ),
      };
    case OriginActions.SET_ORIGIN_DATA:
      return {
        ...state,
        origins: state.origins.map(origin => {
          if (origin.id_origin === action.data.id_origin) {
            return {
              ...origin,
              ...action.data,
            };
          }
          return origin;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
