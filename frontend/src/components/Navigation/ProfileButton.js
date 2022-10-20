import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

//import LoginFormModal from "../LoginFormModal";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignUpFormPage";

import { logInUser } from "../../store/session";

import './ProfileButton.css'

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.session.user)

  console.log('userInfo', userInfo)

  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  //console.log('show menu variable: ', showMenu)

  // if (showLoginModal) {
  //   document.body.style.overflow = 'hidden'
  // } else {
  //   document.body.style.overflow = 'unset'
  // }

  useEffect(() => {
    if (showSignUpModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  },[showSignUpModal])

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
            <li id="username-splash">
              <button>Welcome, {userInfo.firstName}!</button>
            </li>
            <Link to="/create-a-spot">
            <li id="host-button">

                <button>Host Your Home</button>

            </li>
            </Link>
            <li onClick={logout}>
              <button >Log Out</button>
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
            <li onClick={() => setShowLoginModal(true)} >
              <button >Log In</button>
            </li>
            <li onClick={() => setShowSignUpModal(true)}>
              <button >Sign Up</button>
            </li>
            <li onClick={() => logInDemoUser()}>
              <button >Login as Demo User</button>
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
