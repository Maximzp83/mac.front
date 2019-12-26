import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Button } from 'reactstrap';
import swal from 'sweetalert';
import { SECTIONS, userTypesList } from 'constants/global';
import { getUserRules } from 'helpers';

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
		// usersLoading,
		usersList,
		usersFilter,
		usersMeta,
		usersSaving
	} = useSelector(state => state.users.usersData);
	// console.log(usersSaving)

	const {	itemsLoading, itemsSaving } = useSelector(state => state.users.usersStatus);

	const { rolesList } = useSelector(state => state.roles);
	const { authUser } = useSelector(state => state.auth);

	// ---- local Constants -----
	const itemsNames = {
		itemsName: 'Пользователь',
		itemsNameMult1: 'Пользователи',
		itemsNameMult2: 'Пользователей'
	};
	const rolesFilter = {	max: -1 };

	// ---- local State -----
	const [rulesData, setRulesData] = useState({});
	const [isInitialMount, setInitialMount] = useState(true);
	const [itemModalOpen, setItemModalOpen] = useState(false);
	const [itemData, setItemData] = useState({});
	
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
		  text: `Удалить ${user.login}?`,
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
		// console.log('ok:', itemData )
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
			setRulesData( getUserRules(SECTIONS.USER) );

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

	useEffect(() => {
		setRulesData( getUserRules(SECTIONS.USER) );
	}, [authUser])

	useEffect(() => {
		console.log(itemsLoading)
		// setRulesData( getUserRules(SECTIONS.USER) );
	}, [itemsLoading])

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
			
			{ rulesData.create && (
				<Button color="tertiary" size="lg" onClick={() => toggleItemEdit()}>
					<span>Создать пользователя</span>
				</Button>
			)}

			<FilterBar
				// changeItemsMeta={changeItemsMeta}
				changeItemsFilter={changeItemsFilter}
				currentFilter={usersFilter}
				itemsMeta={usersMeta}
			/>

			<ItemsTable
				rulesData={rulesData}
				toggleItemEdit={toggleItemEdit}
				toggleItemDelete={toggleItemDelete}
				itemsNames={itemsNames}
				itemsLoading={itemsLoading}
				userTypesList={userTypesList}
				itemsList={usersList} />

			{ rulesData.update || rulesData.create ? (
				<ItemModal 
					isInitialMount={isInitialMount}
					isOpen={itemModalOpen}
					itemModalToggle={itemModalToggle}
					itemsNames={itemsNames}
					submitItem={saveItem}
					itemsSaving={usersSaving}
					itemData={itemData}
					rolesList={rolesList}
					userTypesList={userTypesList}
				/>
			) : null}

			<PaginationContainer
				itemsLoading={itemsLoading}
				itemsMeta={usersMeta}
				isInitialMount={isInitialMount}
				changeItemsFilter={changeItemsFilter}
			/>			

			{/* <div className="" /> */}
		</Container>
	);
};

export default Users;
