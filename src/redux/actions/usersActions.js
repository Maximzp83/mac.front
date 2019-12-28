import { setAuthUser } from './authActions';
// import { setLoadingStatusFor, setSavingStatusFor } from './statusActions';
import { fetchItemsFor, saveItemFor, deleteItemFor } from './common/apiActions';
import { setItemsFor, setMetaFor, setFiltersFor } from './common/itemsDataActions';
import store from 'redux/store';

// import { LOAD_STATUS, SAVE_STATUS } from '../constants';

// const setUsersLoadStatus = setLoadingStatusFor('USERS_');
// const setUsersSaveStatus = setSavingStatusFor('USERS_');

const fetchUsers = payload => {
	return fetchItemsFor('USERS_', '/users')(payload);
};

const saveUser = payload => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			dispatch(saveItemFor('USERS_', '/users')(payload))
				.then((response) => {
					let copyAuthUser = Object.assign({}, store.getState().auth.authData.authUser);
					let savedUser = response.data;
					if (savedUser.id === copyAuthUser.id) {
					  savedUser.avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg';
					  dispatch(setAuthUser(savedUser));  
					}
					resolve()
				})
				.catch(() => {reject()})
		})
	}
};

const deleteUser = id => {
	return deleteItemFor('USERS_', '/users')(id);	
}

const setUsers = users => {
	return setItemsFor('USERS_')(users);
};

const setUsersFilters = filters => {
	// console.log(filters)
	return setFiltersFor('USERS_')(filters);
};

const setUsersMeta = meta => {
	return setMetaFor('USERS_')(meta);
};

export {
	fetchUsers,
	saveUser,
	deleteUser,
	setUsers,
	setUsersFilters,
	setUsersMeta
}
