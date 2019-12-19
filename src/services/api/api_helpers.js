import axios from './axiosService';
import store from 'redux/store';
import isEmpty from 'lodash.isempty';
import { push as routerPush } from 'react-router-redux';
import { clearAuth } from "redux/actions/authActions";
import { toastr } from 'react-redux-toastr';

const combineHeaders = (headers) => {
  if (headers) return headers;

  return headers;
      // headers = {'Content-Type': 'multipart/form-data'}  
};

const checkAuthorizationHeaders = () => {
  // console.log('1: ',axios.defaults.headers.common.Authorization)
  if (!!axios.defaults.headers.common && 
  		!!axios.defaults.headers.common.Authorization) {
  } else {
	  const token = store.getState().auth.access_token;    
	  setHttpToken(token);
  }
};

const setHttpToken = token => {
	if (!!token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		axios.defaults.headers.common.Authorization = null;		
	}
  // console.log('2: ',axios.defaults.headers.common.Authorization)
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

const parsePayload = (payloadData) => {
  let result = {};
  if (payloadData) {
    let payload = Object.assign({}, payloadData);

    if ( !isEmpty(payload) ) {
      if (payload.getParams) result.params = payload.getParams;
      if (payload.data) result.data = payload.data;
    }
  }
  return result;
};

const combineUrl = (initialUrl, params) => {
  try {
    let url = initialUrl;
    if (params) {
      // if (params.itemId) url = `${url}/${params.itemId}`;
        const getParams = toUrl(params);
        url = getParams ? `${url}?${getParams}` : url;
    }
    // console.log(url)
    return url;
  } catch (error) {
    console.error(error);
  }
}

const isSuccessStatus = (code) => {
	if (code) {
		return code >= 200 && code < 300 ? true : false;		
	}
	return false;
}

const getResponseMessage = originalResponse => {
	let message = '';
	// console.log(error.data)
	const response = !!originalResponse.data ? originalResponse.data : originalResponse.response;
	const messages = response.data.messages;

	if (messages instanceof Array) {
		for (let i = 0; i < messages.length; i++) {
			for (let j = 0; j < messages[i].length; j++) {
				let comma = j === messages[i].length-1 ? '.' : ', ';
			 	message += `${messages[i][j]}${comma}`; 
			}
		}
	}

	return message;
};

const handleSetItemsResponse = (response, {dispatch, types}) => {
	// console.log('handleResponse',response)
	if ( isSuccessStatus(response.status) ) {
		if (response.data && response.data.data) {
			// console.log(response.data)
			dispatch({
				type: types.SET_ITEMS,
				payload: response.data.data
			});
		} else {
			let message = getResponseMessage(response);
			toastr.error('Ошибка', message || 'ответ не содержит данных', {timeOut: 0});
		}
	} else {
		let message = getResponseMessage(response);
		toastr.error('Ошибка', message || 'неправильный статус ответа', {timeOut: 0});		
	}
	dispatch({ type: types.REQUEST_END });
}

const handleError = (error, {dispatch, types}) => {
	let message = getResponseMessage(error)

	if (error.response) {
		if (error.response.status === 401) {
			dispatch(clearAuth())
			dispatch(routerPush('/auth/sign-in'));
			dispatch({ type: types.REQUEST_END });			
			toastr.error(message || 'Ваша сессия устарела', 'пожалуйста авторизуйтесь', {timeOut: 0});
			return;
		}
	}
	dispatch({ type: types.REQUEST_END });
	toastr.error('Ошибка', message || error.message, {timeOut: 0});
}

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
	isSuccessStatus
}
