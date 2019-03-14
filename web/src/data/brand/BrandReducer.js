import * as BrandActions from './BrandActions.js';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  brands: [],
  brandsPagination: {},
  brandDetails: {},
};

export default function brand(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;
    case BrandActions.SET_BRANDS_LOADING:
      return {
        ...state,
        brandsPagination: {
          ...state.brandsPagination,
          is_loading: true,
        },
      };
    case BrandActions.LOAD_BRANDS:
      return {
        ...state,
        brands: action.data.results,
        brandsPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case BrandActions.REFRESH_BRANDS:
      return {
        ...state,
        brands: state.brands.map(brand =>
          brand.id_brand === action.data.id_brand ? action.data : brand,
        ),
      };
    case BrandActions.ADD_BRAND:
      return {
        ...state,
        brands: [...state.brands, action.data],
      };
    case BrandActions.REMOVE_BRAND:
      return {
        ...state,
        brands: state.brands.filter(brand => brand.id_brand !== action.data),
      };
    case BrandActions.SET_BRAND_DATA:
      return {
        ...state,
        brands: state.brands.map(brand => {
          if (brand.id_brand === action.data.id_brand) {
            return {
              ...brand,
              ...action.data,
            };
          }
          return brand;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
