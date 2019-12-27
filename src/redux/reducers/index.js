import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as toastrReducer } from 'react-redux-toastr';
import sidebar from './sidebarReducers';
import auth from './authReducer';
import usersReducers from './usersReducers';
import rolesReducers from './rolesReducers';


export default combineReducers({
	routing: routerReducer,
	toastr: toastrReducer,
	sidebar,
	auth,
	users: usersReducers,
	roles: rolesReducers
	// itemsStatus
});
