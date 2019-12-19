import { 
	handleSetItemsResponse,
	handleError,
} from 'services/api/api_helpers';
import { api } from 'services/api';


export const types = {
	REQUEST_START: 'REQUEST_START',
	REQUEST_END: 'REQUEST_END',
	SET_ITEMS: 'SET_ITEMS',
	SET_FILTER: 'SET_FILTER',
	SET_META: 'SET_META'

	// SET_AUTH_TO_STORE: "SET_AUTH_TO_STORE",
	// SET_AUTH_TO_LOCAL_STORAGE: "SET_AUTH_TO_LOCAL_STORAGE",
};

export const fetchUsers = (payload) => {
	return dispatch => {
		dispatch({ type: types.REQUEST_START });

		const settings = { dispatch: dispatch, types: types }
		// console.log(payload)
		api.get('/users', payload)
			.then((response) => {	handleSetItemsResponse(response, settings) })
			.catch (error => { handleError(error, settings)	})
	};
}

export const setUsers = (users) => {
	return { type: types.SET_ITEMS, payload: users };
}

export const setUsersFilter = (filter) => {
	return { type: types.SET_FILTER, payload: filter };
}

export const setUsersMeta = (meta) => {
	return { type: types.SET_META, payload: meta };
}
