import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { subspace, namespaced } from 'redux-subspace';
import { Container, Button } from 'reactstrap';

import { SECTIONS, ruleTypes } from 'constants/global';
import { getUserRules } from 'helpers';

import {
	fetchRoles,
	saveRole,
	deleteRole,
	setRolesFilter
} from 'redux/actions/rolesActions';

// -----Components-----
import { ItemsTable } from './ItemsTable';
import { ItemModal } from './ItemModal';
import { FilterBar } from 'components/FilterBar';
import { PaginationContainer } from 'components/PaginationContainer';

import swal from 'sweetalert';
// import Loader from "components/Loader";
// import isEqual from 'lodash.isequal'

// ======================
const Roles = () => {
	const dispatch = useDispatch();
	const {
		rolesLoading,
		rolesList,
		rolesSaving,
		rolesFilter,
		rolesMeta
	} = useSelector(state => state.roles);

	// ---- local State -----
	const [rulesData, setRulesData] = useState({});
	const { authUser } = useSelector(state => state.auth);
	const [isInitialMount, setInitialMount] = useState(true);
	const [itemModalOpen, setItemModalOpen] = useState(false);

	const [itemData, setItemData] = useState({});

	// --- Constants -----
	const itemsNames = {
		itemsName: 'Право',
		itemsNameMult1: 'Группы пользователей',
		itemsNameMult2: 'Групп пользователей'
	};

	const itemModalToggle = () => setItemModalOpen(!itemModalOpen);

	// ----- Methods ---------
	const changeItemsFilter = ({ filterName, val }) => {
		// console.log(filterName)
		const newFilters = { ...rolesFilter, [filterName]: val };
		dispatch(setRolesFilter(newFilters));
	};

	const toggleItemEdit = role => {
		setItemData(role)
		setItemModalOpen(true);
	};

	const toggleItemDelete = role => {			
		swal({
		  title: "Вы уверены?",
		  text: `Удалить безвозвратно ${role.name}?`,
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then(answer => {
			if (answer) { 
				dispatch( deleteRole(role.id) )
				.then(() => {
					dispatch( fetchRoles({ getParams: {...rolesFilter} }) );
				})
			};
		});		
	};

	/*const changeItemsMeta = ({ filterName, val }) => {
		const newMeta = { ...rolesMeta, [filterName]: val };
		dispatch(setRolesMeta(newMeta));
	};*/

	const saveItem = data => {
		// console.log('ok:', userData )
		dispatch(saveRole({ data: data }))
			.then(() => {
				setItemModalOpen(false);
				dispatch( fetchRoles({ getParams: {...rolesFilter} }) );
			})
	};

	// ===== Watch =======
	useEffect(() => {
		// console.log('Roles: ');
		if (isInitialMount) {
			// ------ Component Mount -------
			if (rolesList.length < 1) {
				const payload = { getParams: { ...rolesFilter } };
				dispatch(fetchRoles(payload));
			}
			setInitialMount(false);
			// -----------------------------
		} else {
			// ------ Component Update -----
			const payload = { getParams: { ...rolesFilter } };
			dispatch(fetchRoles(payload));
			// -----------------------------
		}
	}, [rolesFilter]);

	useEffect(() => {
		let rules = getUserRules(SECTIONS.ROLE);
		// rules.update = true;
		setRulesData( rules );
		// console.log('authUser: ', rules);
	}, [authUser])

	// ===== Component Will Unmount ======
	useEffect(() => {
		return () => {
			// console.log('will unmount');
		};
	}, []);

	return (
		<Container fluid className="p-0">
			<h1 className="h3 mb-3">Настройка прав доступа и управление ролями</h1>
			
			{ rulesData.create && (
				<Button color="tertiary" size="lg" onClick={() => toggleItemEdit()}>
					<span>Создать группу пользователей</span>
				</Button>
			)}

			<FilterBar
				// changeItemsMeta={changeItemsMeta}
				changeItemsFilter={changeItemsFilter}
				currentFilter={rolesFilter}
				itemsMeta={rolesMeta}
			/>
			
			<ItemsTable 
				rulesData={rulesData}
				toggleItemEdit={toggleItemEdit}
				toggleItemDelete={toggleItemDelete}
				itemsNames={itemsNames}
				itemsLoading={rolesLoading}
				itemsList={rolesList}
				ruleTypes={ruleTypes}
			/>
			
			{ rulesData.update || rulesData.create ? (
				<ItemModal 
					isInitialMount={isInitialMount}
					isOpen={itemModalOpen}
					itemModalToggle={itemModalToggle}
					itemsNames={itemsNames}
					submitItem={saveItem}
					ruleTypes={ruleTypes}
					itemsSaving={rolesSaving}
					itemData={itemData}
				/>
			): null}

			<PaginationContainer
				itemsLoading={rolesLoading}
				itemsMeta={rolesMeta}
				isInitialMount={isInitialMount}
				changeItemsFilter={changeItemsFilter}
			/>

			{/*<ConfirmModal
				isOpen={confirmModalOpen}
				onClose={handleConfirmModalClose}
			/>*/}

			{/* <div className="" /> */}
		</Container>
	);
};

export default Roles;
