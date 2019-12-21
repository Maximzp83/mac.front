import { types } from '../actions/authActions';
import { setHttpToken } from 'services/api/api_helpers';
const token = localStorage.getItem('access_token');
const user = JSON.parse(localStorage.getItem('authUser'));

const initialState = {
	authLoading: false,
	authUser: !!token && !!user ? user : null,
	isAuthenticated: !!user || false,
	// authUser: null,
	// isAuthenticated: false,
	access_token: token || null
	// error: null
};

export default function(state = initialState, action) {
	// console.log(action.type)
	switch (action.type) {
		case types.AUTH_REQUEST_START: {
			return { ...state, authLoading: true };
		}

		case types.AUTH_SUCCESS: {
			localStorage.setItem('access_token', action.payload.access_token);
			localStorage.setItem('authUser', JSON.stringify(action.payload.user));
			// setHttpToken(action.payload);
			return {
				...state,
				isAuthenticated: true,
				authUser: action.payload.user,
				access_token: action.payload.access_token
			};
		}

		/* case types.SET_AUTH_TOKEN_TO_STORE: {
			localStorage.setItem('access_token', action.payload);
			// setHttpToken(action.payload);
			return { ...state, access_token: action.payload };
		}

		case types.SET_AUTH_USER_TO_STORE: {
			localStorage.setItem('authUser', JSON.stringify(action.payload.user));
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				authUser: action.payload.user,
			};
		} */

		case types.AUTH_REQUEST_END: {
			return { ...state, authLoading: false };
		}

		case types.AUTH_CLEAR: {
			localStorage.removeItem('authUser');
			localStorage.removeItem('access_token');
			setHttpToken(null);

			return {
				...state,
				isAuthenticated: false,
				authUser: null,
				access_token: null
			};
		}

		default:
			return state;
	}
}
