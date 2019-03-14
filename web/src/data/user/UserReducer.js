import * as UserActions from './UserActions';
import * as UserRoles from './UserRoles.js';

const initialState = {
  currentUser: null,
  login_error_message: null,
  registration_error_message: null,
  reset_password_error_message: null,
  isLoggingIn: false,
  users: [],
  usersPagination: {
    current_page: 1,
    page_size: 10,
    sort_by: null,
    total_count: null,
    total_pages: null,
    is_loading: true,
    filter: null,
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'UNAUTHORIZED':
      return initialState;
    case UserActions.SET_USER_LOGGING_IN:
      return {
        ...state,
        isLoggingIn: true,
      };
    case UserActions.SET_LOGGED_IN_USER:
      if (action.user === null)
        return {
          ...state,
          currentUser: null,
          login_error_message: null,
          registration_error_message: null,
          isLoggingIn: false,
        };
      else
        return {
          ...state,
          currentUser: {
            ...action.data,
            is_admin:
              action.data !== null &&
              action.data.id_user_role === UserRoles.ID_USER_ROLE_ADMIN,
          },
          login_error_message: null,
          registration_error_message: null,
          isLoggingIn: false,
        };
    case UserActions.LOGIN_ERROR:
      return {
        ...state,
        login_error_message: action.data,
        currentUser: null,
      };
    case UserActions.REGISTRATION_ERROR:
      return {
        ...state,
        registration_error_message: action.data,
      };
    case UserActions.RESET_PASSWORD_ERROR:
      return {
        ...state,
        reset_password_error_message: action.data,
      };
    case UserActions.SET_USERS_LOADING:
      return {
        ...state,
        usersPagination: {
          ...state.usersPagination,
          is_loading: true,
        },
      };
    case UserActions.LOAD_USERS:
      return {
        ...state,
        users: action.data.results,
        usersPagination: {
          current_page: action.data.current_page,
          page_size: action.data.page_size,
          sort_by: action.data.sort_by,
          total_count: action.data.total_count,
          total_pages: action.data.total_pages,
          filter: action.data.filter,
          is_loading: false,
        },
      };
    case UserActions.REFRESH_USERS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id_user === action.data.id_user ? action.data : user,
        ),
      };
    case UserActions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.data],
      };
    case UserActions.LOAD_ROLES:
      return {
        ...state,
        roles: action.data,
      };
    case UserActions.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id_user !== action.data),
      };

    case UserActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
