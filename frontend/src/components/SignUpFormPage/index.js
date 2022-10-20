import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignUpForm.css'

function SignupFormPage({setShowSignUpModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);
    if (password === confirmPassword) {
      setErrors([]);
      let response = await dispatch(sessionActions.signUpNewUser({ email, firstName, lastName, username, password }))
      console.log('response.errors: ', response.errors);
      let errorMessages = [];
      if (response && response.errors) {
        for (let error in response.errors) {
          errorMessages.push(response.errors[error])
        }
        setErrors(errorMessages);
        console.log('errors: ', errors);
        return;
      }
        // .catch(async (res) => {
        //   const data = await res.json();
        //   let errorMessages = [];
        //   if (data && data.errors) {
        //     for (let error in data.errors) {
        //       errorMessages.push(data.errors[error])
        //     }
        //     setErrors(errorMessages);
        //   }
        // });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signup-form-card'>
      <div className="signup-exit-holder">
        <div className="halfwidth flex">
        <div className="circle signup">
        <i id="exit-reviews" className="fa-solid fa-xmark" onClick={() => setShowSignUpModal(false)}></i>
        </div>
        <h4>Sign Up</h4>
        </div>
      </div>
      <div className="signup-form-holder">
      <form className='signup-form' onSubmit={handleSubmit}>
        <h4 className="signup-title">Welcome to NateBnB</h4>
        <div className="signup-exterior">
          <div className="input">
        <label className='location-label' htmlFor="email">
          Email
        </label>
          <input
          className='signup-input'
          id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>
        <div className="input">
        <label className='location-label' htmlFor="firstName">
          First Name
          </label>
          <input
          className='signup-input'
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

        </div>
        <div className="input">
        <label className='location-label' htmlFor="lastName">
          Last Name
          </label>
          <input
          className='signup-input'
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

        </div>
        <div className="input">
        <label className='location-label' htmlFor="username">
          Username
          </label>
          <input
          className='signup-input'
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        </div>
        <div className="input">
        <label className='location-label' htmlFor="password">
          Password
          </label>
          <input
          className='signup-input'
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>
        <div className="input confirm">
        <label className='location-label' htmlFor="confirmPassword">
          Confirm Password
          </label>
          <input
          className='signup-input'
          id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

        </div>
        </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="signup-button-holder">
        <button className="signup-button" type="submit">Sign Up</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
