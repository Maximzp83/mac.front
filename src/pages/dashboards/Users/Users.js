import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Button } from 'reactstrap';

import { fetchUsers, setUsersFilter, setUsersMeta, setUsers, saveUser, deleteUser } from 'redux/actions/usersActions';
import { ItemsTable } from './ItemsTable';
import { ItemModal } from './ItemModal';

import { FilterBar } from './FilterBar';

// import Loader from "components/Loader";
// import isEqual from 'lodash.isequal'

const Users = () => {
	const dispatch = useDispatch();
	const { usersLoading, usersList, usersFilter, usersMeta, usersSaving  } = useSelector(state => state.users);

	// ---- local State -----
	const [isInitialMount, setInitialMount] = useState(true);
	const [itemModalOpen, setItemModalOpen] = useState(false);
	const [itemData, setItemData] = useState({});


	const itemsNames = {
		itemsName: 'Пользователь',
		itemsNameMult1: 'Пользователи',
		itemsNameMult2: 'Пользователей'
	};

	const itemModalToggle = () => setItemModalOpen(!itemModalOpen);

	const changeItemsFilter = ({ filterName, val }) => {
		// console.log(filterName)
		const newFilters = { ...usersFilter, [filterName]: val };
		dispatch(setUsersFilter(newFilters));
	};

	const changeItemsMeta = ({ filterName, val }) => {
		const newMeta = { ...usersMeta, [filterName]: val };
		dispatch(setUsersMeta(newMeta));
	};

	// ----- Methods ---------
	const toggleItemEdit = (user) => {
		setItemData(user)
		setItemModalOpen(true);
	};
	const toggleItemDelete = (id) => {
		// setConfirmModalOpen(true);
		// confirmModalToggle()
			// .then(() => {console.log('ok')})
			// .catch(() => {console.log('cancel')})
		
		dispatch( deleteUser(id) )
	};

	/*const changeItemsMeta = ({ filterName, val }) => {
		const newMeta = { ...rolesMeta, [filterName]: val };
		dispatch(setRolesMeta(newMeta));
	};*/

	const saveItem = (data) => {
		// console.log('ok:', userData )
		dispatch(saveUser({ data: data }))
			.then(() => setItemModalOpen(false))
	};

	// ===== Watch =======
	useEffect(() => {
		console.log('usersFilter: ', isInitialMount);

		if (isInitialMount) {
			// ------ Component Mount -------
			if (usersList.length < 1) {
				const payload = { getParams: { ...usersFilter, ...usersMeta } };
				dispatch(fetchUsers(payload));
			}
			setInitialMount(false);
			// -----------------------------
		} else {
			// ------ Component Update -----
			const payload = { getParams: { ...usersFilter, ...usersMeta } };
			dispatch(fetchUsers(payload));
			// -----------------------------
		}
	}, [usersFilter, usersMeta]);

	// ===== Component Will Unmount ======
	useEffect(() => {
		return () => {
			dispatch(setUsers([]));
			// console.log('will unmount');
		};
	}, []);

	return (
		<Container fluid className="p-0">
			<h1 className="h3 mb-3">{itemsNames.itemsNameMult1}</h1>
			
			<Button color="tertiary" size="lg" onClick={()=>setItemModalOpen(true)}>
				<span>Создать группу пользователей</span>
			</Button>
			
			<FilterBar
				changeItemsMeta={changeItemsMeta}
				changeItemsFilter={changeItemsFilter}
				currentFilter={usersFilter}
				itemsMeta={usersMeta}
			/>

			<ItemsTable
				toggleItemEdit={toggleItemEdit}
				toggleItemDelete={toggleItemDelete}
				itemsNames={itemsNames}
				itemsLoading={usersLoading}
				itemsList={usersList} />

			<ItemModal 
				isInitialMount={isInitialMount}
				isOpen={itemModalOpen}
				itemModalToggle={itemModalToggle}
				itemsNames={itemsNames}
				submitItem={saveItem}
				itemsSaving={usersSaving}
				itemData={itemData}
			/>

			{/* <div className="" /> */}
		</Container>
	);
};

export default Users;
