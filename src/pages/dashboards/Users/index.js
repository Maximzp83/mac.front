import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Container, Spinner/*Row, Col*/ } from "reactstrap";

import ItemsTable from "./ItemsTable";
import { fetchUsers, setUsersFilter } from "redux/actions/usersActions";
// import Loader from "components/Loader";
import isEqual from 'lodash.isequal'


const Users = () => {
	// const [usersList, setUsers] = useState([]);
  const dispatch = useDispatch();
  const {usersLoading, usersList, usersFilter/*usersStatus*/ } = useSelector(state => state.users);
  
  // ---- local State -----
  // const [getParams, setGetParams] = useState({});

  const itemsMeta = {
  	itemsName: 'Пользователь',
  	itemsNameMult1: 'Пользователи',
  	itemsNameMult2: 'Пользователей',
  }

  const changeItemsFilter = filters => {
  	if (!isEqual(filters, usersFilter)) dispatch(setUsersFilter(filters))
  }  
	
	// ===== Component Mount/Update ======
	useEffect(() => {
		console.log('container: ', /*getParams,*/ usersFilter);
		// let ignore = false;
		// if (usersList.length < 1) {

			/*let payload = {
				getParams: usersFilter
			}*/
			// dispatch( fetchUsers(payload) ).catch((error) => {console.log(error)})
			/*.then((users) => {
				if (!ignore) dispatch( setUsers(users) );
			})*/
			
		// }

	}, [])
	
	// ===== Watch =======
	useEffect(() => {
		let payload = {
			getParams: usersFilter
		}
		
		console.log('usersFilter ')
		dispatch( fetchUsers(payload) ).catch((error) => {console.log(error)})
		
 		// setGetParams(prevState => !isEqual(prevState, usersFilter) ? usersFilter : prevState)
	}, [usersFilter])

	// ===== Component Will Unmount ======
	useEffect(() => {
	  return () => {
	    console.log('will unmount');
	  }
	}, []);

	return (
	  <Container fluid className="p-0">
	  	<p>Store isActive Filter: {usersFilter.isActive}</p>
	    <h1 className="h3 mb-3">{itemsMeta.itemsNameMult1}</h1>
			{ usersLoading ? 
				( <div className="text-center">
						<span className="align-middle"><Spinner size="sm" color="primary"/></span>
						<span className="align-middle preloader-text"> Загрузка {itemsMeta.itemsNameMult2}...</span>
					</div>
				) : 
				!usersList.length ?
				( <div className="text-center preloader-text">{itemsMeta.itemsNameMult2} не обнаружено</div>) : null
			}
				
			<ItemsTable 
				itemsLoading={usersLoading}
				itemsList={usersList}
				changeItemsFilter={changeItemsFilter}
				currentFilter={usersFilter}
			/>				
	    
	  </Container>
	);


}

export default Users;