import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { /*home as homeRoutes,*/ dashboard as dashboardRoutes, page as pageRoutes, error as errorRoutes } from './index';

import DashboardLayout from '../layouts/Dashboard';
import HomeLayout from '../layouts/Home';
import AuthLayout from '../layouts/Auth';

import ScrollToTop from '../components/ScrollToTop';

const hasAccess = (isAuthenticated, authLoading) => {
	if (!isAuthenticated && !authLoading) {
		setTimeout(() => {
			toastr.warning('Доступ закрыт', 'авторизуйтесь чтобы увидеть эту страницу');
		}, 100);
	}

	return isAuthenticated;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated, authLoading } = useSelector(state => state.auth);

	return (
		<Route
			{...rest}
			render={props =>
				hasAccess(isAuthenticated, authLoading) ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/auth/sign-in',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
};

const ChildRoutes = ({ layout: Layout, routes }) => (
	<Layout>
		<Switch>
			{routes.map((category, routeIndex) =>
				category.children ? (
					// Route item with children
					category.children.map((route, catIndex) => (
						<Route
							key={`category-${catIndex}`}
							path={route.path}
							exact
							component={route.component}
							error={route.error}
						/>
					))
				) : (
					// Route item without children
					<Route
						key={`route-${routeIndex}`}
						path={category.path}
						exact
						// component={category.component}
						render={() => {
							const Component = category.component;
							return <Component error={category.error} />;
						}}
					/>
				)
			)}
		</Switch>
	</Layout>
);

const Routes = ({ history }) => (
	<Router history={history}>
		<ScrollToTop>
			<Switch>
				{/* Landing routes */}
				{/*<Route path="/" exact component={() => <ChildRoutes layout={HomeLayout} routes={homeRoutes} />} />*/}
				<Route path="/" exact component={() => <Redirect to="/dashboard/users" />} />

				{/* Auth routes */}
				<Route path="/auth/*" exact component={() => <ChildRoutes layout={AuthLayout} routes={pageRoutes} />} />

				{/* Dashboard routes */}

				<Route path="/dashboard" exact component={() => <Redirect to="/dashboard/users" />} />

				<PrivateRoute
					path="/dashboard/*"
					exact
					component={() => <ChildRoutes layout={DashboardLayout} routes={dashboardRoutes} />}
				/>

				{/* Error Routes */}
				<Route path="/*" exact component={() => <ChildRoutes layout={HomeLayout} routes={errorRoutes} />} />
			</Switch>
		</ScrollToTop>
	</Router>
);

export default Routes;
