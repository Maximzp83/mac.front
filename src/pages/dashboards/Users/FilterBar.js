import React, { useState } from "react";
import PropTypes from 'prop-types';

import {
  Button,
  ButtonGroup,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

const FilterBar = ({changeItemsFilter, changeItemsMeta, currentFilter, itemsMeta}) => {

	const [maxItemsOpen, setMaxItems] = useState(false)
	const maxToggle = () => {setMaxItems(!maxItemsOpen)}

	const handleFilterSelect = (value) => {
	  const { name, val } = value;
	  if (currentFilter[name] !== val) {
	    let newFilters = {...currentFilter, [name]: val}
	    changeItemsFilter(newFilters);
	  }
	}

	const handleItemsMetaChange = meta => {
		const { name, val } = meta;
		if (itemsMeta[name] !== val) {
		  let newMeta = {...itemsMeta, [name]: val}
		  changeItemsMeta(newMeta)
		}
	} 

	return (
		<div className="filterbar user-filterbar">
			<ButtonGroup className="items-filterbar">
			  <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isClient', val:null})} active={currentFilter.isClient === null }>Все</Button>
			  <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isClient', val:'1'})} active={currentFilter.isClient === '1'}>Внешние</Button>
			  <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isClient', val:'0'})} active={currentFilter.isClient === '0'}>Внутренние</Button>
			</ButtonGroup>

			<ButtonDropdown isOpen={maxItemsOpen} toggle={maxToggle}>
	      <DropdownToggle caret>{itemsMeta.maxItems}</DropdownToggle>
	      <DropdownMenu>
	        <DropdownItem active={itemsMeta.maxItems===10} onClick={()=>handleItemsMetaChange({name:'maxItems', val:10})}>10</DropdownItem>
	        <DropdownItem active={itemsMeta.maxItems===20} onClick={()=>handleItemsMetaChange({name:'maxItems', val:20})}>20</DropdownItem>
	      </DropdownMenu>
	    </ButtonDropdown>
		</div>
	)
}

FilterBar.propTypes = {
  changeItemsFilter: PropTypes.func.isRequired,
  changeItemsMeta: PropTypes.func.isRequired,
  currentFilter: PropTypes.object,
  itemsMeta: PropTypes.object,
};

export { FilterBar }