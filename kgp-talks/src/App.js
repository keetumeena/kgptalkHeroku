import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Errorpage from './components/errorpage';
import { createContext, useReducer, useState } from 'react';
import { initialState, reducer } from './reducer/useReducer';
import Logout from './components/logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const UserContext = createContext();
export const ToastNotif = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const notifysuccess = (text) => toast.success(text,{
    position: "top-center",
    toastId: "customIdsuccess"
  });
  const notifyerror = (text) => toast.error(text,{
    position: "top-center",
    toastId: "customIderror"
  });
  const Routing = () => {
    return (
    <>
    <ToastNotif.Provider value={{notifysuccess, notifyerror}}>
      <Switch>
        <Route exact path="/">
          <Dashboard/>
        </Route>
        <Route path="/signin">
          <Signin/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/logout">
          <Logout/>
        </Route>
        <Route path="*">
          <Errorpage />
        </Route>
      </Switch>
        </ToastNotif.Provider>
      </>
    )
  }

  return (
    <Router>
      <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Navbar />
        <div className="content">
            <Routing/>
        </div>
      </div>
      </UserContext.Provider>
      <ToastContainer/>
    </Router>
  );
}

export default App;
