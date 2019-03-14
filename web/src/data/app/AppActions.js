export const SEARCH_TOGGLE = '/app/search_toggle';
export const SET_SEARCH_VALUE = '/app/set_search_value';

export function searchToggle() {
  return {
    type: SEARCH_TOGGLE,
  };
}

export function setSearchValue(value) {
  return {
    type: SET_SEARCH_VALUE,
    data: value,
  };
}
