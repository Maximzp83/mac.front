import {standardResponse} from 'services/api/api';
// import { requestResolveCallback, requestRejectCallback } from '../../services/api/api_helpers';
// import {findItemBy} from 'helpers';

export const types = {
	// INITIALIZE_VIEW: "INITIALIZE_VIEW",
	ITEMS_STATUS: "ITEMS_STATUS",
	SET_ITEMS: "SET_ITEMS",
	// SET_AUTH_TO_STORE: "SET_AUTH_TO_STORE",
	// SET_AUTH_TO_LOCAL_STORAGE: "SET_AUTH_TO_LOCAL_STORAGE",
}

export function fetchUsers() {
  return (dispatch) => { 
    dispatch({ type: types.ITEMS_STATUS, payload: {status:'loading', isLoading:true} });

    return new Promise((resolve, reject) => {

	    const options = {
	    	url: '/users',
	    	method: 'get'
	    }

	    standardResponse(options)
	    	.then( response => {
	    		if (response.data) {
	    			// console.log(response.data)
						dispatch({
							type: types.SET_ITEMS,
							payload: { users: response.data }
						});

						dispatch({ type: types.ITEMS_STATUS, payload: {status:'ready', isLoading:false} });
						resolve()
					} else {
						dispatch({ type: types.ITEMS_STATUS, payload: {status:'error', isLoading:false} });
						reject({message: 'ошибка, ответ не содержит данных'})
					}
	      })
	    	.catch( error => {
					dispatch({ type: types.ITEMS_STATUS, payload: {status:'error', isLoading:false} });
	        reject(error)	        
	    	})
	  })
  };
}
