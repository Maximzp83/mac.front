import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	ButtonGroup,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

const FilterBar = ({
	changeItemsFilter,
	changeItemsMeta,
	currentFilter: {isClient},
	itemsMeta
}) => {
	const [maxItemsOpen, setMaxItems] = useState(false);
	const maxToggle = () => {
		setMaxItems(!maxItemsOpen);
	};

	const handleFilter = value => {
		// const { name, val } = value;
		// if (currentFilter[name] !== val) {
		if (isClient !== value) {
			// const newFilters = { ...currentFilter, [name]: val };
			const payload = { filterName: 'isClient', val: value };
			changeItemsFilter(payload);
		}		
	};

	const handleItemsMetaChange = meta => {
		const { name, val } = meta;
		if (itemsMeta[name] !== val) {
			const newMeta = { ...itemsMeta, [name]: val };
			changeItemsMeta(newMeta);
		}
	};

	return (
		<div className="filterbar user-filterbar">
			<ButtonGroup className="items-filterbar">
				<Button
					color="primary"
					size="lg"
					onClick={() => handleFilter(null)}
					active={isClient === null}
				>
					Все
				</Button>
				<Button
					color="primary"
					size="lg"
					onClick={() => handleFilter('1')}
					active={isClient === '1'}
				>
					Внешние
				</Button>
				<Button
					color="primary"
					size="lg"
					onClick={() => handleFilter('0')}
					active={isClient === '0'}
				>
					Внутренние
				</Button>
			</ButtonGroup>

			<ButtonDropdown isOpen={maxItemsOpen} toggle={maxToggle}>
				<DropdownToggle caret>{itemsMeta.maxItems}</DropdownToggle>
				<DropdownMenu>
					<DropdownItem
						active={itemsMeta.maxItems === 10}
						onClick={() => handleItemsMetaChange({ name: 'maxItems', val: 10 })}
					>
						10
					</DropdownItem>
					<DropdownItem
						active={itemsMeta.maxItems === 20}
						onClick={() => handleItemsMetaChange({ name: 'maxItems', val: 20 })}
					>
						20
					</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
		</div>
	);
};

FilterBar.propTypes = {
	changeItemsFilter: PropTypes.func.isRequired,
	changeItemsMeta: PropTypes.func.isRequired,
	currentFilter: PropTypes.object,
	itemsMeta: PropTypes.object
};

export { FilterBar };
