import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

// import { SECTIONS } from 'constants/global';
import { findItemBy } from 'helpers';
// import { toastr } from 'react-redux-toastr';

import { Badge, Collapse } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

// import { Box } from "react-feather";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircle } from "@fortawesome/free-solid-svg-icons";

import routes from '../routes';
// import avatar from "../assets/img/avatars/avatar.jpg";
import logoImg from '../assets/img/logo.png';

const SidebarCategory = withRouter(
	({ name, badgeColor, badgeText, icon: Icon, isOpen, children, handleClick, location, to }) => {
		const getSidebarItemClass = path => {
			return location.pathname.indexOf(path) !== -1 || (location.pathname === '/' && path === '/dashboard')
				? 'active'
				: '';
		};

		return (
			<li className={`sidebar-item ${getSidebarItemClass(to)}`}>
				<span
					data-toggle="collapse"
					className={`sidebar-link ${!isOpen ? 'collapsed' : ''}`}
					onClick={handleClick}
					aria-expanded={isOpen ? 'true' : 'false'}
				>
					<Icon size={18} className="align-middle mr-3" />
					<span className="align-middle">{name}</span>
					{badgeColor && badgeText ? (
						<Badge color={badgeColor} size={18} className="sidebar-badge">
							{badgeText}
						</Badge>
					) : null}
				</span>
				<Collapse isOpen={isOpen}>
					<ul id="item" className="sidebar-dropdown list-unstyled">
						{children}
					</ul>
				</Collapse>
			</li>
		);
	}
);

const SidebarItem = withRouter(({ name, badgeColor, badgeText, icon: Icon, location, to }) => {
	const getSidebarItemClass = path => {
		return location.pathname === path ? 'active' : '';
	};
	// console.log(to)
	return (
		<li className={`sidebar-item ${getSidebarItemClass(to)}`}>
			<NavLink to={to} className="sidebar-link" activeClassName="active">
				{Icon ? <Icon size={18} className="align-middle mr-3" /> : null}
				{name}
				{badgeColor && badgeText ? (
					<Badge color={badgeColor} size={18} className="sidebar-badge">
						{badgeText}
					</Badge>
				) : null}
			</NavLink>
		</li>
	);
});

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		// this.sidebarRef = React.createRef();
		this.state = {
			filteredRoutes: []
		};
	}

	toggleSideBarCategory = index => {
		this.setState(state => ({
			[index]: !state[index]
		}));
	};

	filterRoutesByRules = (routes, auth) => {
		let rules;
		let copyRoutes = Object.assign([], routes);
		let filteredRoutes = [];

		for (let category of copyRoutes) {
			let copyCategory = Object.assign({}, category);
			let filteredChildren = [];
			if (copyCategory.children && copyCategory.children.length) {
				for (let route of copyCategory.children) {
					let hasAccess = true;
					if (route.meta && route.meta.ruleType) {
						rules = findItemBy('ruleType', route.meta.ruleType, auth.authUser.role.rules);
						hasAccess = rules && rules.view;
					}
					if (hasAccess) filteredChildren.push(route);
				}
				copyCategory.children = filteredChildren;
			}
			if (copyCategory.children.length) {
				filteredRoutes.push(copyCategory)
			}

		}

		return filteredRoutes;		
	};

	setupRoutes = (routes, pathName) => {
		const filteredRoutes = this.filterRoutesByRules(routes, this.props.auth)
		// console.log('setupRoutes: ', filteredRoutes)
		
		filteredRoutes.forEach((route, index) => {
			const isActive = pathName.indexOf(route.path) === 0;
			const isOpen = route.open;
			const isHome = !!(route.containsHome && pathName === '/');

			this.setState( prevState => ({
				[index]: isActive || isOpen || isHome
			}));
		});

		this.setState({ filteredRoutes: filteredRoutes});
	};	

	componentWillMount() {
		/* Open collapse element that matches current url */
		const pathName = this.props.location.pathname;

		this.setupRoutes(routes, pathName)
		console.log(this.state.filteredRoutes, routes)
		// console.log('componentWillMount: ', this.state.filteredRoutes)		
	}

	render() {
		const { sidebar /* layout */ } = this.props;
		// console.log('render: ', this.state.filteredRoutes, routes)
		
		return (
			<nav className={`sidebar${!sidebar.isOpen ? ' toggled' : ''}${sidebar.isSticky ? ' sidebar-sticky' : ''}`}>
				<div className="sidebar-content">
					<PerfectScrollbar>
						<a className="sidebar-brand" href="/">
							{/* <Box className="align-middle text-primary mr-2" size={24} />{" "} */}
							<img src={logoImg} alt="logo" width="40" height="40" className="align-middle" />
							<span className="align-middle ml-3">
								<b>WebSpot</b>
							</span>
						</a>

						<ul className="sidebar-nav">
							{this.state.filteredRoutes.map((category, index) => {
								return (
									<React.Fragment key={index}>
										{category.header ? <li className="sidebar-header">{category.header}</li> : null}

										{category.children ? (
											<SidebarCategory
												name={category.name}
												badgeColor={category.badgeColor}
												badgeText={category.badgeText}
												icon={category.icon}
												to={category.path}
												isOpen={this.state[index]}
												handleClick={() => this.toggleSideBarCategory(index)}
											>
												{category.children.map((route, index) => (
													<SidebarItem
														key={index}
														name={route.name}
														to={route.path}
														badgeColor={route.badgeColor}
														badgeText={route.badgeText}
													/>
												))}
											</SidebarCategory>
										) : (
											<SidebarItem
												name={category.name}
												to={category.path}
												icon={category.icon}
												badgeColor={category.badgeColor}
												badgeText={category.badgeText}
											/>
										)}
									</React.Fragment>
								);
							})}
						</ul>
						{/*
            {!layout.isBoxed && !sidebar.isSticky ? (
              <div className="sidebar-bottom d-none d-lg-block">
                <div className="media">
                  <img
                    className="rounded-circle mr-3"
                    src={avatar}
                    alt="Chris Wood"
                    width="40"
                    height="40"
                  />
                  <div className="media-body">
                    <h5 className="mb-1">Chris Wood</h5>
                    <div>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-success"
                      />{" "}
                      Online
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            */}
					</PerfectScrollbar>
				</div>
			</nav>
		);
	}
}

export default withRouter(
	connect(store => ({
		sidebar: store.sidebar,
		layout: store.layout,
		auth: store.auth
	}))(Sidebar)
);
