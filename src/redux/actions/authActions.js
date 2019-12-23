/* import { 
	handleSetItemsResponse,
	handleError,
} from 'services/api/api_helpers'; */
import { api } from 'services/api';
import { getResponseMessage, isSuccessStatus } from 'services/api/api_helpers';
import { push as routerPush } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';

export const types = {
	AUTH_REQUEST_START: 'AUTH_REQUEST_START',
	AUTH_SUCCESS: 'AUTH_SUCCESS',
	AUTH_REQUEST_END: 'AUTH_REQUEST_END',
	AUTH_CLEAR: 'AUTH_CLEAR'
	// SET_AUTH_TOKEN_TO_STORE: 'SET_AUTH_TOKEN_TO_STORE',
	// SET_AUTH_USER_TO_STORE: 'SET_AUTH_USER_TO_STORE',
};

/* export const fetchAuthUser = () => {
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

export const signIn = payload => {
	return dispatch => {
		dispatch({ type: types.AUTH_REQUEST_START });

		api('POST', '/auth/login', payload)
			.then(response => {
				if (isSuccessStatus(response)) {
					if (response.data && response.data.data && response.data.data.access_token) {
						const responseData = response.data.data;
						// console.log('response: ', response)
						const { user } = responseData;
						user.avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg';

						dispatch({
							type: types.AUTH_SUCCESS,
							payload: {
								access_token: responseData.access_token,
								user: responseData.user
							}
						});

						dispatch({ type: types.AUTH_REQUEST_END });

						dispatch(routerPush('/dashboard'));
						toastr.success('', `Вы вошли как ${responseData.user.fullName}`);
					} else {
						dispatch({ type: types.AUTH_CLEAR });
						dispatch({ type: types.AUTH_REQUEST_END });

						const message = getResponseMessage(response);
						toastr.error('Ошибка', message || 'ответ не содержит данных', { timeOut: 0 });
					}
				} else {
					const message = getResponseMessage(response);
					toastr.error('Ошибка', message || 'неправильный статус ответа', { timeOut: 0 });
				}
			})
			.catch(error => {
				dispatch({ type: types.AUTH_CLEAR });
				dispatch({ type: types.AUTH_REQUEST_END });
				const message = getResponseMessage(error);
				toastr.error('Ошибка', message || error.message);
			});
	};
};

export const signOut = () => {
	return dispatch => {
		dispatch({ type: types.AUTH_REQUEST_START });
		dispatch({ type: types.AUTH_CLEAR });
		setTimeout(() => {
			dispatch({ type: types.AUTH_REQUEST_END });
		}, 100);
		toastr.success('', 'Вы успешно вышли из аккаунта');
	};
};

export const clearAuth = () => {
	return { type: types.AUTH_CLEAR };
};
