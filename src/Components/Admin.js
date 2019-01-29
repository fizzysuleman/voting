import React, {Component} from 'react';
import {Tab} from 'semantic-ui-react';

import AddPost from './AddPost';
import Disapproved from './Disapproved'
import RemovePosts from './RemovePosts';
import Applicants from './Applicants';
import Voters from './Voters';
import Result from './Result';
import Settings from './Settings';
import Id from './Id'
import SchoolId from './SchoolId'

const panes = [
  {menuItem: 'Add Posts', render: () => <AddPost />},
  {menuItem: 'Remove Posts', render: () => <RemovePosts />},
  {menuItem: 'Applicants', render: () => <Applicants />},
  {menuItem: 'Disapproved Applicants', render: () => <Disapproved />},
  {menuItem: 'Add ID', render: () => <Id />},
  {menuItem: 'School ID', render: () => <SchoolId />},
  {menuItem: 'Voters', render: () => <Voters />},
  {menuItem: 'Results', render: () => <Result />},
  {menuItem: 'Settings', render: () => <Settings />},
];
class TabExamplePointing extends Component {
  render() {
    return (
      <div>
        <h1>Admin</h1>
        <Tab menu={{pointing: true, secondary: true}} panes={panes}  />
      </div>
    );
  }
}

export default TabExamplePointing;
