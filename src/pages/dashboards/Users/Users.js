import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Button } from 'reactstrap';
import swal from 'sweetalert'

// ------Actions-----------
import { 
	fetchUsers,
	setUsersFilter,
	// setUsersMeta,
	setUsers,
	saveUser,
	deleteUser
} from 'redux/actions/usersActions';
import { fetchRoles } from 'redux/actions/rolesActions';

// -----Components-----
import { ItemsTable } from './ItemsTable';
import { ItemModal } from './ItemModal';
import { FilterBar } from 'components/FilterBar';
import { PaginationContainer } from 'components/PaginationContainer';

// import Loader from "components/Loader";
// import isEqual from 'lodash.isequal'

// =========================
const Users = () => {
	const dispatch = useDispatch();
	const {
		usersLoading,
		usersList,
		usersFilter,
		usersMeta,
		usersSaving,
	} = useSelector(state => state.users);
	const { rolesList } = useSelector(state => state.roles);
	// console.log(usersSaving)

	// ---- local State -----
	const [isInitialMount, setInitialMount] = useState(true);
	const [itemModalOpen, setItemModalOpen] = useState(false);
	const [itemData, setItemData] = useState({});

	const itemsNames = {
		itemsName: 'Пользователь',
		itemsNameMult1: 'Пользователи',
		itemsNameMult2: 'Пользователей'
	};
	const rolesFilter = {
		max: -1
	}
	// const rolesMeta = {	maxItems: -1 }

	const itemModalToggle = () => setItemModalOpen(!itemModalOpen);

	const changeItemsFilter = ({ filterName, val }) => {
		// console.log(filterName)
		const newFilters = { ...usersFilter, [filterName]: val };
		dispatch(setUsersFilter(newFilters));
	};

	/*const changeItemsMeta = ({ filterName, val }) => {
		const newMeta = { ...usersMeta, [filterName]: val };
		dispatch(setUsersMeta(newMeta));
	};*/

	// ----- Methods ---------
	const toggleItemEdit = user => {
		// console.log(user)
		setItemData(user)
		setItemModalOpen(true);
	};

	const toggleItemDelete = user => {
		swal({
		  title: "Вы уверены?",
		  text: `Удалить безвозвратно ${user.fullName}?`,
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then(answer => {
			if (answer) { 
				dispatch( deleteUser(user.id) )
					.then(() => {
						dispatch( fetchUsers({ getParams: {...usersFilter} }) );
					})
			};
		});	
	};

	/*const changeItemsMeta = ({ filterName, val }) => {
		const newMeta = { ...rolesMeta, [filterName]: val };
		dispatch(setRolesMeta(newMeta));
	};*/

	const saveItem = itemData => {
		// console.log('ok:', userData )
		dispatch(saveUser({ data: itemData }))
			.then(() => {
				setItemModalOpen(false);
				dispatch( fetchUsers({ getParams: {...usersFilter} }) );
			})
	};

	// ===== Watch =======
	useEffect(() => {
		// console.log('usersFilter: ', isInitialMount);

		if (isInitialMount) {
			// ------ Component Mount -------
			if (usersList.length < 1) {
				const payload = { getParams: {...usersFilter} };
				dispatch( fetchUsers(payload) );
			}

			dispatch(fetchRoles({ getParams: {...rolesFilter} }));
			setInitialMount(false);
			// -----------------------------
		} else {
			// ------ Component Update -----
			const payload = { getParams: {...usersFilter} };
			dispatch( fetchUsers(payload) );
			// -----------------------------
		}
	}, [usersFilter]);

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
			
			<Button color="tertiary" size="lg" onClick={() => toggleItemEdit()}>
				<span>Создать пользователя</span>
			</Button>
			
			<FilterBar
				// changeItemsMeta={changeItemsMeta}
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
				rolesList={rolesList}
			/>

			<PaginationContainer
				itemsLoading={usersLoading}
				itemsMeta={usersMeta}
				isInitialMount={isInitialMount}
				changeItemsFilter={changeItemsFilter}
			/>

			{/* <div className="" /> */}
		</Container>
	);
};

export default Users;
