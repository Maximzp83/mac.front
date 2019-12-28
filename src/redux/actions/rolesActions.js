import { fetchItemsFor, saveItemFor, deleteItemFor } from './common/apiActions';
import { setItemsFor, setMetaFor, setFiltersFor } from './common/itemsDataActions';
import store from 'redux/store';
import { setAuthUser } from './authActions';

const fetchRoles = payload => {
	return fetchItemsFor('ROLES_', '/roles')(payload);
};

const saveRole = payload => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(saveItemFor('ROLES_', '/roles')(payload))
				.then((response) => {
					// ------Update AuthUser rules in store-----
					try {
						// console.log(response)
						const savedRole = response.data.data;
						let copyAuthUser = Object.assign({}, store.getState().auth.authData.authUser);
						if (savedRole.id === copyAuthUser.role.id) {
							copyAuthUser.role.rules = savedRole.rules;
							dispatch(setAuthUser(copyAuthUser));	
						}
					} catch(error) {
						throw new Error(error.message)
					}
					// ---------------------------
					resolve()
				})
				.catch(() => {reject()})
		})
	}
};

const deleteRole = id => {
	return deleteItemFor('ROLES_', '/roles')(id);	
}

const setRoles = roles => {
	return setItemsFor('ROLES_')(roles);
};

const setRolesFilters = filters => {
	// console.log(filters)
	return setFiltersFor('ROLES_')(filters);
};

const setRolesMeta = meta => {
	return setMetaFor('ROLES_')(meta);
};

export {
	fetchRoles,
	saveRole,
	deleteRole,
	setRoles,
	setRolesFilters,
	setRolesMeta
}
