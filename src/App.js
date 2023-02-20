import { UserContextProvider } from './contexts/user';
import { Home } from './pages';
// import { Route } from 'react-router-dom';

function App() {

  console.log(' Key  : ', process.env.API_KEY)

  return (
    <UserContextProvider>
      {/* <Route path='/home' > */}
      <Home />
      {/* </Route> */}
    </UserContextProvider>
  );
}

export default App;
