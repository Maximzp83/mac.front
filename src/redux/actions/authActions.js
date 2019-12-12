import {standardResponse} from 'services/api/api';
// import { requestResolveCallback, requestRejectCallback } from '../../services/api/api_helpers';
import {findItemBy} from 'helpers';

export const types = {
	// INITIALIZE_VIEW: "INITIALIZE_VIEW",
	AUTH_REQUEST: "AUTH_REQUEST",
	AUTH_SUCCESS: "AUTH_SUCCESS",
	AUTH_FAILURE: "AUTH_FAILURE",
	AUTH_CLEAR: "AUTH_CLEAR",	
	SET_AUTH_TO_STORE: "SET_AUTH_TO_STORE",
	SET_AUTH_TO_LOCAL_STORAGE: "SET_AUTH_TO_LOCAL_STORAGE",
}

/*export function authRequest() {
	// console.log('request')
  return { type: types.AUTH_REQUEST };
}


export function authFailure(error) {
  return { 
  	type: types.AUTH_FAILURE,
  	payload: error
  };
}*/

export function initAuthStore() {
	return (dispatch) => { 
    dispatch({ type: types.AUTH_REQUEST });

		let token = localStorage.getItem('access_token');

		if (!!token && token !== 'undefined') {
			const user = JSON.parse( localStorage.getItem('authUser') )
			
    	dispatch({
    		type: types.SET_AUTH_TO_STORE,
    		payload: {
    			isAuthenticated: true,
    			user: user,
    			access_token: user.token,
    		}
    	});
		} else {
			dispatch({type: types.AUTH_CLEAR }) 
		}

		dispatch({ type: types.AUTH_SUCCESS });
	}
}

export function signIn(payload) {
  return (dispatch) => { 
    dispatch({ type: types.AUTH_REQUEST });

    return new Promise((resolve, reject) => {

	    const options = {
	    	url: '/users',
	    	// data: payload,
	    	method: 'get'
	    }

	    // console.log('actions payload: ', payload)

	    standardResponse(options)
	    	.then( response => {
	    		if (response.data && response.data.length) {
						let user = findItemBy('email', payload.email, response.data)
						
						if (user) {
							if (payload.password === user.password) {
								dispatch({
									type: types.SET_AUTH_TO_STORE,
									payload: {
										isAuthenticated: true,
										user: user,
										access_token: user.token,
									}
								});
								dispatch({
									type: types.SET_AUTH_TO_LOCAL_STORAGE,
									payload: { user: user, access_token: user.token	}
								});

								dispatch({ type: types.AUTH_SUCCESS });
								// dispatch(push('/dashboard/default'))
								resolve({user: user})							
							} else {
								dispatch({ type: types.AUTH_FAILURE });
								reject({message: 'пароль введен неправильно'})
								// console.log('')
							}
						} else {
							dispatch({ type: types.AUTH_FAILURE });
							reject({message: 'пользователь с таким email не зарегистирован'})
							// console.log('')
						}

	    		}
	      })
	    	.catch( error => {
	        dispatch({ type: types.AUTH_FAILURE, error });
	        reject(error)	        
	    	})
	  })
  };
}

export function signOut() {
  return (dispatch) => { 
    dispatch({ type: types.AUTH_REQUEST });

    return new Promise((resolve, reject) => {
			// console.log('ok')
	    /*const options = {
	    	url: '/users',
	    	// data: payload,
	    	method: 'get'
	    }*/
			setTimeout(() => {
				dispatch({type: types.AUTH_CLEAR }) 
				dispatch({ type: types.AUTH_SUCCESS });
				let response = {message: 'Вы успешно вышли из аккаунта'}
				resolve(response)
				// dispatch(push('/auth/sign-in'))
			}, 500);
	    // console.log('actions payload: ', payload)
	  })
  };
}
