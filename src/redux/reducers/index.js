import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';

import sidebar from "./sidebarReducers";
import auth from "./authReducer";
import users from "./usersReducer";


import {reducer as toastrReducer} from "react-redux-toastr";

export default combineReducers({
	routing: routerReducer,
  toastr: toastrReducer,
  sidebar,
  auth,
  users
});
