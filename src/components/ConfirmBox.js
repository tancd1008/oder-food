import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ConfirmBox = ({ show, message, onConfirm, onCancel }) => {
  const modalRef = useRef(null)
  return (
    <Modal ref={modalRef} isOpen={show} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>Xác nhận xóa</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button color="danger" onClick={onConfirm}>
          Xác nhận
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmBox