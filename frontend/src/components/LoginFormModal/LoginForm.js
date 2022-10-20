import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css'


const LoginForm = ({setShowLoginModal}) => {

  //console.log('LOGIN FORM IS TRYING TO RENDER')

  const dispatch = useDispatch();
  //const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors([]);
    const response = await dispatch(sessionActions.logInUser({ credential, password }));
    //console.log(response);
    let errorMessages = [];
    if (response.message === "Invalid credentials") errorMessages.push('Invalid credentials')
    if (response && response.errors) {
      for (let error in response.errors) {
        errorMessages.push(response.errors[error])
      }
    }
    setErrors(errorMessages);
      //console.log('errors: ', errors);
      return;
    }

  return (
    <div className='login-form-card'>
      <div className="signup-exit-holder">
        <div className="halfwidth flex">
        <div className="circle signup">
        <i id="exit-reviews" className="fa-solid fa-xmark" onClick={() => setShowLoginModal(false)}></i>
        </div>
        <h4>Log In</h4>
        </div>
      </div>
      <div className='login-form-holder'>
      <form className='login-form' onSubmit ={submitForm}>
        <h4 className='login-title'>Welcome to NateBnB</h4>
        <div className='login-exterior'>
        <div className='input'>
          <label className='location-label'>Email or username</label>
          <input
          className='login-input'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            >
          </input>
        </div>
        <div className='input confirm'>
          <label className='location-label' id='password-label'>Password</label>
          <input
          className='login-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            >
          </input>
        </div>
        </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='login-button-holder'>
          <button className='login-button'>Log In</button>
          </div>
      </form>
      </div>
    </div>
  )
}

export default LoginForm;
