import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

const LoginFormModal = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  //console.log('LOGIN FORM MODAL: showModal: ', showLoginModal)

  return (
    <>
      <button onClick={() => setShowLoginModal(true)}>Log In</button>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm/>
        </Modal>
      )}


    </>
  );
}

export default LoginFormModal;
