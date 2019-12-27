import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { findItemBy } from 'helpers'
import isEmpty from 'lodash.isempty';
import { findItemBy } from 'helpers'
import { initialRulesFormData } from 'constants/global';

import { 
	Button,
	Col,
	Row,
	CustomInput,
	Modal,
	ModalBody,
	ModalHeader,
	FormGroup,
	Label,
	Spinner,
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
	rolesList,
	ruleTypes,
	userTypesList
}) => {

	const initialItemFormData = {
		id: null,
		type: 1,
		last_name: 'asd',
		first_name: 'asd',
		second_name: 'asd',
		email: '1asd@asd.com',
		password: '123123',
		login: '',
		role_id: '',
		rules: []
	}

	const [itemFormData, setFormData] = useState(initialItemFormData);
	// const [userData, setUserData] = useState(defaultUserData);
	const [rulesFormData, setRulesFormData] = useState(initialRulesFormData);
	
	const setUpRulesFormData = data => {
		let newRulesState = Object.assign([], initialRulesFormData)
		let rules = Object.assign([], data.rules)

		for (let i = 0; i < rules.length; i++) {
			let {item, index} = findItemBy('ruleType', rules[i].ruleType, newRulesState, true);
			if (item) {
				newRulesState[index] = rules[i];
			}
		}
		// console.log(newRulesState)
		setRulesFormData(newRulesState)
	}
	
	const getCheckboxValue = data => {
		let rule = findItemBy('ruleType', data.type, rulesFormData);
		if (rule) {
			return rule[data.prop];
		}
		throw new Error('error in code');
		// return;
	}
	// -------Form Models--------

	const handleFieldChange = data => {
		const { prop, val } = data;
		setFormData( prevState => ({ ...prevState, [prop]: val }) );
	};
	const handleIntFieldChange = data => {
		data.val = +data.val;

		handleFieldChange(data);
	};
	const handleTypeFieldChange = event => {
		const val = +event.target.value;
		setFormData( prevState => 
			({ ...prevState, type: val, role_id: '' }) 
		);
	};

	const handleRuleChange = data => {
		setRulesFormData(prevState => {
			// console.log(prevState)
			let newRulesState = Object.assign([], prevState);
			let {item, index} = findItemBy('ruleType', data.type, newRulesState, true);
			if (item) {
				let isChecked = item[data.prop];
				newRulesState[index][data.prop] = !isChecked;
			}
			return [...newRulesState];
		})
	};

	/*const prepareFormData = data => {
		let formData = Object.assign({}, data);
		
		for (let prop in formData) {
			let value = formData[prop];
			if (value) {
				if (typeof value !== 'boolean' && !isNaN(+value) ) { formData[prop] = +formData[prop] }
			} else {
				if (typeof value !== 'boolean') { delete formData[prop] }
			}
		}
		
		return formData;
	};*/

	const handleSubmit = () => {
		// let formData = prepareFormData(itemFormData)		
		let stateCopy = Object.assign({}, itemFormData);
		
		if (!stateCopy.company_id) delete stateCopy.company_id;

		let formData;
		if (stateCopy.type === 1) formData = { ...stateCopy, rules: rulesFormData }
		else {
			delete stateCopy.rules;
			formData = stateCopy;
		}
		// console.log('submit: ', formData)
		
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
				// console.log('Modal Update: ', itemData);
			if (!isEmpty(itemData)) {
				const role_id = itemData.role ? itemData.role.id : '';
				let data = { ...itemData, role_id:role_id, role:null, password: '' };

				if (itemData.role) {
					data.rules = itemData.role.rules || [];
				}

				setFormData(data);
				setUpRulesFormData(data);		
			} else {
				setFormData(initialItemFormData);
				setUpRulesFormData(initialItemFormData);		
			}
		}
	}, [itemData]);

	useEffect(() => {
		if (!isInitialMount) {
			let item = findItemBy('id', itemFormData.role_id, rolesList);

			if (item && item.rules.length) {
				setUpRulesFormData({rules:item.rules});		
			}
			
		}
	}, [itemFormData.role_id])

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
					
					{rolesList.length && itemFormData.type === 1 ? (
						<Row>
							<Label sm={3} className="text-sm-right uppercase">Роль</Label>
							<Col sm={7}>
								<AvField
								  type="select"
								  name="user_role"
									bsSize="lg"
								  placeholder="Выберите роль"
								  value={itemFormData.role_id}
								  onChange={(e) => {handleIntFieldChange({prop:'role_id', val:e.target.value})} }
								  // helpMessage="Idk, this is an example. Deal with it!"
								>	
									<option value="" disabled>Выберите роль</option>
									{ rolesList.map((role, roleIx) => {
											if (!role.is_default) {
									  		return (<option key={'role-'+role.id} value={role.id}>{role.name}</option>)
											} else return null;
										}
									)}
								</AvField>
							</Col>
						</Row>
					) : null}
					<hr/>

					{itemFormData.type === 1 && (
						<div>
							<h4>Права</h4>
							{ ruleTypes.map((type, typeIndex) => (
							  <FormGroup row key={'rule_type-'+type.ruleType}>
							    <Label sm={3} className="text-sm-right pt-sm-0 uppercase"><strong>{type.name}</strong></Label>
							    <Col sm={9}>
							      <CustomInput inline
							        type="checkbox"
							        id={`create-${type.ruleType}`}
							        checked={getCheckboxValue({type:type.ruleType, prop:'create'})}
							        onChange={()=>handleRuleChange({prop:'create', type:type.ruleType})}
							        label="Создание"/>
							      <CustomInput inline
							        type="checkbox"
							        id={`update-${type.ruleType}`}
							        checked={getCheckboxValue({type:type.ruleType, prop:'update'})}
							        onChange={()=>handleRuleChange({prop:'update', type:type.ruleType})}
							        label="Редактирование"/>
							      <CustomInput inline
							        type="checkbox"
							        id={`delete-${type.ruleType}`}
							        checked={getCheckboxValue({type:type.ruleType, prop:'delete'})}
							        onChange={()=>handleRuleChange({prop:'delete', type:type.ruleType})}
							        label="Удаление"/>
							      <CustomInput inline
							        type="checkbox"
							        id={`view-${type.ruleType}`}
							        checked={getCheckboxValue({type:type.ruleType, prop:'view'})}
							        onChange={()=>handleRuleChange({prop:'view', type:type.ruleType})}
							        label="Просмотр"/>
							    </Col>
							  </FormGroup>)
							)}
						</div>
					)}
					
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

		</Modal>
	);
};

ItemModal.defaultProps = {
	itemsNames: { itemsNameMult2: 'Элементов' },
	itemData: {}
};

ItemModal.propTypes = {
	itemsNames: PropTypes.shape({
		itemsNameMult2: PropTypes.string
	}),
	isOpen: PropTypes.bool.isRequired,
	itemModalToggle: PropTypes.func.isRequired,
	submitItem: PropTypes.func.isRequired,
	itemsSaving: PropTypes.bool.isRequired,
	itemData: PropTypes.object,
	rolesList: PropTypes.array.isRequired,
	ruleTypes: PropTypes.array.isRequired,
};

export { ItemModal };
