import * as CarseatTypeActions from './CarseatTypeActions';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  carseatTypes: [],
  carseatTypesPagination: {},
  carseatTypeDetails: {},
};

export default function CarseatType(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;

    case CarseatTypeActions.SET_CARSEAT_TYPES_LOADING:
      return {
        ...state,
        carseatTypesPagination: {
          ...state.CarseatTypesPagination,
          is_loading: true,
        },
      };
    case CarseatTypeActions.LOAD_CARSEAT_TYPES:
      return {
        ...state,
        carseatTypes: action.data.results,
        carseatTypesPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case CarseatTypeActions.REFRESH_CARSEAT_TYPES:
      return {
        ...state,
        carseatTypes: state.carseatTypes.map(carseatType =>
          carseatType.id_carseat_type === action.data.carseatTypeId
            ? action.data
            : carseatType,
        ),
      };
    case CarseatTypeActions.ADD_CARSEAT_TYPE:
      return {
        ...state,
        carseatTypes: [...state.carseatTypes, action.data],
      };
    case CarseatTypeActions.REMOVE_CARSEAT_TYPE:
      return {
        ...state,
        carseatTypes: state.carseatTypes.filter(
          carseatType =>
            carseatType.id_carseat_type !== action.data.carseatTypeId,
        ),
      };
    case CarseatTypeActions.SET_CARSEAT_TYPE_DATA:
      return {
        ...state,
        carseatTypes: state.carseatTypes.map(carseatType => {
          if (carseatType.id_carseat_type === action.data.id_carseat_type) {
            return {
              ...carseatType,
              ...action.data,
            };
          }
          return carseatType;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
