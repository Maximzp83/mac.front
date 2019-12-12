// import { useSelector } from 'react-redux'
// import { connect } from "react-redux";
// import store from "redux/store";
let authToken = null;
let isAuthenticated = false;
let authUser = null;

export const saveAuthData = store => next => action => {
  if(action.type === 'SET_AUTH_TO_STORE') {
    // console.log(action.payload)
    if (action.payload) {
    	authToken = action.payload.authToken;
    	isAuthenticated = action.payload.isAuthenticated;
    	authUser = action.payload.authUser;
    }
  }

  if(action.type === 'AUTH_CLEAR') {
  	authToken = null;
  	isAuthenticated = false;
  	authUser = null;
  }

  return next(action);
}

export const getAuthToken = () => authToken
export const getIsAuthenticated = () => isAuthenticated
export const getAuthUser = () => authUser
