import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'reactstrap';

import {
	fetchUsers,
	setUsersFilter,
	setUsersMeta
} from 'redux/actions/usersActions';
import { ItemsTable } from './ItemsTable';
import { FilterBar } from './FilterBar';

// import Loader from "components/Loader";
// import isEqual from 'lodash.isequal'

const Users = () => {
	const dispatch = useDispatch();
	const {
		usersLoading,
		usersList,
		usersFilter,
		usersMeta /* usersStatus */
	} = useSelector(state => state.users);

	// ---- local State -----
	const [isInitialMount, setInitialMount] = useState(true);

	const itemsNames = {
		itemsName: 'Пользователь',
		itemsNameMult1: 'Пользователи',
		itemsNameMult2: 'Пользователей'
	};

	const changeItemsFilter = ({filterName, val}) => {
		// console.log(filterName)
		const newFilters = { ...usersFilter, [filterName]: val };
		dispatch(setUsersFilter(newFilters));
	};

	const changeItemsMeta = ({filterName, val}) => {
		const newMeta = { ...usersMeta, [filterName]: val };
		dispatch(setUsersMeta(newMeta));
	};

	// ===== Watch =======
	useEffect(() => {
		// console.log('usersFilter: ', isInitialMount);

		if (isInitialMount) {
			// ------ Component Mount -------
			if (usersList.length < 1) {
				const payload = { getParams: { ...usersFilter, ...usersMeta } };				
				dispatch(fetchUsers(payload))
			}
			setInitialMount(false);
			// -----------------------------
		} else {
			// ------ Component Update -----
			const payload = { getParams: { ...usersFilter, ...usersMeta } };
			dispatch(fetchUsers(payload))
			// -----------------------------
		}
	}, [usersFilter, usersMeta]);

	// ===== Component Will Unmount ======
	useEffect(() => {
		return () => {
			console.log('will unmount');
		};
	}, []);

	return (
		<Container fluid className="p-0">
			<h1 className="h3 mb-3">{itemsNames.itemsNameMult1}</h1>

			<FilterBar
				changeItemsMeta={changeItemsMeta}
				changeItemsFilter={changeItemsFilter}
				currentFilter={usersFilter}
				itemsMeta={usersMeta}
			/>

			<ItemsTable
				itemsNames={itemsNames}
				itemsLoading={usersLoading}
				itemsList={usersList}
			/>

			{/*<div className="" />*/}
		</Container>
	);
};

export default Users;
