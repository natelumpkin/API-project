import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';

import DeleteForm from './DeleteForm';
import './DeleteSpotModal.css';

const DeleteSpotModal = ({spotId}) => {
  const [showModal, setShowModal] = useState(false);

  if (showModal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    }
  })

  return (
    <>
      <div className='publish-button delete' onClick={() => setShowModal(true)}>Deactivate Listing</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteForm spotId={spotId} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  )
}

export default DeleteSpotModal;
