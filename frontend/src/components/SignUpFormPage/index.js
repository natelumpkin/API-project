import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (sessionUser) return <Redirect to="/" />;

  const signupErrors = () => {
    const signupErrors = []
    if (!email.length) signupErrors.push('Email is required')
    if (email.length > 256) signupErrors.push('Email must be under 256 characters')
    if (!firstName.length) signupErrors.push('First name is required')
    if (!lastName.length) signupErrors.push('Last name is required')
    if (!username.length) signupErrors.push('Username is required')
    if (username.length && username.length < 4) signupErrors.push('Username must be 4 or more characters')
    if (username.length && username.length > 30) signupErrors.push('Username must be 30 characters or less')
    if (!password.length) signupErrors.push('Password is required')
    if (password.length && password.length < 6) signupErrors.push('Password must be 6 or more characters')
    if (!confirmPassword.length) signupErrors.push('Please confirm your password')
    if (password !== confirmPassword) signupErrors.push('Password and confirmation do not match')
    return signupErrors;
  }


  const reset = () => {
    setEmail("")
    setUsername("")
    setFirstName("")
    setLastName("")
    setPassword("")
    setConfirmPassword("")
    setErrors([])
    setShowSignUpModal(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errArr = signupErrors();

    //console.log(errArr);
    //setErrors(errArr);
    //console.log(errors);
    // setErrors(signupErrors);
    //console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      setErrors(['Password and password confirmation must match']);
      return;
    }
    if (password === confirmPassword) {
      setErrors([]);
      //setErrors(errArr);
      let response = await dispatch(sessionActions.signUpNewUser({ email, firstName, lastName, username, password }))
      console.log('response: ', response);
      //let errorMessages = [];
      if (response && response.errors) {
        for (let error in response.errors) {

          if ((response.errors[error]) === 'Invalid email.') {
            //errors.push('Invalid email')
            //setErrors(errors.concat(['Invalid email']))
            errArr.unshift('Invalid email')
          }
          if ((response.errors[error]) === 'User with that username already exists') {
            errArr.unshift('User with that username already exists')
          }

          if ((response.errors[error]) === 'User with that email already exists') {

            errArr.unshift('User with that email already exists')
          }
        }
        setErrors(errArr);
        //console.log('errors: ', errors);
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
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }
    return reset();
  };

  return (
    <div className='signup-form-card'>
      <div className="signup-exit-holder">
        <div className="halfwidth flex">
        <div onClick={() => setShowSignUpModal(false)} className="circle signup">
        <i id="exit-reviews" className="fa-solid fa-xmark" ></i>
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
