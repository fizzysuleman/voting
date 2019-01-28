import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import TopGrid from './TopGrid';
import Election from './Election';
import {Switch, Redirect} from 'react-router';
import Admin from './Admin';
import AppLayout from './AppLayout';
import Login from './Login';
import LandingPage from './LandingPage';
import ElectionLayout from './ElectionLayout';


// import {history} from 'react-router-dom';

const AuthenticatedComponent = (props) => {
  let adminKey = sessionStorage.getItem('USERNAME');
  let voterKey = sessionStorage.getItem('VOTERID');
  
  if (adminKey){
    return adminKey ? (
      <AppLayout />
    ) : (
      <Redirect to={{pathname: '/login-admin', state: {from: props.location}}} />
    );
  }
  
 if (voterKey){
    return voterKey ? (
      <ElectionLayout/>
    ) : (
      <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    );
  }

  if (!!voterKey===false || !!adminKey===false){
    return (
      <Redirect to={{pathname: '/home', state: {from: props.location}}} />
    );
  }
  
  
  

};

export default AuthenticatedComponent;
