import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';


const LoginFormPage = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.logInUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        console.log('data: ', data)
        if (data && data.message) setErrors([data.message]);
      });
    }

  if (sessionUser) {
    return (
      <Redirect to='/'/>
    )
  }



  return (
    <form onSubmit ={submitForm}>
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
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required>
        </input>
      </div>
      <button>Log In</button>
    </form>
  )
}

export default LoginFormPage;
