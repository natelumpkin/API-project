import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css'


const LoginForm = () => {

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
    <div className='form-card'>
      <h4>Log in</h4>
      <form onSubmit ={submitForm} className='login-form'>
        <h4>Welcome to NateBnB</h4>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
          <label>Email or username</label>
          <input
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            >
          </input>
        </div>
        <div>
          <label id='password-label'>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            >
          </input>
        </div>
          <button>Log In</button>
      </form>
    </div>
  )
}

export default LoginForm;
