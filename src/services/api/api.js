import { toUrl } from './api_helpers';
import axios from './axiosService';
import store from 'redux/store'

const setHttpToken = token => {
	if (!!token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		axios.defaults.headers.common.Authorization = null;		
	}
};

export const standardResponse = optionsData => {
	const token = store.getState().auth.access_token;
	setHttpToken(token)
	
	const options = optionsData;
	let getParams;

	try {
		if (options.getParams) {
			if (options.getParams.itemId) {
				options.url = `${options.url}/${options.getParams.itemId}`;
			} else {
				getParams = toUrl(options.getParams);
				options.url = getParams ? `${options.url}?${getParams}` : options.url;
			}
		}
		// console.log(options.url)
	} catch (error) {
		console.error(error);
	}

	return axios({
		url: options.url,
		method: options.method,
		data: options.data || null
	});
};

// export { standardResponse }

/* export const standardResponseWithFile = (options) => {
	let headers, formData = null;
	try {
		if (!!options.file) {
			formData = new FormData();

			for (let prop in options.data) {
				// console.log(options.data[prop])
				if ( typeof options.data[prop] === 'object' ) {
			  	formData.append(prop, options.data[prop])
				} else {
					formData.set(prop, options.data[prop])							
				}
			};
			
			if (options.method === 'put') formData.set('_method', 'PUT');

			headers = {'Content-Type': 'multipart/form-data'};
		};

		return axios({
			url: options.url,
			headers: headers || null,
			method: formData && formData.has('_method') ? 'post' : options.method,
			data: formData || options.data || null,
	  })
	} catch(error) {console.log(error)}
}

export const uploadResponse = (options, progressCallback) => {
	let headers, formData = null;
	// console.log(options)
	try {
		if (!!options.file) {
			formData = new FormData();

			for (let prop in options.data) {
				// console.log(options.data[prop])
				if ( typeof options.data[prop] === 'object' ) {
			  	formData.append(prop, options.data[prop])
				} else {
					formData.set(prop, options.data[prop])							
				}
			}
			
			if (options.method ==='put') formData.set('_method', 'PUT');

			headers = {'Content-Type': 'multipart/form-data'}
			// console.log( formData)
		};
		
		// console.log(formData)
		return axios({
			// baseURL: baseURL,
			url: options.url,
			headers: headers || null,

			method: formData && formData.has('_method') ? 'post' : options.method,
			data: formData || options.data || null,
			onUploadProgress: function (e) {
				let pc = parseInt(Math.round( ( e.loaded * 100 ) / e.total ));
				progressCallback(pc)
			},
	  })
	} catch(error) {console.log(error)}
} */
