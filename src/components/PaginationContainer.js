import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
	// Card,
	// CardHeader,
	// CardTitle,
	Pagination, PaginationItem, PaginationLink,
	Spinner,
} from 'reactstrap';

// import { Edit2,	Trash, Check } from 'react-feather';

const PaginationContainer = ({ 
	itemsLoading,
	itemsMeta,
	isInitialMount
}) => {
	// =====getters====
	// const getUserClient = user => (user.isClient ? user.company : '');

	// =================
	const initialMeta = {
		current_page: 1,
		per_page: 1,
		total: 1,
		defaultPagesToDisplay: 5
	}
	const calculateData = {
		current_page: 1,
		per_page: 1,
		total: 1,
		defaultPagesToDisplay: 10
	}
	const [meta, setMeta] = useState(initialMeta);
	const [totalPages, setTotalPages] = useState(0);
	const [pagesToDisplay, setPagesToDisplay] = useState(0);
	const [minPage, setMinPage] = useState(0);
	const [maxPage, setMaxPage] = useState(0);
	const [range, setRange] = useState([]);
	
	/*per_page: this.metaData.meta.per_page,
	total: this.metaData.meta.total,
	current_page: this.metaData.meta.current_page,
	defaultPagesToDisplay: 5*/

	// const handleItemEdit = user => {toggleItemEdit(user)}
	// const handleItemDelete = user => {toggleItemDelete(user)}

	const calcTotalPages = () => {
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
	}

	// ===== Watch =======
	useEffect(() => {
		if (!isInitialMount) {
			console.log('Paginaton Update: ', itemsMeta);
			calcTotalPages();
			calcPagesToDisplay();
			calcMinPage();
			calcMaxPage();
			calculateRange(minPage, maxPage)
			// calculateRange(itemsMeta.from, itemsMeta.total)
			// setRange()
			// setFormData(data);
			console.log(minPage)
		}
	}, [itemsMeta]);

	return (
		// <Card>
		<div className="mt-3">

			{!itemsLoading ? (
				<Pagination aria-label="Page navigation example">
				  <PaginationItem>
				    <PaginationLink previous href="#" />
				  </PaginationItem>
				  
				  {range.map((item, itemIndex) => (
					  <PaginationItem 
					  	active={false}
					  	key={'page-'+item}
					  >
					    <PaginationLink href="#">{item}</PaginationLink>
					  </PaginationItem>
					 	)
					)}

				  <PaginationItem>
				    <PaginationLink next href="#" />
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
	// itemsList: PropTypes.array.isRequired
};

export { PaginationContainer };
