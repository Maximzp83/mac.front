import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ErrorPage = ({error: {title, message, status}}) => (
	<div className="text-center">
		<h1 className="display-1 font-weight-bold">{status}</h1>
		{/*<p className="h1">Internal server error.</p>*/}
		<p className="h1">{title}</p>
		{/*The server encountered something unexpected that didn't allow it to
			complete the request.*/}
		<p className="h2 font-weight-normal mt-3 mb-4">{message}</p>
		<Link to="/dashboard/default">
			<Button color="primary" size="lg">
				Вернуться на главную
			</Button>
		</Link>
	</div>
);

ErrorPage.defaultProps = {
	error: {
		title: 'Неизвестная ошибка',
		message: '',
		status: ''
	}
};

ErrorPage.propTypes = {
	error: PropTypes.shape({
		title: PropTypes.string,
		message: PropTypes.string,
		status: PropTypes.string
	}),
};

export default ErrorPage;
