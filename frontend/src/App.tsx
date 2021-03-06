import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';
import Home from './pages';
import ChatRoom from './components/ChatRoom';
const App = () => {
  return (
    <Router>
      <AppLayout />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Signup /></Route>
        <Route path="/room"><ChatRoom /></Route>
        <Redirect path="*" to="/" />
      </Switch>
  </Router>
  );
};

export default App;