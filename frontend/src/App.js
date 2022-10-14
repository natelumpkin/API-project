import { Route } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Route path='/login'>
      <LoginFormPage />
    </Route>
  );
}

export default App;
