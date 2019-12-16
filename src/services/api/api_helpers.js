// import Vue from 'vue';
// import store from '@src/vuex'
// import router from '@src/router/'

// import { Notification } from 'element-ui';

export const toUrl = obj => {
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

export { toUrl as default };

/* export const requestResolveCallback = (
		response,
		{ resolve, reject, mutations, dispatches }
) => {
	try {
		if (
			response.status &&
			(response.status === 200 || response.status === 201)
		) {	
			if (dispatches) {
					// console.log(dispatches)
				for (let prop in dispatches) {
					dispatch(prop, dispatches[prop])
				}
			}

			if (mutations) {
				mutations.list ? commit(mutations.list, response.data.data) : null
				mutations.meta ? commit(mutations.meta, response.data) : null
			}
			resolve(response)
		} else {
			if (mutations) {
				mutations.list ? commit(mutations.list, null) : null
				mutations.meta ? commit(mutations.meta, null) : null
			}
			reject(response)
		}
		// mutations.status ? commit(mutations.status, 'ready') : null
	} catch(e) {console.log(e)}
} */

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
