import React from 'react';
import PropTypes from 'prop-types';

import {
	Spinner,
	Table
} from 'reactstrap';

import { Edit2,	Trash } from 'react-feather';

const ItemsTable = ({ 
	rulesData, 
	itemsLoading,
	itemsList,
	itemsNames: { itemsNameMult2 },
	toggleItemEdit,
	toggleItemDelete,
	ruleTypes
}) => {
	// =====getters====
	// =================
	const handleItemEdit = role => {toggleItemEdit(role)}
	const handleItemDelete = role => {toggleItemDelete(role)}

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
								<th className="name">Название</th>
								{/*<th>Отображаемое название</th>*/}
								<th>Описание</th>
								{/*<th>Права</th>*/}
								<th>Действия</th>
							</tr>
						</thead>
						<tbody>
							{itemsList.map((role, roleIndex) => (
								<tr key={`role_item-${roleIndex}`}>
									<td>{role.id}</td>
									<td>{role.name}</td>
									{/*<td>{role.dispaly_name}</td>*/}
									<td>{role.description}</td>
									{/*<td>
										{role.rules.map((rule, roleInd) => (
											<div key={`rule-${roleInd}`}>{rule.display_name}</div>
										))}
									</td>*/}
									<td className="table-action">
										{ rulesData.update && (
											<Edit2 className="align-middle mr-1 pointer" size={18}
												onClick={() => handleItemEdit(role)}
											/>)
										}
										{ rulesData.delete && (
											<Trash className="align-middle pointer" size={18}
												onClick={() => handleItemDelete(role)}
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
	itemsList: PropTypes.array.isRequired,
	toggleItemEdit: PropTypes.func.isRequired,
	toggleItemDelete: PropTypes.func.isRequired
};

export { ItemsTable };
