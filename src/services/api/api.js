import axios from 'axios';
import { toUrl } from './api_helpers';

// import VueAxios from 'vue-axios';


export const standardResponse = (options) => {
		var getParams;
		try {
			if (!!options.getParams) {
				if (!!options.getParams.itemId) {
					options.url = options.url + '/' + options.getParams.itemId;
				} else {
	    		getParams = toUrl(options.getParams);
	      	options.url = options.url + '?' + getParams;					
				}
			}
			// console.log(options)
			/*return new Promise((resolve, reject) => {
			  setTimeout(() => {
			    var response = {
			    	status: 200,
			    	data: {name: options.data.email, isActive: true }
			    }
			    // console.log(response.data)
			    if (response && response.status === 200) {
			    	resolve(response);
			    } else {
			    	reject(response)
			    }
			  }, 1000)
			});*/
			
			return axios({
				url: options.url,
				method: options.method,
				data: options.data || null,
		  })
		} catch(error) {console.log(error)}
	}

/*	export const standardResponseWithFile = (options) => {
		var headers, formData = null;
		try {
			if (!!options.file) {
				formData = new FormData();

				for (var prop in options.data) {
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
		var headers, formData = null;
		// console.log(options)
		try {
			if (!!options.file) {
				formData = new FormData();

				for (var prop in options.data) {
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
					var pc = parseInt(Math.round( ( e.loaded * 100 ) / e.total ));
					progressCallback(pc)
				},
		  })
		} catch(error) {console.log(error)}
	}*/


