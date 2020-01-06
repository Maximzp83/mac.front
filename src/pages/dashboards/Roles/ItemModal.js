import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { findItemBy } from 'helpers'
import isEmpty from 'lodash.isempty';

import { initialRulesFormData } from 'constants/global';

import { 
	Button,
	Col,
	CustomInput,
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
	ruleTypes,
	itemsSaving,
	itemData,
	isInitialMount
}) => {
	const initialItemFormData = {
		id: null,
		name: '',
		description: '',
		rules: [],
	}

	const [itemFormData, setFormData] = useState(initialItemFormData);
	const [rulesFormData, setRulesFormData] = useState(initialRulesFormData);
	// const [userData, setUserData] = useState(defaultUserData);

	const setUpRulesFormData = data => {
		let newRulesState = Object.assign([], initialRulesFormData)
		let rules = Object.assign([], data.rules)

		for (let i = 0; i < rules.length; i++) {
			let {item, index} = findItemBy('ruleType', rules[i].ruleType, newRulesState, true);
			if (item) {
				newRulesState[index] = rules[i];
			}
		}

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
	// const maxToggle = () => setMaxItems(!maxItemsOpen);

	// -------Form Models--------
	const handleNameChange = event => {
		const value = event.target.value;
		setFormData(prevState => {
			return { ...prevState, name: value }
		})
	};
	const handleDescriptionChange = event => {
		const value = event.target.value;
		setFormData(prevState => {
			return { ...prevState, description: value }
		})
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

	const handleSubmit = () => {
		let stateCopy = Object.assign({}, itemFormData);
		let formData = { ...stateCopy, rules: rulesFormData }
		delete formData.is_default;
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
		// console.log('Modal Update: ', itemData);
		if (!isInitialMount) {
			let newData;
						
			if (!isEmpty(itemData)) {
				let itemDataCopy = Object.assign({}, itemData)
				newData = itemDataCopy;
			} else {
				newData = {...initialItemFormData};
			}
			setFormData(newData);
			setUpRulesFormData(newData);		
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
        	<FormGroup row>
        		<Label sm={3} className="text-sm-right uppercase"><strong>Группа пользователей</strong></Label>
	        	<Col sm={7}>
	        		<AvField 
	        			name="group_name"
	        			required
	        			bsSize="lg"
	        			type="text"
	        			placeholder="название группы"
	        			value={itemFormData.name}
	        			onChange={handleNameChange}
	        		/>
	        	</Col>
        	</FormGroup>

	      	<FormGroup row>
	      		<Label sm={3} className="text-sm-right uppercase"><strong>Описание</strong></Label>
	        	<Col sm={7}>
	        		<AvField 
	        			name="group_description"
	        			required
	        			bsSize="lg"
	        			type="textarea"
	        			placeholder="описание группы"
	        			value={itemFormData.description}
	        			onChange={handleDescriptionChange}
	        		/>
	        	</Col>
	      	</FormGroup>
	        {ruleTypes.map((type, typeIndex) => (
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
	ruleTypes: PropTypes.array.isRequired,
	itemsSaving: PropTypes.bool.isRequired,
	itemData: PropTypes.object
};

export { ItemModal };
