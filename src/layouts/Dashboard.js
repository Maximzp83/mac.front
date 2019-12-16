import React from 'react';

/*import {
  Wrapper,
  Sidebar,
  Main,
  Navbar,
  Content
} from '../components';*/
import Wrapper from '../components/Wrapper';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
// import Footer from "../components/Footer";
// import Settings from "../components/Settings";

const Dashboard = ({ children }) => (
	<>
		<Wrapper>
			<Sidebar />
			<Main className="main">
				<Navbar />
				<Content>{children}</Content>
				{/* <Footer /> */}
			</Main>
		</Wrapper>
	</>
);

export default Dashboard;
