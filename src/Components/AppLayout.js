import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import TopGrid from './TopGrid';
import Election from './Election';
import {Switch} from 'react-router';
import Admin from './Admin';
import ChangePost from './ChangePost';
import ChangePassword from './ChangePassword';
import SuccessfulApplicant from './SuccessfulApplicant';
import Successful from './Successful';

class AuthenticatedComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route path="/election" component={Election} /> */}
          <Route exact path="/admin" component={Admin} />
          <Route path="/change" component={ChangePost} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/Successful" component={Successful} />
          <Route path="/Successful1" component={SuccessfulApplicant} />
        </Switch>
      </div>
    );
  }
}

export default AuthenticatedComponent;
