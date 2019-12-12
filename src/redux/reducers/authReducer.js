import { types } from "../actions/authActions";

const initialState = {
  authLoading: false,
  authUser: null,
  isAuthenticated: false,
  access_token: null,
  error: null
};

export default function(state = initialState, action) {
      // console.log(action.type)

  switch (action.type) {

    case types.AUTH_REQUEST: {
      // console.log('request')
      return { ...state, authLoading: true }
    }

    case types.AUTH_SUCCESS: {
      // console.log('request')
      return { ...state, authLoading: false }
    }

    case types.AUTH_FAILURE: {
      return {
        ...state,
        authLoading: false,
        // error: action.payload
      }
    }

    case types.SET_AUTH_TO_STORE: {
      // console.log('success: ', action.payload)
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        authUser: action.payload.user,
        access_token: action.payload.access_token,
      }
    }

    case types.SET_AUTH_TO_LOCAL_STORAGE: {
      // console.log('success: ', action.payload)
      if (action.payload.access_token) {
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
      } else {
        localStorage.removeItem('access_token');        
      }

      return state
    }

    case types.AUTH_CLEAR: {
      localStorage.removeItem('authUser');
      localStorage.removeItem('access_token');

      return {
        ...state,
        isAuthenticated: false,
        authUser: null,
        access_token: null,
      }
    }

    default:
      return state;
  }
}