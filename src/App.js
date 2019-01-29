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
import firebaseConf from './Components/Firebase'

export default class App extends Component {
  constructor(){
    super()
    this.state={
      electionStatus:{},
      registerStatus:{},
      registerAspirantStatus:{}
    }
  }
  componentDidMount(){
    this.fetchElectionButton()
    this.fetchRegisterAspirantButton()
    this.fetchRegisterButton()
  }
  fetchElectionButton=()=>{
    firebaseConf.database().ref('election').on('value',snapshot=>{
      const electionStatus={}
      snapshot.forEach(data=>{
          Object.assign(electionStatus,{"isEnabled": data.val()})
        })
        this.setState({electionStatus})
      })
      
    }
    fetchRegisterButton=()=>{
      firebaseConf.database().ref('registerButton').on('value',snapshot=>{
        const registerStatus={}
        snapshot.forEach(data=>{
          Object.assign(registerStatus,{"isEnabled": data.val()})
          
          })
         this.setState({registerStatus})
        })
        }
        fetchRegisterAspirantButton=()=>{
          firebaseConf.database().ref('registerAspirantButton').on('value',snapshot=>{
            const registerAspirantStatus={}
            snapshot.forEach(data=>{
              Object.assign(registerAspirantStatus,{"isEnabled": data.val()})
             
             
              })
               this.setState({registerAspirantStatus})
            })
            
          }
  render() {
    console.log(this.state.electionStatus)
    return (
      <BrowserRouter>
        <Switch>
        {this.state.registerAspirantStatus.isEnabled ?<Route path="/register-aspirants" component={RegisterAspirants} />: <Route path="/home" component={LandingPage} />}
          <Route path="/successful-voter" component={Successful} />
          <Route path="/successful-aspirants" component={SuccessfulApplicant} />
          {this.state.electionStatus.isEnabled ?<Route path="/login" component={Login} />: <Route path="/home" component={LandingPage} />}
          <Route path="/login-admin" component={LoginAdmin} />
          <Route path="/result" component={Result} />
          <Route exact path="/home" component={LandingPage} />
          {this.state.registerStatus.isEnabled ?<Route path="/register" component={Register} />: <Route path="/home" component={LandingPage} />}
          <AuthenticatedComponent component={AppLayout} path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
