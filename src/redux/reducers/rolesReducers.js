import { combineReducers } from 'redux';
import itemsDataReducerFor from './common/itemsDataReducerFor';
import statusReducerFor from './common/statusReducerFor';

const rolesReducers = combineReducers({
  rolesData: itemsDataReducerFor('ROLES_'),
  rolesStatus: statusReducerFor('ROLES_'),
});

export default rolesReducers;
