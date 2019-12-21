import store from 'redux/store';
import isEmpty from 'lodash.isempty';
import { push as routerPush } from 'react-router-redux';
import { clearAuth } from 'redux/actions/authActions';
import { toastr } from 'react-redux-toastr';
import axios from './axiosService';

const combineHeaders = headers => {
	if (headers) return headers;

	return headers;
	// headers = {'Content-Type': 'multipart/form-data'}
};

const setHttpToken = token => {
	if (token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		axios.defaults.headers.common.Authorization = null;
	}
	// console.log('2: ',axios.defaults.headers.common.Authorization)
};

const checkAuthorizationHeaders = () => {
	// console.log('1: ',axios.defaults.headers.common.Authorization)
	if (!!axios.defaults.headers.common && !!axios.defaults.headers.common.Authorization) {
		// empty
	} else {
		const token = store.getState().auth.access_token;
		setHttpToken(token);
	}
};

const toUrl = obj => {
	const str = [];
	// console.log('obj:', obj)
	for (const p in obj) {
		// if (obj.hasOwnProperty(p) && obj[p]) {
		if (Object.prototype.hasOwnProperty.call(obj, p) && obj[p]) {
			if (p === 'before' || p === 'after') {
				str.push(`${encodeURIComponent(p)}=${obj[p]}`);
			} else {
				str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
			}
		}
	}
	return str.join('&');
};

const parsePayload = payloadData => {
	const result = {};
	if (payloadData) {
		const payload = { ...payloadData };

		if (!isEmpty(payload)) {
			if (payload.getParams) result.params = payload.getParams;
			if (payload.data) result.data = payload.data;
		}
	}
	return result;
};

const combineUrl = (initialUrl, params) => {
	let url = initialUrl;
	if (params) {
		// if (params.itemId) url = `${url}/${params.itemId}`;
		const getParams = toUrl(params);
		url = getParams ? `${url}?${getParams}` : url;
	}
	// console.log(url)
	return url;
};

const isSuccessStatus = response => {
	if (response.status >= 200 && response.status < 300) {
		if (response.data && response.data.data) {
			return true;
		} else if (response.data && response.data.status) {
			return true;
		}
	}
	return false;
};

const getResponseMessage = originalResponse => {
	let message = '';

	if (originalResponse) {
		const response = originalResponse.data ? originalResponse.data : originalResponse.response;

		if (response && response.data) {
			const { messages } = response.data;

			if (messages instanceof Array) {
				for (let i = 0; i < messages.length; i++) {
					for (let j = 0; j < messages[i].length; j++) {
						const comma = j === messages[i].length - 1 ? '.' : ', ';
						message += `${messages[i][j]}${comma}`;
					}
				}
			}
		}
	}

	return message;
};

const handleSetItemsResponse = (response, { dispatch, types, payload, resolve=null }) => {
	// console.log('handleResponse',response)
	if (isSuccessStatus(response)) {
		dispatch({
			type: types.itemsAction,
			payload: response.data.data
		});		
	} else {
		const message = getResponseMessage(response);
		toastr.error('Ошибка', message || 'неправильный формат данных ответа', {
			timeOut: 0
		});
	}
	dispatch({ type: types.statusEnd, payload: false });
};

const handleRemoveItemsResponse = (response, { dispatch, types, payload, resolve=null, id }) => {
	if (isSuccessStatus(response)) {
		console.log('handleResponse',types.itemsAction, id)
		dispatch({ type: types.itemsAction, payload: id	});		
	} else {
		const message = getResponseMessage(response);
		toastr.error('Ошибка', message || 'неправильный формат данных ответа', {
			timeOut: 0
		});
	}
	dispatch({ type: types.statusEnd, payload: false });
};

const handleError = (error, { dispatch, types, payload, reject=null }) => {
	const message = getResponseMessage(error);

	if (error.response) {
		if (error.response.status === 401) {
			dispatch(clearAuth());
			dispatch(routerPush('/auth/sign-in'));
			dispatch({ type: types.statusEnd });
			toastr.error(message || 'Ваша сессия устарела', 'пожалуйста авторизуйтесь', { timeOut: 0 });
			return;
		}
	}
	if (reject) reject()
	dispatch({ type: types.statusEnd, payload: payload });
	toastr.error('Ошибка', message || error.message, { timeOut: 0 });
};

/* export const requestRejectCallback = (error, {commit, reject, mutations}) => {
	try {
		if (mutations) {
			// mutations.status ? commit(mutations.status, 'ready') : null;
			// mutations.list ? commit(mutations.list, null) : null;
			// mutations.meta ? commit(mutations.meta, null) : null;
		}
		// console.log(error.response)
		if (error && error.response) {
			if (error.response.status === 401) {
				store.dispatch('auth/clearAuth')
				Notification({
				  type: 'warning',
				  title: 'Your session is expired!',
				  message: error.response.data ? error.response.data.message : 'Try sign in again'
				})
				router.push('/login')
				return;
			}
		}

		reject(error)
	} catch(e) {console.log(e)}
} */

export {
	checkAuthorizationHeaders,
	combineHeaders,
	setHttpToken,
	toUrl,
	parsePayload,
	combineUrl,
	handleError,
	handleSetItemsResponse,
	getResponseMessage,
	isSuccessStatus,
	handleRemoveItemsResponse
};
