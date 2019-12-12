import async from "../components/Async";

import {
  Layout as LayoutIcon,
  // Monitor as MonitorIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon,
} from "react-feather";

// Landing
import HomePage from "../pages/home/HomePage";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
// import ResetPassword from "../pages/auth/ResetPassword";

// Layouts
// import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";

// Pages
import Profile from "../pages/pages/Profile";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const Users = async(() => import("../pages/dashboards/Users"));



// Routes
const homeRoutes = {
  path: "/",
  name: "Home Page",
  component: HomePage,
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Админ панель",
  header: "Main",
  icon: SlidersIcon,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      component: Default,
      // badgeColor: "primary",
      // badgeText: "bage text"
    },
    {
      path: "/dashboard/users",
      name: "Пользователи",
      component: Users,
    },
   
  ]
};

const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: LayoutIcon,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile
    },
  ]
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "12/24",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  pageRoutes,
  // layoutRoutes,
];

// Landing specific routes
export const home = [homeRoutes];

// Auth specific routes
export const page = [authRoutes];

// All routes
export default [
  dashboardRoutes,
  pageRoutes,
  // authRoutes,
  // layoutRoutes
];