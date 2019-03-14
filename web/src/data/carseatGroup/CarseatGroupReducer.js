import * as CarseatGroupActions from './CarseatGroupActions.js';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  carseatGroups: [],
  carseatGroupsPagination: {},
  carseatGroupDetails: {},
};

export default function carseatGroup(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;
    case CarseatGroupActions.SET_CARSEATGROUPS_LOADING:
      return {
        ...state,
        carseatGroupsPagination: {
          ...state.carseatGroupsPagination,
          is_loading: true,
        },
      };
    case CarseatGroupActions.LOAD_CARSEATGROUPS:
      return {
        ...state,
        carseatGroups: action.data.results,
        carseatGroupsPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case CarseatGroupActions.REFRESH_CARSEATGROUPS:
      return {
        ...state,
        carseatGroups: state.carseatGroups.map(carseatGroup =>
          carseatGroup.id_carseat_group === action.data.id_carseat_group
            ? action.data
            : carseatGroup,
        ),
      };
    case CarseatGroupActions.ADD_CARSEATGROUP:
      return {
        ...state,
        carseatGroups: [...state.carseatGroups, action.data],
      };
    case CarseatGroupActions.REMOVE_CARSEATGROUP:
      return {
        ...state,
        carseatGroups: state.carseatGroups.filter(
          carseatGroup => carseatGroup.id_carseat_group !== action.data,
        ),
      };
    case CarseatGroupActions.SET_CARSEATGROUP_DATA:
      return {
        ...state,
        carseatGroups: state.carseatGroups.map(carseatGroup => {
          if (carseatGroup.id_carseat_group === action.data.id_carseat_group) {
            return {
              ...carseatGroup,
              ...action.data,
            };
          }
          return carseatGroup;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
