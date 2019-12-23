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
		defaultPagesToDisplay: 5
	}
	const [meta, setMeta] = useState(initialMeta);
	const [totalPages, setTotalPages] = useState(0);
	
per_page: this.metaData.meta.per_page,
	total: this.metaData.meta.total,
	current_page: this.metaData.meta.current_page,
	defaultPagesToDisplay: 5

	// const handleItemEdit = user => {toggleItemEdit(user)}
	// const handleItemDelete = user => {toggleItemDelete(user)}

	const calcTotalPages = () => {
		let result = meta.total > 0 ? 
			Math.ceil(meta.total / meta.per_page) : 1;
    setTotalPages(result)
	  // if (pageCount > 0) return pageCount
	}

	const calcPagesToDisplay = () => {
	  if (totalPages > 0 && totalPages < defaultPagesToDisplay) {
	    return totalPages
	  }
	  return defaultPagesToDisplay
	}

	minPage() {
	  if (this.current_page >= this.pagesToDisplay) {
	    const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
	    const newMaxPage = pagesToAdd + this.current_page
	    if (newMaxPage > this.totalPages) {
	      return this.totalPages - this.pagesToDisplay + 1
	    }
	    return this.current_page - pagesToAdd
	  } else {
	    return 1
	  }
	},
	maxPage() {
	  if (this.current_page >= this.pagesToDisplay) {
	    const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
	    const newMaxPage = pagesToAdd + this.current_page
	    if (newMaxPage < this.totalPages) {
	      return newMaxPage
	    } else {
	      return this.totalPages
	    }
	  } else {
	    return this.pagesToDisplay
	  }
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
			// calculateRange(itemsMeta.from, itemsMeta.total)
			// setRange()
			// setFormData(data);
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
				  
				  {range.map((page, pageIndex) => (
					  <PaginationItem 
					  	active={false}
					  >
					    <PaginationLink href="#">2</PaginationLink>
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
