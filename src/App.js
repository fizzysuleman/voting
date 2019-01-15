import React, {Component} from 'react';
import Register from './Register';
import Successful from './Components/Successful';
import Login from './Components/Login';
import Card from './Components/Card';
import {Route, BrowserRouter} from 'react-router-dom';
import Result from './Components/Result';
import RegisterAspirants from './Components/RegisterAspirants';
import SuccessfulApplicant from './Components/SuccessfulApplicant';
import './App.css';
import LoginAdmin from './Components/LoginAdmin';
import AuthenticatedComponent from './Components/AuthenticatedComponent';
import AppLayout from './Components/AppLayout';
import LandingPage from './Components/LandingPage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path="/registeraspirants"
            component={RegisterAspirants}
          />
          <Route path="/Successful" component={Successful} />
          <Route path="/Successful1" component={SuccessfulApplicant} />
          <Route path="/Card" component={Card} />
          <Route path="/Login" component={Login} />
          <Route path="/LoginAdmin" component={LoginAdmin} />
          <Route path="/result" component={Result} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/Register" component={Register} />
          <AuthenticatedComponent component={AppLayout} path="/" />
        </div>
      </BrowserRouter>
    );
  }
}
