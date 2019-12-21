import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { namespaced } from 'redux-subspace';

import { reducer as toastrReducer } from 'react-redux-toastr';
import sidebar from './sidebarReducers';
import auth from './authReducer';
import users from './usersReducer';
import roles from './rolesReducer';

export default combineReducers({
	routing: routerReducer,
	toastr: toastrReducer,
	sidebar,
	auth,
	users,
	roles
	// users: namespaced('users')(users),
	// roles: namespaced('roles')(roles)
});
