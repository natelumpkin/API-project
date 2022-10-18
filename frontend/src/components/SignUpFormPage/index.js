import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignUpForm.css'

function SignupFormPage() {
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
      <h4>Sign Up</h4>
      <form className='login-form' onSubmit={handleSubmit}>
        <h4>Welcome to NateBnB</h4>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
