import axios from 'axios';

/* function getMeta(metaName) {
	try {
	  const metas = document.getElementsByTagName('meta');

	  for (let i = 0; i < metas.length; i++) {
	    if (metas[i].getAttribute('name') === metaName) {
	      return metas[i].getAttribute('content');
	    }
	  }
	  return '';
	} catch (e) {}
} */

/*let headersOptions = {
	'X-Requested-With': 'XMLHttpRequest',
	'Accept': 'application/json',
	'Content-Type': 'application/json;charset=UTF-8'
};*/

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://mac.loc:8089/api';

/*const axios = () => {
	axios.create({
		// baseURL: 'http://5dee1252b3d17b00146a2178.mockapi.io/api',
		baseURL: 'http://mac.loc:8089/api',
		headers: headersOptions
	})
}*/

export default axios
	

// console.log(document.hea)
// const baseURL = process.env.NODE_ENV === 'development' ? 'http://ticket.back/api' : '';
// const baseURL = getMeta('base-url') + '/api'

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

// let token = document.head.querySelector('meta[name="csrf-token"]');

/* if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
} */
