import * as RankingProviderActions from './RankingProviderActions.js';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  rankingProviders: [],
  rankingProvidersPagination: {},
  rankingProviderDetails: {},
};

export default function RankingProvider(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;

    case RankingProviderActions.SET_RANKING_PROVIDERS_LOADING:
      return {
        ...state,
        rankingProvidersPagination: {
          ...state.RankingProvidersPagination,
          is_loading: true,
        },
      };
    case RankingProviderActions.LOAD_RANKING_PROVIDERS:
      return {
        ...state,
        rankingProviders: action.data.results,
        rankingProvidersPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case RankingProviderActions.REFRESH_RANKING_PROVIDERS:
      return {
        ...state,
        rankingProviders: state.rankingProviders.map(rankingProvider =>
          rankingProvider.id_ranking_provider === action.data.rankingProviderId
            ? action.data
            : rankingProvider,
        ),
      };
    case RankingProviderActions.ADD_RANKING_PROVIDER:
      return {
        ...state,
        rankingProviders: [...state.rankingProviders, action.data],
      };
    case RankingProviderActions.REMOVE_RANKING_PROVIDER:
      return {
        ...state,
        rankingProviders: state.rankingProviders.filter(
          rankingProvider =>
            rankingProvider.id_ranking_provider !==
            action.data.rankingProviderId,
        ),
      };
    case RankingProviderActions.SET_RANKING_PROVIDER_DATA:
      return {
        ...state,
        rankingProviders: state.rankingProviders.map(rankingProvider => {
          if (
            rankingProvider.id_ranking_provider ===
            action.data.id_ranking_provider
          ) {
            return {
              ...rankingProvider,
              ...action.data,
            };
          }
          return rankingProvider;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
