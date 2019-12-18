import { standardResponse } from 'services/api/api';
// import { requestResolveCallback, requestRejectCallback } from '../../services/api/api_helpers';
import { getResponseMessage } from 'helpers';
import { push as routerPush } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';

function isSuccessStatus(code) {
	if (code) {
		let str = code+'';
		return str[0] === '2' ? true : false;		
	}
	return false;
}

export const types = {
	AUTH_REQUEST_START: 'AUTH_REQUEST_START',
	AUTH_SUCCESS: 'AUTH_SUCCESS',
	// AUTH_FAILURE: 'AUTH_FAILURE',
	AUTH_REQUEST_END: 'AUTH_REQUEST_END',
	AUTH_CLEAR: 'AUTH_CLEAR',
	// SET_AUTH_TOKEN_TO_STORE: 'SET_AUTH_TOKEN_TO_STORE',
	// SET_AUTH_USER_TO_STORE: 'SET_AUTH_USER_TO_STORE',
};


export const fetchAuthUser = () => {
	return dispatch => {
		const options = {
			url: '/auth/user',
			method: 'get',
		};
		
			standardResponse(options)
				.then( response => {
					// console.log(response)
					if ( isSuccessStatus(response.status) && response.data) {
						// resolve(response.data)
					} else {
						// reject(new Error(response));
					}
				})
				.catch( error => {/*reject(new Error(error));*/})
	}
}


export const signIn = payload => {
	return dispatch => {
		dispatch({ type: types.AUTH_REQUEST_START });

		const options = {
			url: '/auth/login',
			method: 'post',
			data: payload
		};

		// console.log('actions payload: ', payload)

		standardResponse(options)
			.then( response => {
				if (isSuccessStatus(response.status)) {
					if (response.data && response.data.data && response.data.data.access_token) {
						const responseData = response.data.data;
						// console.log('response: ', response)
						let user = responseData.user;
						user.avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg"

						dispatch({
							type: types.AUTH_SUCCESS,
							payload: {
								access_token: responseData.access_token,
								user: responseData.user,
							}
						});

						dispatch({ type: types.AUTH_REQUEST_END });

						dispatch(routerPush('/dashboard/default'));
						toastr.success('', `Вы вошли как ${responseData.user.fullName}`);						
					} else {
						dispatch({ type: types.AUTH_CLEAR });
						dispatch({ type: types.AUTH_REQUEST_END });

						let error = new Error('ответ не содержит данных');
						toastr.error('Ошибка', error.message, {timeOut: 0});			
					}
				}
			})
			.catch(error => {
				dispatch({ type: types.AUTH_CLEAR });
				dispatch({ type: types.AUTH_REQUEST_END });				
				let message = getResponseMessage(error)
				toastr.error('Ошибка', message || error.message);
			});
	};
}

export function signOut() {
	return dispatch => {
		dispatch({ type: types.AUTH_REQUEST_START });

		/*const options = {
			url: '/auth/',
			method: 'get'
		}*/

		dispatch({ type: types.AUTH_CLEAR });
		dispatch({ type: types.AUTH_REQUEST_END });
		toastr.success('', 'Вы успешно вышли из аккаунта');

		/*standardResponse(options)
			.then( response => {
			})
			.catch(error => {
				dispatch({ type: types.AUTH_REQUEST_END });
				toastr.error('Ошибка', error.message);							
			});*/

			// console.log('ok')
			

			// console.log('actions payload: ', payload)
	};
}
