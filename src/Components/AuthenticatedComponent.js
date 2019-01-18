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
  let adminKey = localStorage.getItem('USERNAME');
  let voterKey = localStorage.getItem('VOTERID');
  
  if (adminKey){
    return adminKey ? (
      <AppLayout />
    ) : (
      <Redirect to={{pathname: '/LoginAdmin', state: {from: props.location}}} />
    );
  }
  
 if (voterKey){
    return voterKey ? (
      <ElectionLayout/>
    ) : (
      <Redirect to={{pathname: '/Login', state: {from: props.location}}} />
    );
  }

  if (!!voterKey===false || !!adminKey===false){
    return (
      <Redirect to={{pathname: '/home', state: {from: props.location}}} />
    );
  }
  
  
  

};

export default AuthenticatedComponent;
