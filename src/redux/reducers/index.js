import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { namespaced } from 'redux-subspace';

import { reducer as toastrReducer } from 'react-redux-toastr';
import sidebar from './sidebarReducers';
import auth from './authReducer';
import usersDataReducer from './usersDataReducer';
import roles from './rolesReducer';

import statusReducerFor from './statusReducerFor';

const usersReducer = combineReducers({
  usersData: usersDataReducer,
  usersStatus: statusReducerFor('USERS_'),
});

export default combineReducers({
	routing: routerReducer,
	toastr: toastrReducer,
	sidebar,
	auth,
	users: usersReducer,
	roles,
	// itemsStatus
});
