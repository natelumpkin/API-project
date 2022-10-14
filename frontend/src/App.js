// Packages
import { Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Thunks
import { getCurrentUser } from './store/session';

// Components
import SignupFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    console.log('use effect 1 in App.js is running')
    dispatch(getCurrentUser())
    setIsLoaded(true);
  },[dispatch]);

  console.log('isLoaded', isLoaded)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
    )}
    </>
  );
}

export default App;
