import { combineHeaders, checkAuthorizationHeaders, parsePayload, combineUrl } from './api_helpers';

import axios from './axiosService';

const api = (method, url, payload ) => {
	const { headers, data, params } = parsePayload(payload);
	checkAuthorizationHeaders();
	
	return axios({
		method,
		url: combineUrl(url, params),
		headers: combineHeaders(headers),
		data: data
	});
};

export { api };
