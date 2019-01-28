import React, {Component} from 'react';
import Register from './Register';

import Login from './Components/Login';
import {Route, BrowserRouter} from 'react-router-dom';
import Result from './Components/Result';
import RegisterAspirants from './Components/RegisterAspirants';
import SuccessfulApplicant from './Components/SuccessfulApplicant';
import Successful from './Components/Successful';
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
          <Route path="/register-aspirants" component={RegisterAspirants} />
          <Route path="/successful-voter" component={Successful} />
          <Route path="/successful-aspirants" component={SuccessfulApplicant} />
          <Route path="/login" component={Login} />
          <Route path="/login-admin" component={LoginAdmin} />
          <Route path="/result" component={Result} />
          <Route exact path="/home" component={LandingPage} />
          <Route path="/register" component={Register} />
          <AuthenticatedComponent component={AppLayout} path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
