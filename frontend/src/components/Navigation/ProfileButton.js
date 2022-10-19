import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

import LoginFormModal from "../LoginFormModal";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignUpFormPage";

import { logInUser } from "../../store/session";

import './ProfileButton.css'

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  //console.log('show menu variable: ', showMenu)

  const logInDemoUser = () => {
    const demoData = {
      credential: "demouser1",
      password: "password"
    }
    dispatch(logInUser(demoData));
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logOutUser());
    setShowLoginModal(false);
    setShowSignUpModal(false);
    history.push('/')
  };

  if (user) {
    return (
      <>

        <div id="profile-button" className={showMenu ? "flex menu-open" : "flex"} onClick={() => setShowMenu(!showMenu)}>

          <i className="fa-solid fa-bars menu"></i>
          <i className="fa-solid fa-circle-user profile"></i>
          {showMenu && (
          <ul className="profile-dropdown">
            {/* <li>{user.username}</li>
            <li>{user.email}</li> */}
            <li id="host-button">
              <Link to="/create-a-spot">
                <button>Host Your Home</button>
              </Link>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
          )}
        </div>


    </>
    )
  } else {
    return (
      <>
      <div id="profile-button" className={showMenu ? "flex menu-open" : "flex"} onClick={openMenu}>

        <i className="fa-solid fa-bars menu"></i>
        <i className="fa-solid fa-circle-user profile"></i>

        {showMenu && (
          <ul className="profile-dropdown">
            <li>
              <button onClick={() => setShowLoginModal(true)}>Log In</button>
            </li>
            <li>
              <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>
            </li>
            <li>
              <button onClick={() => logInDemoUser()}>Login as Demo User</button>
            </li>
          </ul>
          )}

      </div>

      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      )}
      {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
    )
  }

  // return (
  //   <>
  //     <button onClick={openMenu}>
  //       <div>
  //       <i className="fa-solid fa-user"></i>
  //       </div>
  //     </button>
  //     {showMenu && (
  //       <ul className="profile-dropdown">
  //         {user && (
  //           <>
  //             <li>{user.username}</li>
  //             <li>{user.email}</li>
  //           </>
  //         )}
  //         {!user && (
  //           <>
  //             <li>
  //               <Link to="/signup"><button>Sign Up</button></Link>
  //             </li>
  //             <li>
  //               <LoginFormModal/>
  //             </li>
  //           </>
  //         )}
  //         {user && (
  //           <>
  //             <li>
  //               <Link to="/create-a-spot">
  //                 <button>Host Your Home</button>
  //               </Link>
  //             </li>
  //             <li>
  //               <button onClick={logout}>Log Out</button>
  //             </li>
  //           </>
  //         )}
  //       </ul>
  //     )}
  //   </>
  // );
}

export default ProfileButton;
