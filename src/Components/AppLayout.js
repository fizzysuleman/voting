import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import TopGrid from './TopGrid';
import Election from './Election';
import {Switch} from 'react-router';
import Admin from './Admin';
import ChangePost from './ChangePost';
import ChangePassword from './ChangePassword';


class AuthenticatedComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route path="/election" component={Election} /> */}
          <Route exact path="/admin" component={Admin} />
          <Route path="/change" component={ChangePost} />
          <Route path="/change-password" component={ChangePassword} />
          
        </Switch>
      </div>
    );
  }
}

export default AuthenticatedComponent;
