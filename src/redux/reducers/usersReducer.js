import { types } from '../actions/usersActions';

const initialState = {
	usersLoading: false,
	usersSaving: false,
	usersList: [],
	usersStatus: 'ready',
	usersFilter: {
		isClient: null,
		isActive: null
	},
	usersMeta: {
		max: 10
	},
	userTypesList: [
		{ id: 1, name: 'Внутренний' },
		{ id: 2, name: 'Внешний' },
	]
};

export default function(state = initialState, action) {
	// console.log(action)

	switch (action.type) {

		case types.USERS_REQUEST_START: {
			return { ...state, usersLoading: true };
		}

		case types.USERS_REQUEST_END: {
			return { ...state, usersLoading: false };
		}

		case types.USERS_SAVE_STATUS: {
			return { ...state, usersSaving: action.payload };
		}

		case types.USERS_SET_ITEMS: {
			return { ...state, usersList: action.payload };
		}

		case types.USERS_ADD_ITEM: {
			const newUser = action.payload;
			return { ...state, usersList: [...state.usersList, newUser] }
		}

		case types.USERS_UPDATE_ITEM: {
			const { id } = action.payload;
			const newUsersList = state.usersList.map(user =>
			  user.id === id ? action.payload : user
			) 
			return { ...state, usersList: newUsersList }
		}

		case types.USERS_DELETE_ITEM: {
			const id = action.payload;
			const newUsersList = state.usersList.filter(user => user.id !== id) 
			return { ...state, usersList: newUsersList }
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
