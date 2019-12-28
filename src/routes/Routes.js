import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { /*home as homeRoutes,*/ dashboard as dashboardRoutes, page as pageRoutes, error as errorRoutes } from './index';

import DashboardLayout from '../layouts/Dashboard';
import HomeLayout from '../layouts/Home';
import AuthLayout from '../layouts/Auth';

import ScrollToTop from '../components/ScrollToTop';

import { findItemBy } from 'helpers';

// ================
const routeMiddleware = (isAuthenticated, authLoading) => {
	if (!isAuthenticated && !authLoading) {
		setTimeout(() => {
			toastr.warning('Доступ закрыт', 'авторизуйтесь чтобы увидеть эту страницу');
		}, 100);
	}

	return isAuthenticated;
};

const checkAccessToRoute = (route, authUser) => {
	let rules;
	if (route.meta && route.meta.ruleType) {
		rules = findItemBy('ruleType', route.meta.ruleType, authUser.role.rules);

		const access = rules && rules.view;
		if (!access) {
			setTimeout(() => {
				toastr.warning('Доступ закрыт', 'У вас недостаточно прав чтобы просматривать эту страницу');
			}, 100);
		}
		// console.log(rules.view)
		return access;
	}
	return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useSelector(state => state.auth.authData);
	const { itemsLoading } = useSelector(state => state.auth.authStatus);
	const authLoading = itemsLoading;

	return (
		<Route
			{...rest}
			render={props => {
				// console.log(props)
				return (
					routeMiddleware(isAuthenticated, authLoading) ? (
						<Component {...props} />
					) : (
						<Redirect
							to={{
								pathname: '/auth/sign-in',
								state: { from: props.location }
							}}
						/>
					)
				)}
			}
		/>
	);
};

/*const RouteMiddleware = ({ layout: Layout, routes }) => {

	// const { isAuthenticated, authLoading } = useSelector(state => state.auth);
	// console.log('middlewares')
	return <ChildRoutes layout={DashboardLayout} routes={dashboardRoutes} />;
};*/

const ChildRoutes = ({ layout: Layout, routes }) => {
	const { authUser } = useSelector(state => state.auth.authData);
	
	return (
		<Layout>
			<Switch>
				{routes.map((category, routeIndex) =>
					category.children ? (
						// Route item with children
						category.children.map((route, catIndex) => {
							const Component = route.component;
							return (
								<Route
									key={`route-${catIndex}`}
									path={route.path}
									exact
									// component={route.component}
									error={route.error}
									render={props =>
										checkAccessToRoute(route, authUser) ? (
											<Component {...props} />
										) : (
											<Redirect
												to={{
													pathname: '/dashboard/default',
													state: { from: props.location }
												}}
											/>
										)
									}
								/>
							)
						})
					) : (
						// Route item without children
						<Route
							key={`category-${routeIndex}`}
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
}


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
					// component={() => <RouteMiddleware layout={DashboardLayout} routes={dashboardRoutes} />}
					component={() => <ChildRoutes layout={DashboardLayout} routes={dashboardRoutes} />}
				/>

				{/* Error Routes */}
				<Route path="/*" exact component={() => <ChildRoutes layout={HomeLayout} routes={errorRoutes} />} />
			</Switch>
		</ScrollToTop>
	</Router>
);

export default Routes;
