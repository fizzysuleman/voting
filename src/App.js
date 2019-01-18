import React, {Component} from 'react';
import Register from './Register';

import Login from './Components/Login';
import Card from './Components/Card';
import {Route, BrowserRouter} from 'react-router-dom';
import Result from './Components/Result';
import RegisterAspirants from './Components/RegisterAspirants';

import './App.css';
import LoginAdmin from './Components/LoginAdmin';
import AuthenticatedComponent from './Components/AuthenticatedComponent';
import AppLayout from './Components/AppLayout';
import LandingPage from './Components/LandingPage';
import Switch from 'react-router/Switch';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            
            path="/registeraspirants"
            component={RegisterAspirants}
          />

          <Route path="/Card" component={Card} />
          <Route path="/Login" component={Login} />
          <Route path="/LoginAdmin" component={LoginAdmin} />
          <Route path="/result" component={Result} />
          <Route exact path="/home" component={LandingPage} />
          <Route path="/Register" component={Register} />
          <AuthenticatedComponent component={AppLayout} path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
