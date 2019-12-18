import React from 'react';
// import { connect } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
// import {push as routerPush} from 'react-router-redux';

// import { toastr } from 'react-redux-toastr';

import {
	// Row,
	// Col,
	Collapse,
	Navbar,
	Nav,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	// ListGroup,
	// ListGroupItem,
	Form,
	Input,
	Spinner
} from 'reactstrap';

import {
	Settings,
	User
} from 'react-feather';


import { signOut } from 'redux/actions/authActions';
import { toggleSidebar } from '../redux/actions/sidebarActions';


const NavbarComponent = () => {
	const dispatch = useDispatch();

	const { authLoading, isAuthenticated, authUser } = useSelector(
		state => state.auth
	);

	const handleLogout = () => {
		// console.log('ok')
		dispatch(signOut())
	};

  const handleToggleSidebar = () => dispatch(toggleSidebar());

	return (
		<Navbar color="white" light expand>
			<span
				className="sidebar-toggle d-flex mr-2"
        onClick={handleToggleSidebar}
			>
				<i className="hamburger align-self-center" />
			</span>

			<Form inline>
				<Input
					type="text"
					placeholder="Search projects..."
					aria-label="Search"
					className="form-control-no-border mr-sm-2"
				/>
			</Form>

			<Collapse navbar>
				<Nav className="ml-auto" navbar>
					{/* <NavbarDropdown
            header="New Messages"
            footer="Show all messages"
            icon={MessageCircle}
            count={messages.length}
            showBadge>
            {messages.map((item, key) => {
              return (
                <NavbarDropdownItem
                  key={key}
                  icon={
                    <img
                      className="avatar img-fluid rounded-circle"
                      src={item.avatar}
                      alt={item.fullName
                    />
                  }
                  title={item.name}
                  description={item.description}
                  time={item.time}
                  spacing
                />
              );
            })}
          </NavbarDropdown> */}

					{/* <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={BellOff}
            count={notifications.length}>
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />;

              if (item.type === "important") {
                icon = <AlertCircle size={18} className="text-danger" />;
              }

              if (item.type === "login") {
                icon = <Home size={18} className="text-primary" />;
              }

              if (item.type === "request") {
                icon = <UserPlus size={18} className="text-success" />;
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              );
            })}
          </NavbarDropdown> */}

					{/* <UncontrolledDropdown nav inNavbar className="mr-2">
            <DropdownToggle nav caret className="nav-flag">
              <img src={usFlag} alt="English" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <img
                  src={usFlag}
                  alt="English"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">English</span>
              </DropdownItem>
              <DropdownItem>
                <img
                  src={esFlag}
                  alt="Spanish"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">Spanish</span>
              </DropdownItem>
              <DropdownItem>
                <img
                  src={deFlag}
                  alt="German"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">German</span>
              </DropdownItem>
              <DropdownItem>
                <img
                  src={nlFlag}
                  alt="Dutch"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">Dutch</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}

					{isAuthenticated && (
						<UncontrolledDropdown nav inNavbar>
							<span className="d-inline-block d-sm-none">
								<DropdownToggle nav caret>
									<Settings size={18} className="align-middle" />
								</DropdownToggle>
							</span>
							<span className="d-none d-sm-inline-block">
								<DropdownToggle nav caret>
									<img
										src={authUser.avatar}
										className="avatar img-fluid rounded-circle mr-1"
										alt={authUser.first_name}
									/>
									<span className="text-dark">{authUser.first_name}</span>
								</DropdownToggle>
							</span>
							<DropdownMenu right>
								<DropdownItem>
									<User size={18} className="align-middle mr-2" />
									Profile
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>
									{authLoading ? (
										<Spinner size="sm" color="#fff" />
									) : (
										<span onClick={handleLogout}>Sign out</span>
									)}
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					)}
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default NavbarComponent;

/* export default connect(store => ({
  app: store.app
}))(NavbarComponent);
*/
