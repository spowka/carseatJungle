import * as RankingValueActions from './RankingValueActions.js';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  rankingValues: [],
  rankingValuesPagination: {},
  rankingValueDetails: {},
};

export default function RankingValue(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;

    case RankingValueActions.SET_RANKING_VALUES_LOADING:
      return {
        ...state,
        rankingValuesPagination: {
          ...state.RankingValuesPagination,
          is_loading: true,
        },
      };
    case RankingValueActions.LOAD_RANKING_VALUES:
      return {
        ...state,
        rankingValues: action.data.results,
        rankingValuesPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case RankingValueActions.REFRESH_RANKING_VALUES:
      return {
        ...state,
        rankingValues: state.rankingValues.map(rankingValue =>
          rankingValue.id_ranking_value === action.data.rankingValueId
            ? action.data
            : rankingValue,
        ),
      };
    case RankingValueActions.ADD_RANKING_VALUE:
      return {
        ...state,
        rankingValues: [...state.rankingValues, action.data],
      };
    case RankingValueActions.REMOVE_RANKING_VALUE:
      return {
        ...state,
        rankingValues: state.rankingValues.filter(
          rankingValue =>
            rankingValue.id_ranking_value !== action.data.rankingValueId,
        ),
      };
    case RankingValueActions.SET_RANKING_VALUE_DATA:
      return {
        ...state,
        rankingValues: state.rankingValues.map(rankingValue => {
          if (rankingValue.id_ranking_value === action.data.id_ranking_value) {
            return {
              ...rankingValue,
              ...action.data,
            };
          }
          return rankingValue;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
