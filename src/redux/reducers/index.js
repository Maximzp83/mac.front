import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import auth from "./authReducer";
import users from "./usersReducer";


import {reducer as toastrReducer} from "react-redux-toastr";

export default combineReducers({
	routing: routerReducer,
  toastr: toastrReducer,
  sidebar,
  layout,
  theme,
  auth,
  users
});
