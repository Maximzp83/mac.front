import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { findItemBy } from 'helpers'

import { 
	Button,
	Col,
	Row,
	// CustomInput,
	Modal,
	ModalBody,
	ModalHeader,
	FormGroup,
	Label,
	Spinner
} from 'reactstrap';

import { AvForm, AvField } from 'availity-reactstrap-validation';

// ========================
const ItemModal = ({
	isOpen,
	itemModalToggle,
	itemsNames:{itemsNameMult2},
	submitItem,
	itemsSaving,
	itemData,
	isInitialMount,
	rolesList
}) => {

	const userTypesList = [
		{ id: 1, name: 'Внутренний' },
		{ id: 2, name: 'Внешний' },
	]

	const initialItemFormData = {
		id: null,
		type: 1,
		last_name: '',
		first_name: '',
		second_name: '',
		email: '',
		password: '',
		login: '',
		role_id: ''
	}

	const [itemFormData, setFormData] = useState(initialItemFormData);
	// const [userData, setUserData] = useState(defaultUserData);

	
	// const maxToggle = () => setMaxItems(!maxItemsOpen);

	// -------Form Models--------

	const handleFieldChange = data => {
		const { prop, val } = data;
		setFormData( prevState => ({ ...prevState, [prop]: val }) );
	};
	const handleTypeFieldChange = event => {
		const val = event.target.value;

		setFormData( prevState => 
			({ ...prevState, type: val, role_id: '' }) 
		);
	};	

	const handleSubmit = () => {
		let formData = Object.assign({}, itemFormData); 
		// let formData = { ...stateCopy, rules: rulesFormData }
		// console.log(formData)
		submitItem(formData);
	};
	/*const handleItemsMetaChange = value => {
		if (maxItems !== value) {
			changeItemsMeta({ filterName: 'maxItems', val: value });
		}
	};*/

	// ===== Watch =======
	useEffect(() => {
		if (!isInitialMount) {
			const role_id = itemData.role ? itemData.role.id : '';
			const data = { ...itemData, role_id:role_id, role:null, password: '' }
			console.log('Modal Update: ', data);

			setFormData(data);
		}
	}, [itemData]);

	return (
		<Modal size="lg"
			isOpen={isOpen}
			toggle={itemModalToggle}>
			<ModalHeader>
				<span className="h2">Создание/редактирование {itemsNameMult2}</span>
			</ModalHeader>
			<ModalBody className="m-3">
				<AvForm onValidSubmit={handleSubmit}>
					<Row>
						<Label sm={3} className="text-sm-right uppercase">Тип пользователя</Label>
						<Col sm={7}>
							<AvField required
							  type="select"
							  name="user_type"
							  bsSize="lg"
							  placeholder="Выберите тип"
							  value={itemFormData.type}
							  onChange={handleTypeFieldChange}
							  // helpMessage="Idk, this is an example. Deal with it!"
							>
							{ userTypesList.map(type => 
								(<option key={'type-'+type.id} value={type.id}>{type.name}</option>)
							)}
							</AvField>
						</Col>
					</Row>
					<Row>
						<Label sm={3} className="text-sm-right uppercase">Фамилия</Label>
						<Col sm={7}>
							<AvField 
								name="user_last_name"
								required
								bsSize="lg"
								type="text"
								placeholder="Фамилия"
								value={itemFormData.last_name}
								onChange={(e) => {handleFieldChange({prop:'last_name', val:e.target.value})} }
							/>
						</Col>
					</Row>

					<Row>
						<Label sm={3} className="text-sm-right uppercase">Имя</Label>
						<Col sm={7}>
							<AvField 
								name="user_first_name"
								required
								bsSize="lg"
								type="text"
								placeholder="Имя"
								value={itemFormData.first_name}
								onChange={(e) => {handleFieldChange({prop:'first_name', val:e.target.value})} }
							/>
						</Col>
					</Row>

					<Row>
						<Label sm={3} className="text-sm-right uppercase">Отчество</Label>
						<Col sm={7}>
							<AvField 
								name="user_second_name"
								required
								bsSize="lg"
								type="text"
								placeholder="Отчество"
								value={itemFormData.second_name}
								onChange={(e) => {handleFieldChange({prop:'second_name', val:e.target.value})} }
							/>
						</Col>
					</Row>

					<Row>
						<Label sm={3} className="text-sm-right uppercase">Email</Label>
						<Col sm={7}>
							<AvField 
								name="user_email"
								required
								bsSize="lg"
								type="email"
								placeholder="Имя"
								value={itemFormData.email}
								onChange={(e) => {handleFieldChange({prop:'email', val:e.target.value})} }
							/>
						</Col>
					</Row>

					<Row>
						<Label sm={3} className="text-sm-right uppercase">Пароль</Label>
						<Col sm={7}>
							<AvField 
								name="user_password"
								required
								bsSize="lg"
								type="password"
								placeholder="Пароль"
								value={itemFormData.password}
								onChange={(e) => {handleFieldChange({prop:'password', val:e.target.value})} }
							/>
						</Col>
					</Row>

					<Row>
						<Label sm={3} className="text-sm-right uppercase">Логин</Label>
						<Col sm={7}>
							<AvField 
								name="user_login"
								bsSize="lg"
								type="text"
								placeholder="логин"
								value={itemFormData.login}
								onChange={(e) => {handleFieldChange({prop:'login', val:e.target.value})} }
							/>
						</Col>
					</Row>

					<Row>
						<Label sm={3} className="text-sm-right uppercase">Роль</Label>
						<Col sm={7}>
							<AvField disabled={!rolesList.length || itemFormData.type !== 1}
							  type="select"
							  name="user_company"
								bsSize="lg"
							  placeholder="Выберите компанию"
							  value={itemFormData.role_id}
							  onChange={(e) => {handleFieldChange({prop:'role_id', val:e.target.value})} }
							  // helpMessage="Idk, this is an example. Deal with it!"
							>	
								<option value="" disabled>Выберите роль</option>
								{ rolesList.map((role, roleIx) =>
								  (<option key={'role-'+role.id} value={role.id}>{role.name}</option>)
								)}
							</AvField>
						</Col>
					</Row>

					<FormGroup row>
						{/*<Col sm={{ size: 10, offset: 2 }} className=>*/}
						<Col sm={10} className="d-flex">
							<Button className="ml-auto" color="gray-400" onClick={itemModalToggle}>Отменить</Button>

							<Button color="tertiary" size="lg" disabled={itemsSaving} type="submit">
								{itemsSaving && <Spinner size="sm" color="#fff" />}
								{!itemsSaving && <span>Сохранить</span>}
							</Button>
						</Col>
					</FormGroup>
				</AvForm>
			</ModalBody>

			{/*<ModalFooter>
				
			</ModalFooter>*/}
		</Modal>
	);
};

ItemModal.defaultProps = {
	itemsNames: { itemsNameMult2: 'Элементов' }
};

ItemModal.propTypes = {
	itemsNames: PropTypes.shape({
		itemsNameMult2: PropTypes.string
	}),
	isOpen: PropTypes.bool.isRequired,
	itemModalToggle: PropTypes.func.isRequired,
	submitItem: PropTypes.func.isRequired,
	itemsSaving: PropTypes.bool.isRequired,
	itemData: PropTypes.object.isRequired,
	rolesList: PropTypes.array.isRequired
};

export { ItemModal };
