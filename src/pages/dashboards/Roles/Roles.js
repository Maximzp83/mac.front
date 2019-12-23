import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { subspace, namespaced } from 'redux-subspace';

import { Container, Button } from 'reactstrap';

import { fetchRoles, saveRole, deleteRole } from 'redux/actions/rolesActions';
import { ItemsTable } from './ItemsTable';
import { ItemModal } from './ItemModal';
import swal from 'sweetalert'
// import Loader from "components/Loader";
// import isEqual from 'lodash.isequal'

const Roles = () => {
	const dispatch = useDispatch();
	const { rolesLoading, rolesList, ruleTypes, rolesSaving, rolesFilter, rolesMeta } = useSelector(state => state.roles);

	// ---- local State -----
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
	const toggleItemEdit = (role) => {
		setItemData(role)
		setItemModalOpen(true);
	};

	const toggleItemDelete = (role) => {			
		swal({
		  title: "Вы уверены?",
		  text: `Удалить безвозвратно ${role.name}?`,
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then(answer => {
			if (answer) { dispatch( deleteRole(role.id) ) };
		});		
	};

	/*const changeItemsMeta = ({ filterName, val }) => {
		const newMeta = { ...rolesMeta, [filterName]: val };
		dispatch(setRolesMeta(newMeta));
	};*/

	const saveItem = (data) => {
		// console.log('ok:', userData )
		dispatch(saveRole({ data: data }))
			.then(() => setItemModalOpen(false))
	};

	// ===== Watch =======
	useEffect(() => {
		// console.log('rolesFilter: ');
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

	// ===== Component Will Unmount ======
	useEffect(() => {
		return () => {
			// console.log('will unmount');
		};
	}, []);

	return (
		<Container fluid className="p-0">
			<h1 className="h3 mb-3">Настройка прав доступа и управление ролями</h1>
			
			<Button color="tertiary" size="lg" onClick={()=>setItemModalOpen(true)}>
				<span>Создать группу пользователей</span>
			</Button>

			<ItemsTable 
				toggleItemEdit={toggleItemEdit}
				toggleItemDelete={toggleItemDelete}
				itemsNames={itemsNames}
				itemsLoading={rolesLoading}
				itemsList={rolesList}
				ruleTypes={ruleTypes}
			/>

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

			

			{/*<ConfirmModal
				isOpen={confirmModalOpen}
				onClose={handleConfirmModalClose}
			/>*/}

			{/* <div className="" /> */}
		</Container>
	);
};

export default Roles;
