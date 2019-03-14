import * as CarseatActions from './CarseatActions.js';

const initialState = {
  carseats: [],
  carseatsPagination: {},
  carseatDetails: {},
  filter: {
    isUKAvailable: true,
    idCarseatTypes: [],
    isRearFacing: undefined,
    isISizeCompliant: undefined,
    hasIsofix: undefined,
    hasSwivel: undefined,
  },
};

export default function carseat(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;
    case CarseatActions.SET_CARSEATS_LOADING:
      return {
        ...state,
        carseatsPagination: {
          ...state.carseatsPagination,
          is_loading: true,
        },
      };
    case CarseatActions.LOAD_CARSEATS:
      return {
        ...state,
        carseats: action.data.results,
        carseatsPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case CarseatActions.REFRESH_CARSEATS:
      return {
        ...state,
        carseats: state.carseats.map(carseat =>
          carseat.id_carseat === action.data.id_carseat ? action.data : carseat,
        ),
      };
    case CarseatActions.ADD_CARSEAT:
      return {
        ...state,
        carseats: [...state.carseats, action.data],
      };
    case CarseatActions.REMOVE_CARSEAT:
      return {
        ...state,
        carseats: state.carseats.filter(
          carseat => carseat.id_carseat !== action.data,
        ),
      };
    case CarseatActions.SET_CARSEAT_DATA:
      return {
        ...state,
        carseats: state.carseats.map(carseat => {
          if (carseat.id_carseat === action.data.id_carseat) {
            return {
              ...carseat,
              ...action.data,
            };
          }
          return carseat;
        }),
      };
    case CarseatActions.LOAD_CARSEAT_DETAILS:
      return {
        ...state,
        carseatDetails: action.data,
      };
    case CarseatActions.TOGGLE_FILTER: {
      const filterName = action.data.filterName;
      const filterValue = action.data.filterValue;
      let newFilter = [...state.filter[filterName]];

      if (newFilter.indexOf(filterValue) === -1) {
        newFilter.push(filterValue);
      } else {
        newFilter = newFilter.filter(f => f !== filterValue);
      }

      return {
        ...state,
        filter: {
          ...state.filter,
          [filterName]: newFilter,
        },
      };
    }
    case CarseatActions.SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.data.filterName]: action.data.filterValue,
        },
      };
    default:
      return state;
  }
}
