import { types } from '../actions/rolesActions';

import { SECTIONS } from 'constants/global'

const initialState = {
	rolesLoading: false,
	rolesSaving: false,
	rolesList: [],
	ruleTypes: [
		{ ruleType: SECTIONS.COMPANY, 		name: 'Company' },
		{ ruleType: SECTIONS.MODEM, 			name: 'Modem' },
		{ ruleType: SECTIONS.POINT_SALE, 	name: 'Point sale' },
		{ ruleType: SECTIONS.USER, 				name: 'User' },
		{ ruleType: SECTIONS.ROLE, 				name: 'Role' }
	],
	rolesFilter: {
		// isClient: null,
		// isActive: null,
		max: 10,
		page: 1
	},
	rolesMeta: {
		current_page: 1,
		from: 1,
		last_page: 1,
		path: '',
		per_page: 0,
		to: 0,
		total: 0,
	}
};

export default function(state = initialState, action) {
	// console.log(action)

	switch (action.type) {

		case types.ROLES_REQUEST_START: {
			return { ...state, rolesLoading: true };
		}

		case types.ROLES_REQUEST_END: {
			return { ...state, rolesLoading: false };
		}

		case types.ROLES_SAVE_STATUS: {
			return { ...state, rolesSaving: action.payload };
		}

		case types.ROLES_SET_ITEMS: {
			return { ...state, rolesList: action.payload };
		}

		case types.ROLES_ADD_ITEM: {
			const newRole = action.payload;
			return { ...state, rolesList: [...state.rolesList, newRole] }
		}

		case types.ROLES_UPDATE_ITEM: {
			const { id } = action.payload;
			const newRolesList = state.rolesList.map(role =>
			  role.id === id ? action.payload : role
			) 
			return { ...state, rolesList: newRolesList }
		}

		case types.ROLES_DELETE_ITEM: {
			const id = action.payload;
			const newRolesList = state.rolesList.filter(role => role.id !== id) 
			return { ...state, rolesList: newRolesList }
		}

		case types.ROLES_ITEMS_CLEAR: {
			return { ...state, rolesList: [] };
		}

		case types.ROLES_SET_FILTER: {
			return { ...state, rolesFilter: action.payload };
		}

		case types.ROLES_SET_META: {
			return { ...state, rolesMeta: action.payload };
		}

		default:
			return state;
	}
}
