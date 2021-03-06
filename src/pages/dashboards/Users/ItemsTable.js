import React from 'react';
import PropTypes from 'prop-types';

import {
	// Card,
	// CardHeader,
	// CardTitle,
	Spinner,
	Table
} from 'reactstrap';

import { Edit2,	Trash /*Check*/ } from 'react-feather';

const ItemsTable = ({
	rulesData,
	itemsLoading,
	itemsList,
	itemsNames: { itemsNameMult2 },
	toggleItemEdit,
	toggleItemDelete,
	userTypesList
}) => {
	
	// =====getters====
	// const getUserClient = user => (user.isClient ? user.company : '');
	const getUserClient = user => (user.type === 1 ? '' : 'да');

	/* const userRoles = user => {
		let roles = [];
		for (let i = 0; i < user.roles.length; i++) {
			roles.push(user.roles[i].display_name);
		}
		return roles;
		// user.isAdmin ? 'Администраторы' : 'Пользователи';
	} */
	// =================
	const handleItemEdit = user => {toggleItemEdit(user)}
	const handleItemDelete = user => {toggleItemDelete(user)}

	return (
		// <Card>
		<div className="mt-3">
			{itemsLoading ? (
				<div className="text-center">
					<span className="align-middle">
						<Spinner size="sm" color="primary" />
					</span>
					<span className="align-middle preloader-text">Загрузка {itemsNameMult2}...</span>
				</div>
			) : null}

			{!itemsLoading && !itemsList.length ? (
				<div className="text-center preloader-text">{itemsNameMult2} не обнаружено</div>
			) : null}

			{!itemsLoading && itemsList.length ? (
				<div className="table-wrapper">
					<Table bordered size="sm" striped className="standard-table centered">
						<thead>
							<tr>
								<th className="id">ID</th>
								<th className="name">Логин</th>
								<th>Фамилия</th>
								<th>Имя</th>
								<th>Отчество</th>
								<th>Клиент</th>
								{/*<th>Телефон</th>*/}
								<th>Группа пользователей</th>
								{/*<th>Статус</th>*/}
								<th>Действия</th>
							</tr>
						</thead>
						<tbody>
							{itemsList.map((user, userIndex) => (
								<tr key={`user_item-${userIndex}`}>
									<td>{user.id}</td>
									<td>{user.login}</td>
									<td>{user.last_name}</td>
									<td>{user.first_name}</td>
									<td>{user.second_name}</td>
									<td>{getUserClient(user)}</td>
									{/*<td>{user.phone}</td>*/}
									<td>{user.role ? user.role.display_name : ''}</td>
									{/*<td>
										{user.roles.map((role, roleInd) => (
											<div key={`role-${roleInd}`}>{role.display_name}</div>
										))}
									</td>*/}
									{/*<td>{user.isActive && <Check size={20} className="text-success" />}</td>*/}
									<td className="table-action">
									{ rulesData.update && (
										<Edit2 className="align-middle mr-1 pointer" size={18}
											onClick={() => handleItemEdit(user)}
										/>)
									}
									{ rulesData.delete && (
										<Trash className="align-middle pointer" size={18}
											onClick={() => handleItemDelete(user)}
										/>
									)}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			) : null}
		</div>
		// </Card>
	);
};

ItemsTable.defaultProps = {
	itemsNames: {
		itemsNameMult2: 'Элементы списка'
	},
	itemsLoading: false
};

ItemsTable.propTypes = {
	itemsNames: PropTypes.shape({
		itemsNameMult2: PropTypes.string
	}),
	itemsLoading: PropTypes.bool,
	rulesData: PropTypes.object.isRequired,
	itemsList: PropTypes.array.isRequired
};

export { ItemsTable };
