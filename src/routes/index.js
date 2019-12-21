import {
	Layout as LayoutIcon,
	// Monitor as MonitorIcon,
	Sliders as SlidersIcon,
	Users as UsersIcon
} from 'react-feather';
import async from '../components/Async';

// Landing
import HomePage from '../pages/home/HomePage';

// Auth
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ErrorPage from '../pages/auth/ErrorPage';

// import ResetPassword from "../pages/auth/ResetPassword";

// Layouts
// import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";

// Pages
import Profile from '../pages/pages/Profile';

// Dashboards
const Default = async(() => import('../pages/dashboards/Default'));
const Users = async(() => import('../pages/dashboards/Users/Users'));
const Roles = async(() => import('../pages/dashboards/Roles/Roles'));

// Routes
const homeRoutes = {
	path: '/',
	name: 'Home Page',
	component: HomePage,
	children: null
};

const dashboardRoutes = {
	path: '/dashboard',
	name: 'Админ панель',
	header: 'Main',
	icon: SlidersIcon,
	containsHome: true,
	redirect: '/dashboard/default',
	children: [
		{
			path: '/dashboard/default',
			name: 'Default',
			component: Default
			// badgeColor: "primary",
			// badgeText: "bage text"
		},
		{
			path: '/dashboard/users',
			name: 'Пользователи',
			component: Users
		},
		{
			path: '/dashboard/roles',
			name: 'Настройка прав',
			component: Roles
		}
	]
};

const pageRoutes = {
	path: '/pages',
	name: 'Pages',
	icon: LayoutIcon,
	children: [
		{
			path: '/pages/profile',
			name: 'Profile',
			component: Profile
		}
	]
};

const authRoutes = {
	path: '/auth',
	name: 'Auth',
	icon: UsersIcon,
	badgeColor: 'secondary',
	badgeText: '12/24',
	children: [
		{
			path: '/auth/sign-in',
			name: 'Sign In',
			component: SignIn
		},
		{
			path: '/auth/sign-up',
			name: 'Sign Up',
			component: SignUp
		}
	]
};

const errorRoutes = {
	path: '*',
	name: 'NotFound',
	component: ErrorPage,
	error: {
		title: 'Page not found.',
		message: 'The page you are looking for might have been removed.',
		status: '404'
	}
};

// Dashboard specific routes
export const dashboard = [
	dashboardRoutes,
	pageRoutes
	// layoutRoutes,
];

// Landing specific routes
export const home = [homeRoutes];

// Auth specific routes
export const page = [authRoutes];

export const error = [errorRoutes];

// All routes
export default [
	dashboardRoutes,
	pageRoutes,
	errorRoutes
	// authRoutes,
	// layoutRoutes
];
