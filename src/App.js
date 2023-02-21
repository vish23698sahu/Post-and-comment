import { UserContextProvider } from './contexts/user';
import { Home } from './pages';
// import { Route } from 'react-router-dom';

function App() {
  return (
    <UserContextProvider>
      {/* <Route path='/home' > */}
      <Home />
      {/* </Route> */}
    </UserContextProvider>
  );
}

export default App;
