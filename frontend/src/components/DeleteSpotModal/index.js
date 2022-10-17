import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal';

import { deleteSpotById } from '../../store/spot';

//import DeleteForm from './DeleteForm';

const DeleteSpotModal = ({spotId}) => {
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  //console.log(showModal);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {

    dispatch(deleteSpotById(spotId))
    history.push('/')
  }

  return (
    <>
      <span onClick={() => setShowModal(true)}>Deactivate Listing</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <div>

            </div>
            <h1>One last step</h1>
            <h4>Listing deactivation is permanent—so if you want to keep your info, you should not deactivate your listing.</h4>
            <h4>You’ll lose your listing details</h4>
            <input
              type="checkbox"
              value={checked}
              onChange={() => setChecked(!checked)}
              checked={checked ? true : false}
              />
            <span>I understand that I’ll no longer have access to my listing and listing information.</span>
            <div>
              <Link onClick={() => setShowModal(false)}>Back</Link>
              <button
                onClick={handleSubmit}
                disabled={checked ? false : true}>Permanently Deactivate</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default DeleteSpotModal;
