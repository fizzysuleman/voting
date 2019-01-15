import React from 'react'

import {

  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
import CandidateCard from './CandidateCard';

const FixedMenuLayout = () => (
  <div>
    

        <Dropdown >
          <Dropdown.Menu>
            <CandidateCard/>
          </Dropdown.Menu>
        </Dropdown>
          
  
  </div>
)

export default FixedMenuLayout