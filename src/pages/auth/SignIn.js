import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push as routerPush } from 'react-router-redux';

// import { Link } from "react-router-dom";

import { toastr } from 'react-redux-toastr';

import {
	Button,
	Card,
	CardBody,
	// Form,
	FormGroup,
	// Label,
	// Input,
	// CustomInput,
	Spinner
} from 'reactstrap';

import { AvForm, AvField } from 'availity-reactstrap-validation';
import { signIn } from '../../redux/actions/authActions';

// import avatar from "../../assets/img/avatars/avatar.jpg";

const SignIn = () => {
	// console.log('ok')
	const dispatch = useDispatch();

	const [email, setEmail] = useState('Keeley50@yahoo.com');
	const [password, setPass] = useState('');

	const { authLoading, isAuthenticated, authUser } = useSelector(state => {
		// console.log(state);
		return state.auth;
	});

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}
	function handlePassChange(e) {
		setPass(e.target.value);
	}

	const handleSubmit = () => {
		// console.log('ok')
		dispatch(signIn({ email, password }))
			.then(response => {
				// console.log('ok ', response)
				toastr.success('', `Вы вошли как ${response.user.name}`);
				dispatch(routerPush('/dashboard/default'));
			})
			.catch(error => {
				toastr.error('Ошибка', error.message);
			});
	};

	return (
		<div>
			<div className="text-center mt-4">
				<h2>Hello {isAuthenticated ? authUser.first_name : 'Guest'}</h2>
				<p className="lead">Sign in to your account to continue</p>
			</div>

			<Card>
				<CardBody>
					<div className="m-sm-4">
						{/* <div className="text-center">
              <img
                src={avatar}
                alt="Chris Wood"
                className="img-fluid rounded-circle"
                width="132"
                height="132"
              />
            </div> */}
						{/* <Form> */}
						{/* <AvForm onSubmit={() => dispatch(signIn({name, password}))}> */}

						<AvForm onValidSubmit={handleSubmit}>
							<FormGroup>
								<AvField
									name="email"
									label="Email"
									required
									bsSize="lg"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={handleEmailChange}
								/>
							</FormGroup>
							<FormGroup>
								<AvField
									name="password"
									label="Password"
									required
									bsSize="lg"
									type="password"
									placeholder="Enter your password"
									value={password}
									onChange={handlePassChange}
								/>
								{/* <small>
                  <Link to="/auth/reset-password">Forgot password?</Link>
                </small> */}
							</FormGroup>
							{/* <div>
                <CustomInput
                  type="checkbox"
                  id="rememberMe"
                  label="Remember me next time"
                  defaultChecked
                />
              </div> */}
							<FormGroup>
								<div className="text-center mt-3">
									{/* <p>authLoading: { authLoading ? 'true' : 'false' }</p> */}
									{/* <Button>submit</Button>
                    onClick={() => dispatch(signIn({name, password}))}> */}

									<Button
										color="primary"
										size="lg"
										disabled={authLoading}
										type="submit"
									>
										{authLoading && <Spinner size="sm" color="#fff" />}
										{!authLoading && <span>Sign in</span>}
									</Button>
								</div>
							</FormGroup>
						</AvForm>

						{/* </Form> */}
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default SignIn;
