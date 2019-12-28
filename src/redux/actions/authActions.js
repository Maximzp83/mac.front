// import { setItemsFor, setMetaFor, setFiltersFor } from './common/itemsDataActions';
import { setLoadingStatusFor/*, setSavingStatusFor*/ } from './common/statusActions';
// import store from 'redux/store';
// import { setAuthUser } from './authActions';

/*const fetchRoles = payload => {
	return fetchItemsFor('ROLES_', '/roles')(payload);
};*/
import {
	AUTH_SUCCESS,
	AUTH_CLEAR,
	AUTH_SET_USER
} from '../constants';

import { api } from 'services/api';
import { getResponseMessage, isSuccessStatus } from 'services/api/api_helpers';
import { push as routerPush } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';

/*const types = {
	AUTH_REQUEST_START: 'AUTH_REQUEST_START',
	AUTH_SUCCESS: 'AUTH_SUCCESS',
	AUTH_REQUEST_END: 'AUTH_REQUEST_END',
	AUTH_CLEAR: 'AUTH_CLEAR',
	AUTH_SET_USER: 'AUTH_SET_USER',
};*/

/*const fetchAuthUser = () => {
	return dispatch => {
		 const options = {
			url: '/auth/user',
			method: 'get',
		}; 
		 standardResponse(options)
				.then( response => {
					// console.log(response)
					if ( isSuccessStatus(response) && response.data) {
						// resolve(response.data)
					} else {
						// reject(new Error(response));
					}
				}) 
		.catch( error => {reject(new Error(error));})
	};
}; */

const signIn = payload => {
	return dispatch => {
		// dispatch({ type: AUTH_REQUEST_START });
    dispatch(setLoadingStatusFor('AUTH_')(true));  

		api('POST', '/auth/login', payload)
			.then(response => {
				if (isSuccessStatus(response)) {
					if (response.data.data.access_token) {
						const { access_token, user } = response.data.data;
						try {
							// console.log('response: ', response)
							// const { user } = responseData;
							user.avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg';
					
							dispatch({ type: AUTH_SET_USER, payload: user });
							dispatch({ type: AUTH_SUCCESS, payload: access_token });
							dispatch(setLoadingStatusFor('AUTH_')(false));  
						} catch(e) {console.log(e)}

						dispatch(routerPush('/dashboard'));
						toastr.success('', `Вы вошли как ${user.login}`);
					} else {
						dispatch({ type: AUTH_CLEAR });
						dispatch(setLoadingStatusFor('AUTH_')(false));
						const message = getResponseMessage(response);
						toastr.error('Ошибка', message || 'ответ не содержит данных', { timeOut: 0 });
					}
				} else {
					const message = getResponseMessage(response);
					toastr.error('Ошибка', message || 'неправильный статус ответа', { timeOut: 0 });
				}
			})
			.catch(error => {
				dispatch({ type: AUTH_CLEAR });
				dispatch(setLoadingStatusFor('AUTH_')(false));
				const message = getResponseMessage(error);
				toastr.error('Ошибка', message || error.message);
			});
	};
};

const signOut = () => {
	return dispatch => {
		dispatch(setLoadingStatusFor('AUTH_')(true));
		// dispatch({ type: AUTH_REQUEST_START });
		dispatch({ type: AUTH_CLEAR });
		setTimeout(() => {
			dispatch(setLoadingStatusFor('AUTH_')(false));  
			// dispatch({ type: AUTH_REQUEST_END });
		}, 100);
		toastr.success('', 'Вы успешно вышли из аккаунта');
	};
};

const setAuthUser = user => {
	// console.log(user)
	return { type: AUTH_SET_USER, payload: user };
};
const clearAuth = () => {
	return { type: AUTH_CLEAR };
};

export {
	signIn,
	signOut,
	setAuthUser,
	clearAuth
}
