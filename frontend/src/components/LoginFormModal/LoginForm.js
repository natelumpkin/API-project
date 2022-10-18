import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css'


const LoginForm = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors([]);
    const response = await dispatch(sessionActions.logInUser({ credential, password }));
    if (response && response.message) return setErrors([response.message]);
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.message) setErrors([data.message]);
      // });
    }

  return (
    <div className='form-card'>
      <h4>Please enter login information :)</h4>
      <form onSubmit ={submitForm} className='login-form'>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
          <label>Credential</label>
          <input
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required>
          </input>
        </div>
        <div>
          <label id='password-label'>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required>
          </input>
        </div>
          <button>Log In</button>
      </form>
    </div>
  )
}

export default LoginForm;
