import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import TopGrid from './TopGrid';
import Election from './Election';
import {Switch, Redirect} from 'react-router';
import Admin from './Admin';
import AppLayout from './AppLayout';
import Login from './Login';

// import {history} from 'react-router-dom';

const AuthenticatedComponent = props => {
  let userKey = localStorage.getItem('USERNAME');
  return userKey ? (
    <AppLayout />
  ) : (
    <Redirect to={{pathname: '/LoginAdmin', state: {from: props.location}}} />
  );
};

export default AuthenticatedComponent;
