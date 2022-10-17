import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import SpotReviews from './SpotReviews';


function SpotReviewsModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotReviews />
        </Modal>
      )}
    </>
  );
}

export default SpotReviewsModal;
