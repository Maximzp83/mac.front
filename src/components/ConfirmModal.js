import React from 'react';

import {
	Button, 
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter
} from 'reactstrap';

const ConfirmModal = ({ isOpen, onClose, title, message}) => {

	const handleCancel = () => {
		onClose(false);
		// confirmModalToggle(false)
	};
	const handleOk = () => {
		onClose(true);
		// confirmModalToggle(true)
	};

	// console.log(confirmModalToggle)

	return (
			// toggle={confirmModalToggle}>
		<Modal size="sm"
			isOpen={isOpen}>
			<ModalHeader>
			  <span className="h4">{title}</span>
			</ModalHeader>
			<ModalBody className="m-3">
				<p>{message}</p>
			</ModalBody>

			<ModalFooter>
		    <Button color="gray-400" onClick={handleCancel}>Отменить</Button>

		    <Button color="danger" size="lg" onClick={handleOk}>
		    	<span>Удалить</span>
		    </Button>
			</ModalFooter>
		</Modal>
	)
}

ConfirmModal.defaultProps = {
	title: 'Подтверждение удаления.',
	message: 'Вы действительно хотите удалить элемент?'
};

export { ConfirmModal }