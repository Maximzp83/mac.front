import {
	handleGetItemsResponse,
	handleError,
	isSuccessStatus,
	getResponseMessage,
	handleRemoveItemsResponse
} from 'services/api/api_helpers';
import { api } from 'services/api';
import { toastr } from 'react-redux-toastr';
import store from 'redux/store';
import { setAuthUser } from './authActions';
// import { setLoadingStatusFor, setSavingStatusFor } from './statusActions';
import { fetchItemsFor } from './common/operationActions';
import { setItemsFor, setMetaFor } from './common/itemsDataActions';

// import { LOAD_STATUS, SAVE_STATUS } from '../constants';

export const types = {
	USERS_REQUEST_START: 'USERS_REQUEST_START',
	USERS_REQUEST_END: 'USERS_REQUEST_END',
	USERS_SAVE_STATUS: 'USERS_SAVE_STATUS',
	USERS_SET_ITEMS: 'USERS_SET_ITEMS',
	USERS_ADD_ITEM: 'USERS_ADD_ITEM',
	USERS_UPDATE_ITEM: 'USERS_UPDATE_ITEM',
	USERS_DELETE_ITEM: 'USERS_DELETE_ITEM',
	USERS_SET_FILTER: 'USERS_SET_FILTER',
	USERS_SET_META: 'USERS_SET_META'

	// SET_AUTH_TO_STORE: "SET_AUTH_TO_STORE",
	// SET_AUTH_TO_LOCAL_STORAGE: "SET_AUTH_TO_LOCAL_STORAGE",
};

// const setUsersLoadStatus = setLoadingStatusFor('USERS_');
// const setUsersSaveStatus = setSavingStatusFor('USERS_');

export const fetchUsers = payload => {
	return dispatch => {
		// dispatch(setUsersLoadStatus(true));	
		dispatch(fetchItemsFor('USERS_', '/users')(payload));
	};
};

export const saveUser = payload => {
	return dispatch => {
		dispatch({ type: types.USERS_SAVE_STATUS, payload: true });
		// dispatch(setUsersSaveStatus(true));	

		const settings = { 
			dispatch,
			types: { statusEnd: types.USERS_SAVE_STATUS },
		};
		// console.log(payload)
		let options;

		if (payload.data.id) {
			options = {
				method: 'PUT',
				url: `/users/${payload.data.id}`,
				resultMessage: 'сохранен',
				// actionType: types.USERS_UPDATE_ITEM
				// actions: [{name:fetchUsers}]
			}
		} else {
			options = {
				method: 'POST',
				url: `/users`,
				resultMessage: 'создан',
				// actionType: types.USERS_ADD_ITEM
				// actions: [{name:fetchUsers}]
			}
		}
		const { method, url, resultMessage, actionType, actions } = options;

		return new Promise((resolve, reject) => {
			api(method, url, payload)
				.then(response => {
					const savedUser = response.data.data;
					// handleSetItemsResponse(response, settings);
					if (isSuccessStatus(response)) {
						if (actionType) {
							dispatch({ type: actionType, payload: savedUser });							
						} 
						if (actions && actions.length) {
							for(let action of actions) {
								const {payload} = action;
								dispatch(action.name(payload || null));
							}
						} 

						// ------Update AuthUser-----
						let copyAuthUser = Object.assign({}, store.getState().auth.authUser);
						if (savedUser.id === copyAuthUser.id) {
							savedUser.avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg';
							dispatch(setAuthUser(savedUser));	
						}
						// ---------------------------

						toastr.success('', `Пользователь ${resultMessage}`);
						resolve()
					} else {
						reject()
						const message = getResponseMessage(response);
						toastr.error('Ошибка', message || 'неправильный формат данных ответа', {timeOut: 0});
					}
					dispatch({ type: types.USERS_SAVE_STATUS, payload: false });
				})
				.catch(error => {
					handleError(error, settings, {reject:reject});
				});
		})
	};
};

export const deleteUser = id => {
	return dispatch => {
		dispatch({ type: types.USERS_SAVE_STATUS, payload: true });
		
		const settings = { 
			dispatch, id,
			types: {
				// itemsAction: types.USERS_DELETE_ITEM,
				statusEnd: types.USERS_SAVE_STATUS
			},
		};
		return new Promise((resolve, reject) => {
			settings.resolve = resolve;
			settings.reject = reject;
			api('DELETE', `/roles/${id}`)
				.then(response => {	handleRemoveItemsResponse(response, settings);	})
				.catch(error => {	handleError(error, settings);	});
		})
	}
}

export const setUsers = users => {
	return setItemsFor('USERS_')(users);
};

export const setUsersFilter = filter => {
	return { type: types.USERS_SET_FILTER, payload: filter };
};

export const setUsersMeta = meta => {
	// return dispatch(setMetaFor('USERS_')(meta));
	return setMetaFor('USERS_')(meta);
};
