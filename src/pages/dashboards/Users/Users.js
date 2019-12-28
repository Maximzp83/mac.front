import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'reactstrap';
import swal from 'sweetalert';
import { SECTIONS, userTypesList, ruleTypes } from 'constants/global';
import { getUserRules } from 'helpers';

// ------Actions-----------
import { 
	fetchUsers,
	setUsersFilters,
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
		itemsList,
		itemsFilters,
		itemsMeta,
	} = useSelector(state => state.users.usersData);
	const {	itemsLoading, itemsSaving } = useSelector(state => state.users.usersStatus);
	const rolesState = useSelector(state => state.roles.rolesData);
	const rolesList = rolesState.itemsList;
	const { authUser } = useSelector(state => state.auth.authData);

	// ---- local Constants -----
	const itemsNames = {
		itemsName: 'Пользователь',
		itemsNameMult1: 'Пользователи',
		itemsNameMult2: 'Пользователей',
	};
	const rolesFilter = {	max: -1, withDefault: true };

	// ---- local State -----
	const [rulesData, setRulesData] = useState({});
	const [isInitialMount, setInitialMount] = useState(true);
	const [itemModalOpen, setItemModalOpen] = useState(false);
	const [itemData, setItemData] = useState({});
	
	// const rolesMeta = {	maxItems: -1 }

	const itemModalToggle = () => setItemModalOpen(!itemModalOpen);

	const changeItemsFilters = ({ filterName, val }) => {
		const newFilters = { ...itemsFilters, [filterName]: val };
		dispatch(setUsersFilters(newFilters));
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
						dispatch( fetchUsers({ getParams: {...itemsFilters} }) );
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
				dispatch( fetchUsers({ getParams: {...itemsFilters} }) );
			})
	};

	// ===== Watch =======
	useEffect(() => {
		// console.log('itemsFilters: ', itemsFilters);
		if (isInitialMount) {
			// ------ Component Mount -------
			if (itemsList.length < 1) {
				const payload = { getParams: {...itemsFilters} };
				dispatch( fetchUsers(payload) );
			}

			dispatch(fetchRoles({ getParams: {...rolesFilter} }));
			setInitialMount(false);
			// -----------------------------
		} else {
			// ------ Component Update -----
			const payload = { getParams: {...itemsFilters} };
			dispatch( fetchUsers(payload) );
			// -----------------------------
		}
	}, [itemsFilters]);

	useEffect(() => {
		setRulesData( getUserRules(SECTIONS.USER) );
	}, [authUser])

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
			
			<FilterBar
				// changeItemsMeta={changeItemsMeta}
				changeItemsFilters={changeItemsFilters}
				currentFilter={itemsFilters}
				itemsMeta={itemsMeta}
				rulesData={rulesData}
				toggleItemEdit={toggleItemEdit}
				namesData={{createButtonName:'Создать пользователя'}}
			/>

			<ItemsTable
				rulesData={rulesData}
				toggleItemEdit={toggleItemEdit}
				toggleItemDelete={toggleItemDelete}
				itemsNames={itemsNames}
				itemsLoading={itemsLoading}
				userTypesList={userTypesList}
				itemsList={itemsList} />

			{ rulesData.update || rulesData.create ? (
				<ItemModal 
					isInitialMount={isInitialMount}
					isOpen={itemModalOpen}
					itemModalToggle={itemModalToggle}
					itemsNames={itemsNames}
					submitItem={saveItem}
					itemsSaving={itemsSaving}
					itemData={itemData}
					rolesList={rolesList}
					userTypesList={userTypesList}
					ruleTypes={ruleTypes}
				/>
			) : null}

			<PaginationContainer
				itemsLoading={itemsLoading}
				itemsMeta={itemsMeta}
				isInitialMount={isInitialMount}
				changeItemsFilters={changeItemsFilters}
				namesData={itemsNames}
			/>			

			{/* <div className="" /> */}
		</Container>
	);
};

export default Users;
