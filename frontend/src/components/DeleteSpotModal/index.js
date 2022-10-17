import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import DeleteForm from './DeleteForm';

const DeleteSpotModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span onClick={() => setShowModal(true)}>Deactivate Listing</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteForm />
        </Modal>
      )}
    </>
  )
}

export default DeleteSpotModal;
