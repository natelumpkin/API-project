// Packages
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Thunks
import { getCurrentUser } from './store/session';

// Components
import LoginFormPage from './components/LoginFormPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getCurrentUser());
      // .then(setIsLoaded(true));
  },[dispatch])

  return (
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
