import * as ChildHeightGroupActions from './ChildHeightGroupActions.js';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  childHeightGroups: [],
  childHeightGroupsPagination: {},
  childHeightGroupDetails: {},
};

export default function ChildHeightGroup(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;

    case ChildHeightGroupActions.SET_CHILD_HEIGHT_GROUPS_LOADING:
      return {
        ...state,
        childHeightGroupsPagination: {
          ...state.ChildHeightGroupsPagination,
          is_loading: true,
        },
      };
    case ChildHeightGroupActions.LOAD_CHILD_HEIGHT_GROUPS:
      return {
        ...state,
        childHeightGroups: action.data.results,
        childHeightGroupsPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case ChildHeightGroupActions.REFRESH_CHILD_HEIGHT_GROUPS:
      return {
        ...state,
        childHeightGroups: state.childHeightGroups.map(childHeightGroup =>
          childHeightGroup.id_child_height_group ===
          action.data.childHeightGroupId
            ? action.data
            : childHeightGroup,
        ),
      };
    case ChildHeightGroupActions.ADD_CHILD_HEIGHT_GROUP:
      return {
        ...state,
        childHeightGroups: [...state.childHeightGroups, action.data],
      };
    case ChildHeightGroupActions.REMOVE_CHILD_HEIGHT_GROUP:
      return {
        ...state,
        childHeightGroups: state.childHeightGroups.filter(
          childHeightGroup =>
            childHeightGroup.id_child_height_group !==
            action.data.childHeightGroupId,
        ),
      };
    case ChildHeightGroupActions.SET_CHILD_HEIGHT_GROUP_DATA:
      return {
        ...state,
        childHeightGroups: state.childHeightGroups.map(childHeightGroup => {
          if (
            childHeightGroup.id_child_height_group ===
            action.data.id_child_height_group
          ) {
            return {
              ...childHeightGroup,
              ...action.data,
            };
          }
          return childHeightGroup;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
