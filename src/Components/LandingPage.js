import React, {Component} from 'react';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Container,
  Segment,
} from 'semantic-ui-react';
import Link from 'react-router-dom/Link';

class LandingPage extends Component {
 

  render() {
    return (
      <div>
        <h1>E-voting Application</h1>
        <br />
        <br />
        <br />
        <br />

        <Segment placeholder color="white">
          <Grid columns={4} stackable textAlign="center">
            {/* <Container> */}
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="user circle" />
                  Admin access only
                </Header>
                <Button color="red" as={Link} to='/login-admin'>
                  Admin
                </Button>
              </Grid.Column>
              <Divider vertical />
              <Grid.Column>
                <Header icon>
                  <Icon name="registered" />
                  Register to contest
                </Header>
                <Button color="yellow" as={Link} to='/register-aspirants'>
                  Register Aspirants
                </Button>
              </Grid.Column>
              <Divider vertical />
              <Grid.Column>
                <Header icon>
                  <Icon name="users" />
                  Register to Vote
                </Header>
                <Button color="blue" as={Link} to='/register'>
                  Register Voters
                </Button>
              </Grid.Column>
              <Divider vertical />
              <Grid.Column>
                <Header icon>
                  <Icon name="erase" />
                  Vote for candidate
                </Header>
                <Button color="green" as={Link} to='/login'>
                  Election
                </Button>
              </Grid.Column>
            </Grid.Row>
            {/* </Container> */}
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default LandingPage;
