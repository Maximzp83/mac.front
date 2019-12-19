import {
  combineHeaders, 
  checkAuthorizationHeaders,
  parsePayload,
  combineUrl,
} from './api_helpers';

import axios from './axiosService';
// import store from 'redux/store';
// import isEmpty from 'lodash.isempty';

const connector = ({ url, method, headers, params, ...rest }) => {
  checkAuthorizationHeaders()
  return axios({
    url: combineUrl(url, params),
    method: method,
    headers: combineHeaders(headers),
    ...rest,
  })
}

const api = {
  get: (url, payload, ...rest) => {
    const {params, headers} = parsePayload(payload);
  
  // console.log(params)
    return connector({
      method: 'GET',
      url,
      params,
      headers,
      ...rest,
    });
  },
  // post: ({ url, params, data, ...rest }) => connector({
  post: (url, payload, ...rest) => {
    const {headers, data} = parsePayload(payload);

    return connector({
      method: 'POST',
      url,
      params: null,
      headers,
      data,
      ...rest,
      // body: getBodyByType(body, bodyType),
    })
  },
  // put: ({ url, params, body, bodyType, ...rest }) => connector({
  put: ({ url, params, data, ...rest }) => connector({  
    method: 'PUT',
    url,
    params,
    ...rest,
    // body: getBodyByType(body),
  }),
  delete: ({ url, ...rest }) => connector({
    method: 'DELETE',
    url,
    ...rest,
  }),
};

export { api };