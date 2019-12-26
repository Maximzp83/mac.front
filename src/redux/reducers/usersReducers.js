import { types } from '../actions/usersActions';
import { combineReducers } from 'redux';
import itemsDataReducerFor from './common/itemsDataReducerFor';
import statusReducerFor from './common/statusReducerFor';

const initialState = {
	usersLoading: false,
	usersSaving: false,
	usersList: [],
	usersFilter: {
		isClient: null,
		isActive: null,
		max: 10,
		page: 1
	},
	usersMeta: {
		current_page: 1,
		from: 1,
		last_page: 1,
		path: '',
		per_page: 0,
		to: 0,
		total: 0,
	},
};

const usersDataReducer = (state = initialState, action) => {
	// console.log(action)

	switch (action.type) {

		case types.USERS_REQUEST_START: {
			return { ...state, usersLoading: true };
		};

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

const usersReducers = combineReducers({
  // usersData: usersDataReducer,
  usersData: itemsDataReducerFor('USERS_'),
  usersStatus: statusReducerFor('USERS_'),
});

export default usersReducers;