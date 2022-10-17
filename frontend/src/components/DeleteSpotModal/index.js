import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import DeleteForm from './DeleteForm';

const DeleteSpotModal = ({spotId}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span onClick={() => setShowModal(true)}>Deactivate Listing</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteForm spotId={spotId} />
        </Modal>
      )}
    </>
  )
}

export default DeleteSpotModal;
