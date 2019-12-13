import {standardResponse} from 'services/api/api';
// import { requestResolveCallback, requestRejectCallback } from '../../services/api/api_helpers';
// import {findItemBy} from 'helpers';

export const types = {
	ITEMS_STATUS: "ITEMS_STATUS",
	SET_ITEMS: "SET_ITEMS",
	SET_FILTER: "SET_FILTER",
	SET_META: "SET_META"

	// SET_AUTH_TO_STORE: "SET_AUTH_TO_STORE",
	// SET_AUTH_TO_LOCAL_STORAGE: "SET_AUTH_TO_LOCAL_STORAGE",
}

export function fetchUsers(payload) {
  return (dispatch) => { 
    dispatch({ type: types.ITEMS_STATUS, payload: {status:'loading', isLoading:true} });

    return new Promise((resolve, reject) => {

	    const options = {
	    	url: '/users',
	    	method: 'get'
	    }

	    if (!!payload) {
	    	if (!!payload.getParams) options.getParams = payload.getParams
	    }

	    standardResponse(options)
	    	.then( response => {
	    		if (response.data) {
	    			// console.log(response.data)
						dispatch({
							type: types.SET_ITEMS,
							payload: response.data
						});

						dispatch({ type: types.ITEMS_STATUS, payload: {status:'ready', isLoading:false} });
						resolve(response.data)
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

export function setUsers(users) {
  return { type: types.SET_ITEMS, payload: users }
}

export function setUsersFilter(filter) {
  return { type: types.SET_FILTER, payload: filter }
}

export function setUsersMeta(meta) {
  return { type: types.SET_META, payload: meta }
}