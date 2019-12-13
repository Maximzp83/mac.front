import { types } from "../actions/authActions";

let token = localStorage.getItem('access_token')
let user = JSON.parse( localStorage.getItem('authUser') )

const initialState = {
  authLoading: false,
  authUser: !!token && !!user ? user : null,
  isAuthenticated: !!token || false,
  access_token:  token || null,
  // error: null
};

export default function(state = initialState, action) {
      // console.log(action.type)
  switch (action.type) {

    case types.AUTH_REQUEST: {
      return { ...state, authLoading: true }
    }

    case types.AUTH_SUCCESS: {
      return { ...state, authLoading: false }
    }

    case types.AUTH_FAILURE: {
      return { ...state, authLoading: false }
    }

    case types.SET_AUTH_TO_STORE: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        authUser: action.payload.user,
        access_token: action.payload.access_token,
      }
    }

    case types.SET_AUTH_TO_LOCAL_STORAGE: {
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