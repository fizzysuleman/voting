import React, {Component} from 'react';
import {Tab} from 'semantic-ui-react';

import AddPost from './AddPost';

import RemovePosts from './RemovePosts';
import Applicants from './Applicants';
import Voters from './Voters';
import Result from './Result';
import Logout from './Logout';

const panes = [
  {menuItem: 'Add Posts', render: () => <AddPost />},
  {menuItem: 'Remove Posts', render: () => <RemovePosts />},
  {menuItem: 'Applicants', render: () => <Applicants />},
  {menuItem: 'Voters', render: () => <Voters />},
  {menuItem: 'Results', render: () => <Result />},
  {menuItem: 'Logout', render: () => <Logout />},
];
class TabExamplePointing extends Component {
  render() {
    return (
      <div>
        <h1>Admin</h1>
        <Tab menu={{pointing: true, secondary: true}} panes={panes} />
      </div>
    );
  }
}

export default TabExamplePointing;
