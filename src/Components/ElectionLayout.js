import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Election from './Election';
import {Switch} from 'react-router';


class AuthenticatedComponent extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/election" component={Election} />

        </Switch>
      </div>
    );
  }
}

export default AuthenticatedComponent;
