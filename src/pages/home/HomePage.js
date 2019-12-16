import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { enableClassicTheme } from "../../redux/actions/themeActions";
// import { authInit } from "../../redux/actions/authActions";

import { Col, Container, Row } from 'reactstrap';

// import brandReact from "../../assets/img/brands/react.svg";

const Intro = () => (
	<section className="landing-intro pt-6 pt-xl-7">
		<Container>
			<p>Home page</p>
			<Row>
				<Col md="12" lg="9" xl="11" className="mx-auto">
					<Link to="/dashboard">
						<p>Dashboard</p>
					</Link>
				</Col>
			</Row>
		</Container>
	</section>
);

/* const Footer = () => (
  <section className="py-5">
    <Container className="text-center">
      <h2 className="mb-0">
        Trusted by over 2500+ customers world wide
        <a
          href="https://themes.getbootstrap.com/product/appstack-responsive-admin-template/"
          target="_blank"
          rel="noopener noreferrer"
          className="align-middle btn btn-primary btn-lg ml-2 mt-n1"
        >
          Buy now
        </a>
      </h2>
    </Container>
  </section>
); */

class HomePage extends React.Component {
	componentWillMount() {
		// const { dispatch } = this.props;
		// dispatch(enableClassicTheme());
		// dispatch(authInit());
	}

	render() {
		return (
			<>
				<Intro />
				{/* <Footer /> */}
			</>
		);
	}
}

export default connect()(HomePage);
