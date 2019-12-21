import { types } from '../actions/usersActions';

const initialState = {
	usersLoading: false,
	usersList: [],
	usersStatus: 'ready',
	usersFilter: {
		isClient: null,
		isActive: null
	},
	usersMeta: {
		max: 10
	}
};

export default function(state = initialState, action) {
	// console.log(action)

	switch (action.type) {
		/* case types.USERS_ITEMS_STATUS: {
			return {
				...state,
				usersLoading: action.payload.isLoading,
				usersStatus: action.payload.status
			};
		} */
		case types.USERS_REQUEST_START: {
			return { ...state, usersLoading: true };
		}

		case types.USERS_REQUEST_END: {
			return { ...state, usersLoading: false };
		}

		case types.USERS_SET_ITEMS: {
			return { ...state, usersList: action.payload };
		}

		case types.USERS_ITEMS_CLEAR: {
			return { ...state, usersList: [] };
		}

		case types.USERS_SET_FILTER: {
			return { ...state, usersFilter: action.payload };
		}

		case types.USERS_SET_META: {
			return { ...state, usersMeta: action.payload };
		}

		default:
			return state;
	}
}
