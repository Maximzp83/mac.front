import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	// Button,
	// ButtonGroup,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Col,
	Row
} from 'reactstrap';

const FilterBar = ({ changeItemsFilter, changeItemsMeta, currentFilter: { isClient }, itemsMeta: { max } }) => {
	const [maxItemsOpen, setMaxItems] = useState(false);
	const maxToggle = () => setMaxItems(!maxItemsOpen);

	/*const handleFilter = value => {
		// const { name, val } = value;
		// if (currentFilter[name] !== val) {
		if (isClient !== value) {
			// const newFilters = { ...currentFilter, [name]: val };
			// const payload = { filterName: 'isClient', val: value };
			changeItemsFilter({ filterName: 'isClient', val: value });
		}
	};*/

	const handleItemsMetaChange = value => {
		if (max !== value) {
			changeItemsMeta({ filterName: 'max', val: value });
		}
	};

	return (
		<Row className="filterbar user-filterbar">
			{/*<Col xs="12" md="8">
				<ButtonGroup className="items-filterbar">
					<Button color="primary" size="lg" onClick={() => handleFilter(null)} active={isClient === null}>
						Все
					</Button>
					<Button color="primary" size="lg" onClick={() => handleFilter('1')} active={isClient === '1'}>
						Внешние
					</Button>
					<Button color="primary" size="lg" onClick={() => handleFilter('0')} active={isClient === '0'}>
						Внутренние
					</Button>
				</ButtonGroup>
			</Col>*/}

			<Col xs="12" md="4" className="ml-auto d-flex">
				<ButtonDropdown isOpen={maxItemsOpen} toggle={maxToggle} className="ml-auto">
					<DropdownToggle caret>{max}</DropdownToggle>
					<DropdownMenu>
						<DropdownItem active={max === 10} onClick={() => handleItemsMetaChange(10)}>
							10
						</DropdownItem>
						<DropdownItem active={max === 20} onClick={() => handleItemsMetaChange(20)}>
							20
						</DropdownItem>
						<DropdownItem active={max === -1} onClick={() => handleItemsMetaChange(-1)}>
							Все
						</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</Col>
		</Row>
	);
};

FilterBar.defaultProps = {
	currentFilter: { isClient: null },
	itemsMeta: { max: null }
};

FilterBar.propTypes = {
	currentFilter: PropTypes.shape({
		isClient: PropTypes.string
	}),
	itemsMeta: PropTypes.shape({
		max: PropTypes.number
	}),
	changeItemsFilter: PropTypes.func.isRequired,
	changeItemsMeta: PropTypes.func.isRequired
};

export { FilterBar };
