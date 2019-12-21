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

const ItemModal = ({
	isOpen,
	itemModalToggle,
	itemsNames:{itemsNameMult2},
	submitItem,
	itemsSaving,
	itemData,
	isInitialMount
}) => {
	const initialItemFormData = {
		id: null,
		type: '1',
		last_name: '',
		first_name: '',
		second_name: '',
		email: '',
		password: '',
		login: '',
		role_id: 0
	}

	const [itemFormData, setFormData] = useState(initialItemFormData);
	// const [userData, setUserData] = useState(defaultUserData);

	
	// const maxToggle = () => setMaxItems(!maxItemsOpen);

	// -------Form Models--------
	const handleLastNameChange = event => {
		const value = event.target.value;
		setFormData( prevState => ({ ...prevState, last_name: value }) );
	};
	const handleFirstNameChange = event => {
		const value = event.target.value;
		setFormData( prevState => ({ ...prevState, first_name: value }) );
	};
	const handleSecondNameChange = event => {
		const value = event.target.value;
		setFormData( prevState => ({ ...prevState, second_name: value }) );
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
			console.log('Modal Update: ', itemData);
			setFormData(itemData);
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
        		<Label sm={3} className="text-sm-right uppercase">Фамилия</Label>
	        	<Col sm={7}>
	        		<AvField 
	        			name="user_last_name"
	        			required
	        			bsSize="lg"
	        			type="text"
	        			placeholder="Фамилия"
	        			value={itemFormData.last_name}
	        			onChange={handleLastNameChange}
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
	        			onChange={handleFirstNameChange}
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
	        			onChange={handleSecondNameChange}
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
	        			onChange={handleFirstNameChange}
	        		/>
	        	</Col>
        	</Row>

          <FormGroup row>
            {/*<Col sm={{ size: 10, offset: 2 }} className=>*/}
            <Col sm={4} className="ml-auto">
            	<Button color="gray-400" onClick={itemModalToggle}>Отменить</Button>

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
	itemData: PropTypes.object.isRequired
};

export { ItemModal };
