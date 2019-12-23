import {
	handleGetItemsResponse,
	handleError,
	isSuccessStatus,
	getResponseMessage,
	handleRemoveItemsResponse
} from 'services/api/api_helpers';

import { toastr } from 'react-redux-toastr';
import { api } from 'services/api';

export const types = {
	ROLES_REQUEST_START: 'ROLES_REQUEST_START',
	ROLES_REQUEST_END: 'ROLES_REQUEST_END',
	ROLES_SAVE_STATUS: 'ROLES_SAVE_STATUS',
	ROLES_SET_ITEMS: 'ROLES_SET_ITEMS',
	ROLES_ADD_ITEM: 'ROLES_ADD_ITEM',
	ROLES_UPDATE_ITEM: 'ROLES_UPDATE_ITEM',
	ROLES_DELETE_ITEM: 'ROLES_DELETE_ITEM',
	ROLES_SET_FILTER: 'ROLES_SET_FILTER',
	ROLES_SET_META: 'ROLES_SET_META'
};

export const fetchRoles = payload => {
	return dispatch => {
		dispatch({ type: types.ROLES_REQUEST_START });

		const settings = { 
			dispatch,
			types: {
				itemsAction: types.ROLES_SET_ITEMS,
				statusEnd: types.ROLES_REQUEST_END,
				setMeta: types.ROLES_SET_META
			}			
		};
		// console.log(payload)
		api('GET', '/roles', payload)
			.then(response => {
				handleGetItemsResponse(response, settings);
			})
			.catch(error => {
				handleError(error, settings);
			});
	};
};

export const saveRole = payload => {
	return dispatch => {
		dispatch({ type: types.ROLES_SAVE_STATUS, payload: true });

		const settings = { 
			dispatch,
			types: { statusEnd: types.ROLES_SAVE_STATUS },
		};
		// console.log(payload)
		let options;

		if (payload.data.id) {
			options = {
				method: 'PUT',
				url: `/roles/${payload.data.id}`,
				resultMessage: 'сохранена',
				actionType: types.ROLES_UPDATE_ITEM
			}
		} else {
			options = {
				method: 'POST',
				url: `/roles`,
				resultMessage: 'создана',
				actionType: types.ROLES_ADD_ITEM
			}
		}
		const { method, url, resultMessage, actionType } = options;

		return new Promise((resolve, reject) => {
			api(method, url, payload)
				.then(response => {
					// handleGetItemsResponse(response, settings);
					if (isSuccessStatus(response)) {
						dispatch({
							type: actionType,
							payload: response.data.data
						});	
						dispatch({ type: types.ROLES_SAVE_STATUS, payload: false });
						toastr.success('', `Группа пользователей ${resultMessage}`);
						resolve()
					} else {
						reject()
						const message = getResponseMessage(response);
						toastr.error('Ошибка', message || 'неправильный формат данных ответа', {timeOut: 0});
					}
				})
				.catch(error => {
					handleError(error, settings, {reject:reject});
				});
		})
	};
};

export const deleteRole = id => {
	return dispatch => {
		dispatch({ type: types.ROLES_SAVE_STATUS, payload: true });
		
		const settings = { 
			dispatch, id,
			types: { itemsAction: types.ROLES_DELETE_ITEM, statusEnd: types.ROLES_SAVE_STATUS },
		};

		api('DELETE', `/roles/${id}`)
			.then(response => {	handleRemoveItemsResponse(response, settings);	})
			.catch(error => {	handleError(error, settings);	});
	}
}

export const setRoles = items => {
	return { type: types.ROLES_SET_ITEMS, payload: items };
};

export const setRolesFilter = filter => {
	return { type: types.ROLES_SET_FILTER, payload: filter };
};

export const setRolesMeta = meta => {
	return { type: types.ROLES_SET_META, payload: meta };
};
