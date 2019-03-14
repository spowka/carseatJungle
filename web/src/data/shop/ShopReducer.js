import * as ShopActions from './ShopActions.js';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  shops: [],
  shopsPagination: {},
  shopDetails: {},
};

export default function shop(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;
    case ShopActions.SET_SHOPS_LOADING:
      return {
        ...state,
        shopsPagination: {
          ...state.shopsPagination,
          is_loading: true,
        },
      };
    case ShopActions.LOAD_SHOPS:
      return {
        ...state,
        shops: action.data.results,
        shopsPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case ShopActions.REFRESH_SHOPS:
      return {
        ...state,
        shops: state.shops.map(shop =>
          shop.id_shop === action.data.id_shop ? action.data : shop,
        ),
      };
    case ShopActions.ADD_SHOP:
      return {
        ...state,
        shops: [...state.shops, action.data],
      };
    case ShopActions.REMOVE_SHOP:
      return {
        ...state,
        shops: state.shops.filter(shop => shop.id_shop !== action.data),
      };
    case ShopActions.SET_SHOP_DATA:
      return {
        ...state,
        shops: state.shops.map(shop => {
          if (shop.id_shop === action.data.id_shop) {
            return {
              ...shop,
              ...action.data,
            };
          }
          return shop;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
