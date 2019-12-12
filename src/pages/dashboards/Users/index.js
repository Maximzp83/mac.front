import React, { /*useState,*/ useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Container, /*Row, Col*/ } from "reactstrap";

// import ItemsTable from "./ItemsTable";
import { fetchUsers } from "redux/actions/usersActions";


const Users = () => {
	// const [usersList, setUsers] = useState([]);
  const dispatch = useDispatch();
  const {usersLoading, usersList} = useSelector(state => state.users);

	useEffect(() => {
		console.log('mounted or updated');
		if (usersList.length < 1) dispatch(fetchUsers()).catch((error) => {console.log(error)})
	}, [])

	useEffect(() => {
	  return () => {
	    console.log('will unmount');
	  }
	}, []);

	return (
	  <Container fluid className="p-0">
	    <h1 className="h3 mb-3">Пользователи</h1>
			<p>usersLoading: {usersLoading ? 'true' : 'false'}</p>

			{	usersList.length && (
					<ul>
						{ usersList.map( (user, userIndex) => (
								<li key={'user'+userIndex}><span>{userIndex}. </span> {user.name}</li>) 
							)
						}
					</ul>
				)
				
			}
			
	    {/*<ItemsTable />*/}
	  </Container>
	);


}

export default Users;