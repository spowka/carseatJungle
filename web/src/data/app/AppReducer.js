import * as AppActions from './AppActions.js';

const initialState = {
  search_visible: false,
  search_value: '',
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case AppActions.SEARCH_TOGGLE:
      return {
        ...state,
        search_visible: !state.search_visible,
        search_value: state.search_visible ? state.search_value : '',
      };
    case AppActions.SET_SEARCH_VALUE:
      return {
        ...state,
        search_value: action.data,
      };
    default:
      return state;
  }
}
