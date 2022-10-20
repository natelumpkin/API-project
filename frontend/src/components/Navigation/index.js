// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
//import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

import fancyLogo from '../../images/fancy-n-logo.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  return (
    <div className='flex navbar'>
      <div className='flex center mini-navbar'>
        <div>
          <NavLink exact to="/"><img className='logo' src={fancyLogo}/></NavLink>
        </div>
        <div>
          <ProfileButton user={sessionUser}/>
        </div>
            {/* {isLoaded && sessionLinks} */}
      </div>
    </div>
  );
}

export default Navigation;
