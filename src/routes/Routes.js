import React, { Fragment } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector /*useDispatch*/ } from 'react-redux'
// import {getIsAuthenticated} from 'services/authService';
import { /*actions as toastrActions*/ toastr } from 'react-redux-toastr';
// import {push as routerPush} from 'react-router-redux';

import {
  home as homeRoutes,
  dashboard as dashboardRoutes,
  page as pageRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import HomeLayout from "../layouts/Home";
import AuthLayout from "../layouts/Auth";

import ScrollToTop from "../components/ScrollToTop";

const handleRedirect = (authLoading) => {
  if (!authLoading) {
    setTimeout(() => {
      toastr.warning('Acess denined', 'to view this page login first')     
    }, 100)    
  }
  return <Redirect to={'/auth/sign-in'} />    
}

const PrivateRoute = (props) => {
  const { isAuthenticated, authLoading } = useSelector(state => state.auth);
  return <Fragment>{ isAuthenticated ? props.children : handleRedirect(authLoading)}</Fragment>
}


const ChildRoutes = ({ layout: Layout, routes }) => (
  <Layout>
    <Switch>
      {routes.map((category, index) =>
        category.children ? (
          // Route item with children
          category.children.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              component={route.component}
            />
          ))
        ) : (
          // Route item without children
          <Route
            key={index}
            path={category.path}
            exact
            component={category.component}
          />
        )
      )}
    </Switch>
  </Layout>
);

const Routes = ({history}) => (
  <Router history={history}>
    <ScrollToTop>
      <Switch>
        {/* Landing routes */}
        <Route
          path="/"
          exact
          component={() => (
            <ChildRoutes layout={HomeLayout} routes={homeRoutes} />
          )}
        />

        {/* Auth routes */}
        <Route
          path="/auth/*"
          exact
          component={() => (
            <ChildRoutes layout={AuthLayout} routes={pageRoutes} />
          )}
        />

        {/* Dashboard routes */}
        <PrivateRoute>
          <Route
            path="/dashboard/*"
            exact
            component={() => (
              <ChildRoutes layout={DashboardLayout} routes={dashboardRoutes} />
            )}
          />
        </PrivateRoute>
        
      </Switch>
    </ScrollToTop>
  </Router>
);

export default Routes;
