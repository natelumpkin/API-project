// Packages
import { Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Thunks
import { getCurrentUser } from './store/session';

// Components
import SignupFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import SpotDetails from './components/SpotDetails';
import CreateSpotPage from './components/CreateSpotPage';
import UpdateSpotForm from './components/UserSpotDetails/UpdateSpotForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getCurrentUser())
    setIsLoaded(true);
  },[dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/spots/:spotId/edit'>
          <UpdateSpotForm />
        </Route>
        <Route path='/spots/:spotId'>
          <SpotDetails />
        </Route>
        <Route path='/create-a-spot'>
          <CreateSpotPage/>
        </Route>
        <Route>
          404 Page Not Found
        </Route>
      </Switch>
    )}
    </>
  );
}

export default App;
