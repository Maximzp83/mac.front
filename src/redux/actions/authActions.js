import { standardResponse } from 'services/api/api';
// import { requestResolveCallback, requestRejectCallback } from '../../services/api/api_helpers';
import { findItemBy } from 'helpers';

export const types = {
	// INITIALIZE_VIEW: "INITIALIZE_VIEW",
	AUTH_REQUEST: 'AUTH_REQUEST',
	AUTH_SUCCESS: 'AUTH_SUCCESS',
	AUTH_FAILURE: 'AUTH_FAILURE',
	AUTH_CLEAR: 'AUTH_CLEAR',
	SET_AUTH_TO_STORE: 'SET_AUTH_TO_STORE',
	SET_AUTH_TO_LOCAL_STORAGE: 'SET_AUTH_TO_LOCAL_STORAGE'
};

export function signIn(payload) {
	return dispatch => {
		dispatch({ type: types.AUTH_REQUEST });

		return new Promise((resolve, reject) => {
			const options = {
				url: '/users',
				// data: payload,
				method: 'get'
			};

			// console.log('actions payload: ', payload)

			standardResponse(options)
				.then(response => {
					if (response.data && response.data.length) {
						const user = findItemBy('email', payload.email, response.data);

						if (user) {
							if (payload.password === user.password) {
								dispatch({
									type: types.SET_AUTH_TO_STORE,
									payload: {
										isAuthenticated: true,
										user,
										access_token: user.token
									}
								});
								dispatch({
									type: types.SET_AUTH_TO_LOCAL_STORAGE,
									payload: { user, access_token: user.token }
								});

								dispatch({ type: types.AUTH_SUCCESS });
								// dispatch(push('/dashboard/default'))
								resolve({ user });
							} else {
								dispatch({ type: types.AUTH_FAILURE });
								reject(new Error('пароль введен неправильно'));
								// console.log('')
							}
						} else {
							dispatch({ type: types.AUTH_FAILURE });
							reject(new Error('пользователь с таким email не зарегистирован'));
							// console.log('')
						}
					}
				})
				.catch(error => {
					dispatch({ type: types.AUTH_FAILURE, error });
					reject(new Error(error));
				});
		});
	};
}

export function signOut() {
	return dispatch => {
		dispatch({ type: types.AUTH_REQUEST });

		return new Promise(resolve => {
			// console.log('ok')
			/* const options = {
	    	url: '/users',
	    	// data: payload,
	    	method: 'get'
	    } */
			setTimeout(() => {
				dispatch({ type: types.AUTH_CLEAR });
				dispatch({ type: types.AUTH_SUCCESS });
				const response = { message: 'Вы успешно вышли из аккаунта' };
				resolve(response);
				// dispatch(push('/auth/sign-in'))
			}, 500);
			// console.log('actions payload: ', payload)
		});
	};
}
