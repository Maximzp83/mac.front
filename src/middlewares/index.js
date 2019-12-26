// -------Middleware Exaple------
// saveAuthData = store => next => action => {
const routesEntryMiddleware = () => next => action => {
	// console.log(action)
	// if (action.type === 'SET_AUTH_TO_STORE') {
		/* if (action.payload) {
		} */
	// }
	return next(action);
};

export {routesEntryMiddleware};
