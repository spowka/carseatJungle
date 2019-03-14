import * as ChildWeightGroupActions from './ChildWeightGroupActions.js';
import * as UserActions from '../user/UserActions.js';

const initialState = {
  childWeightGroups: [],
  childWeightGroupsPagination: {},
  childWeightGroupDetails: {},
};

export default function ChildWeightGroup(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;

    case ChildWeightGroupActions.SET_CHILD_WEIGHT_GROUPS_LOADING:
      return {
        ...state,
        childWeightGroupsPagination: {
          ...state.childWeightGroupsPagination,
          is_loading: true,
        },
      };
    case ChildWeightGroupActions.LOAD_CHILD_WEIGHT_GROUPS:
      return {
        ...state,
        childWeightGroups: action.data.results,
        childWeightGroupsPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case ChildWeightGroupActions.REFRESH_CHILD_WEIGHT_GROUPS:
      return {
        ...state,
        childWeightGroups: state.childWeightGroups.map(childWeightGroup =>
          childWeightGroup.id_child_weight_group ===
          action.data.childWeightGroupId
            ? action.data
            : childWeightGroup,
        ),
      };
    case ChildWeightGroupActions.ADD_CHILD_WEIGHT_GROUP:
      return {
        ...state,
        childWeightGroups: [...state.childWeightGroups, action.data],
      };
    case ChildWeightGroupActions.REMOVE_CHILD_WEIGHT_GROUP:
      return {
        ...state,
        childWeightGroups: state.childWeightGroups.filter(
          childWeightGroup =>
            childWeightGroup.id_child_weight_group !==
            action.data.childWeightGroupId,
        ),
      };
    case ChildWeightGroupActions.SET_CHILD_WEIGHT_GROUP_DATA:
      return {
        ...state,
        childWeightGroups: state.childWeightGroups.map(childWeightGroup => {
          if (
            childWeightGroup.id_child_weight_group ===
            action.data.id_child_weight_group
          ) {
            return {
              ...childWeightGroup,
              ...action.data,
            };
          }
          return childWeightGroup;
        }),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
