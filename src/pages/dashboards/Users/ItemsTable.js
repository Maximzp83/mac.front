import React from 'react';
import PropTypes from 'prop-types';

import {
	// Card,
	// CardHeader,
	// CardTitle,
	Spinner,
	Table
} from 'reactstrap';

import { Check } from 'react-feather';

const ItemsTable = ({
	itemsLoading,
	itemsList,
	itemsNames: { itemsNameMult2 }
}) => {
	// =====getters====
	const getUserClient = user => (user.isClient ? user.company : '');
	/*const userRoles = user => {
		let roles = [];
		for (let i = 0; i < user.roles.length; i++) {
			roles.push(user.roles[i].display_name);
		}
		return roles;
		// user.isAdmin ? 'Администраторы' : 'Пользователи';
	}*/
	// =================

	return (
		// <Card>
		<div>
			{itemsLoading ? (
				<div className="text-center">
					<span className="align-middle">
						<Spinner size="sm" color="primary" />
					</span>
					<span className="align-middle preloader-text">
						Загрузка {itemsNameMult2}...
					</span>
				</div>
			) : null}

			{!itemsLoading && !itemsList.length ? (
				<div className="text-center preloader-text">
					{itemsNameMult2} не обнаружено
				</div>
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
								<th>Телефон</th>
								<th>Группа пользователей</th>
								<th>Статус</th>
							</tr>
						</thead>
						<tbody>
							{itemsList.map((user, userIndex) => (
								<tr key={`user_item-${userIndex}`}>
									<td>{user.id}</td>
									<td>{user.email}</td>
									<td>{user.last_name}</td>
									<td>{user.first_name}</td>
									<td>{user.second_name}</td>
									<td>{getUserClient(user)}</td>
									<td>{user.phone}</td>
									<td>{ user.roles.map((role, roleInd) => (<div key={'role-'+roleInd}>{role.display_name}</div>) ) }</td>
									<td>
										{user.isActive && (
											<Check size={20} className="text-success" />
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

ItemsTable.propTypes = {
	itemsList: PropTypes.array.isRequired,
	itemsNames: PropTypes.shape({
		itemsNameMult2: PropTypes.string
	}),
	itemsLoading: PropTypes.bool
};

export { ItemsTable };
