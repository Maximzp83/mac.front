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
	changeItemsFilters
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
	
	/*per_page: this.metaData.meta.per_page,
		total: this.metaData.meta.total,
		current_page: this.metaData.meta.current_page,
		defaultPagesToDisplay: 5*/

		// const handleItemEdit = user => {toggleItemEdit(user)}
		// const handleItemDelete = user => {toggleItemDelete(user)}

		/*const calcTotalPages = () => {
			let result = meta.total > 0 ? 
				Math.ceil(meta.total / meta.per_page) : 1;
				console.log(result)
	    setTotalPages(result)
		  // if (pageCount > 0) return pageCount
		}

		const calcPagesToDisplay = () => {
			let result;
				console.log(totalPages)
			
			if (totalPages > 0 && totalPages < meta.defaultPagesToDisplay) {
				result = totalPages;
			} else {
				result = meta.defaultPagesToDisplay;			
			}
				console.log(result)

	    setPagesToDisplay(result)
		}

		const calcMinPage = () => {
			let result;
		  if (meta.current_page >= pagesToDisplay) {
		    const pagesToAdd = Math.floor(pagesToDisplay / 2);
		    const newMaxPage = pagesToAdd + meta.current_page;
		    if (newMaxPage > totalPages) {
		      result = totalPages - pagesToDisplay + 1;
		    } else {
		    	result = meta.current_page - pagesToAdd;	    	
		    }
		  } else {
		    result = 1;
		  }
				console.log(result)

	    setMinPage(result);
		}

		const calcMaxPage = () => {
			let result;

		  if (meta.current_page >= pagesToDisplay) {
		  	let result;
		    const pagesToAdd = Math.floor(pagesToDisplay / 2);
		    const newMaxPage = pagesToAdd + meta.current_page;
		    if (newMaxPage < totalPages) {
		      result = newMaxPage;
		    } else {
		      result = totalPages;
		    }
		  } else {
		    result = pagesToDisplay;
		  }
				console.log(result)

	    setMaxPage(result);
		}
		
		const calculateRange = (min, max) => {
			let range = []
			for (let i = min; i <= max; i++) {
			  range.push(i)
			}

			setRange(range)
		}*/

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
			// console.log(number)
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

	return (
		// <Card>
		<div className="mt-3">

			{!itemsLoading && items.length ? (
				<Pagination aria-label="Page navigation example">
				  <PaginationItem	disabled={firstItem === itemsMeta.current_page}>
				    <PaginationLink previous 
				    	onClick={()=>handleChangePage(itemsMeta.current_page - 1)}/>
				  </PaginationItem>				  
				  {items.map((item, itemIndex) => (
					  <PaginationItem key={'page-'+item}
					  	active={item === itemsMeta.current_page}
					  >
					    <PaginationLink onClick={()=>handleChangePage(item)}>{item}</PaginationLink>
					  </PaginationItem>
					 	)
					)}

				  <PaginationItem	disabled={lastItem === itemsMeta.current_page}>
				    <PaginationLink next
				    	onClick={()=>handleChangePage(itemsMeta.current_page + 1)}/>
				  </PaginationItem>
				</Pagination>
			) : null}
		</div>
		// </Card>
	);
};

PaginationContainer.defaultProps = {
	// itemsNames: {
	// 	itemsNameMult2: 'Элементы списка'
	// },
	itemsLoading: false
};

PaginationContainer.propTypes = {
	// itemsNames: PropTypes.shape({
	// 	itemsNameMult2: PropTypes.string
	// }),
	itemsLoading: PropTypes.bool,
	changeItemsFilters: PropTypes.func.isRequired
	// itemsList: PropTypes.array.isRequired
};

export { PaginationContainer };
