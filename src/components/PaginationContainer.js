import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
	// Card,
	// CardHeader,
	// CardTitle,
	Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';

// import { Edit2,	Trash, Check } from 'react-feather';

// =========================
const PaginationContainer = ({ 
	itemsLoading,
	itemsMeta,
	isInitialMount,
	changeItemsFilters,
	namesData: { itemsNameMult2 }
}) => {
	// =====getters====
	// const getUserClient = user => (user.isClient ? user.company : '');

	// =================
	const initialMeta = {
		current_page: 1,
		per_page: 1,
		total: 1,
		// defaultPagesToDisplay: 5
	}

	const [metaData, setMeta] = useState(initialMeta);
	const [defaultPagesToDisplay] = useState(5);
	const [firstItem, setFirstItem] = useState(1);
	const [lastItem, setLastItem] = useState(1);
	const [items, setItems] = useState([]);
	
	const setupPagination = (meta) => {
		// console.log('meta: ', meta)
		const maxItems = Math.ceil(meta.total / meta.per_page);
		let itemsShow, itemsToAdd, firstItem, lastItem;
		let items = [];

		if (maxItems > 1) {
			let closeToMin = meta.current_page - 1;
			let closeToMax = maxItems - meta.current_page;
			itemsShow = maxItems < defaultPagesToDisplay ? maxItems : defaultPagesToDisplay;
			itemsToAdd = itemsShow - 1;
			let half = Math.floor(itemsToAdd / 2) || 1;
			let stepBack;
			// console.log('half: ', half)
			
			if (closeToMin < half) {
				stepBack = closeToMin;
			} else if (closeToMax < half) {
				stepBack = itemsToAdd - closeToMax;
			} else {
				stepBack = half;
			}

			// console.log('stepBack: ', stepBack)
			firstItem = meta.current_page - stepBack;
			firstItem = firstItem || 1;
			// console.log(firstItem)
			lastItem = firstItem + itemsToAdd;
			lastItem = lastItem > maxItems ? maxItems : lastItem;
			
			setFirstItem(firstItem);
			setLastItem(lastItem);

			for (let i = firstItem; i <= lastItem; i++) { items.push(i) };
		}

		/*console.log('maxItems: ', maxItems)
		console.log('itemsShow: ', itemsShow)
		console.log('itemsToAdd: ', itemsToAdd)
		console.log('firstItem: ', firstItem)
		console.log('lastItem: ', lastItem)
		console.log('items: ', items)*/
		setItems(items);
	}

	const handleChangePage = number => {
		if (number !== metaData.current_page) {
			changeItemsFilters({ filterName: 'page', val: number });
		}
	}

	// ===== Watch =======
	useEffect(() => {
		if (!isInitialMount) {
			// console.log('Paginaton Update: ', itemsMeta);
			setMeta(itemsMeta);
			setupPagination(itemsMeta)
		}
	}, [itemsMeta]);

	if (!itemsLoading && items.length) {
		return (
			// <Card>
				<div className="d-flex align-items-center pagination-container">
					<div>Показаны с { metaData.from } по { metaData.to } из { metaData.total } { itemsNameMult2 }</div>

					<Pagination aria-label="Page navigation" className="ml-auto">
					  <PaginationItem	disabled={firstItem === metaData.current_page}>
					    <PaginationLink previous 
					    	onClick={()=>handleChangePage(metaData.current_page - 1)}/>
					  </PaginationItem>				  
					  {items.map((item, itemIndex) => (
						  <PaginationItem key={'page-'+item} active={item === metaData.current_page}>
						    <PaginationLink onClick={()=>handleChangePage(item)}>{item}</PaginationLink>
						  </PaginationItem>
						 	)
						)}

					  <PaginationItem	disabled={lastItem === metaData.current_page}>
					    <PaginationLink next
					    	onClick={()=>handleChangePage(metaData.current_page + 1)}/>
					  </PaginationItem>
					</Pagination>

					
				</div>
			// </Card>
		);
	} else return null;

	
};

PaginationContainer.defaultProps = {
	// itemsNames: {
	// 	itemsNameMult2: 'Элементы списка'
	// },
	itemsLoading: false,
	namesData: {
		itemsNameMult2: 'элементов'
	},
};

PaginationContainer.propTypes = {
	// itemsNames: PropTypes.shape({
	// 	itemsNameMult2: PropTypes.string
	// }),
	itemsLoading: PropTypes.bool,
	changeItemsFilters: PropTypes.func.isRequired,
	namesData: PropTypes.object
};

export { PaginationContainer };
