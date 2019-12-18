import { standardResponse } from 'services/api/api';
// import { requestResolveCallback, requestRejectCallback } from '../../services/api/api_helpers';
import {getResponseMessage} from 'helpers';
import { toastr } from 'react-redux-toastr';


export const types = {
	REQUEST_START: 'REQUEST_START',
	REQUEST_END: 'REQUEST_END',
	SET_ITEMS: 'SET_ITEMS',
	SET_FILTER: 'SET_FILTER',
	SET_META: 'SET_META'

	// SET_AUTH_TO_STORE: "SET_AUTH_TO_STORE",
	// SET_AUTH_TO_LOCAL_STORAGE: "SET_AUTH_TO_LOCAL_STORAGE",
};

export function fetchUsers(payload) {
	return dispatch => {
		dispatch({ type: types.REQUEST_START });

		const options = {
			url: '/users',
			method: 'get'
		};

		if (payload) {
			if (payload.getParams) options.getParams = payload.getParams;
		}

		standardResponse(options)
			.then(response => {
				if (response.data && response.data.data) {
					console.log(response.data)
					dispatch({
						type: types.SET_ITEMS,
						payload: response.data.data
					});
				} else {
					let error = new Error('ответ не содержит данных');
					toastr.error('Ошибка', error.message, {timeOut: 0});
				}
				dispatch({ type: types.REQUEST_END });
			})
			.catch(error => {
				let message = getResponseMessage(error)
				dispatch({ type: types.REQUEST_END });
				toastr.error('Ошибка', message || error.message, {timeOut: 0});
			});
	};
}

export function setUsers(users) {
	return { type: types.SET_ITEMS, payload: users };
}

export function setUsersFilter(filter) {
	return { type: types.SET_FILTER, payload: filter };
}

export function setUsersMeta(meta) {
	return { type: types.SET_META, payload: meta };
}
