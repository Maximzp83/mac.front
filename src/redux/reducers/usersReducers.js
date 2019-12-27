import { combineReducers } from 'redux';
import itemsDataReducerFor from './common/itemsDataReducerFor';
import statusReducerFor from './common/statusReducerFor';

const usersReducers = combineReducers({
  // usersData: usersDataReducer,
  usersData: itemsDataReducerFor('USERS_'),
  usersStatus: statusReducerFor('USERS_'),
});

export default usersReducers;
