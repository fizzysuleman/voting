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
import firebaseConf from './Firebase'

class LandingPage extends Component {
 constructor(){
   super()
   this.state={
    electionStatus:{
      isEnabled:false
    },
    registerAspirantStatus:{
      isEnabled:false
    },
    registerStatus:{
      isEnabled:false
    }
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
    const {electionStatus,registerStatus,registerAspirantStatus}=this.state
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
                {(registerAspirantStatus&&registerAspirantStatus.isEnabled===true)&&(<Button color="yellow" as={Link} to='/register-aspirants'>
                  Register Aspirants
                </Button>)}
                {(registerAspirantStatus&&registerAspirantStatus.isEnabled===false)&&(<Button color="yellow" disabled>
                  Register Aspirants
                </Button>)}
              </Grid.Column>
              <Divider vertical />
              <Grid.Column>
                <Header icon>
                  <Icon name="users" />
                  Register to Vote
                </Header>
                {(registerStatus&&registerStatus.isEnabled===true)&&(<Button color="blue" as={Link} to='/register'>
                  Register Voters
                </Button>)}
                {(registerStatus&&registerStatus.isEnabled===false)&&(<Button color="blue" disabled>
                  Register Voters
                </Button>)}
              </Grid.Column>
              <Divider vertical />
              <Grid.Column>
                <Header icon>
                  <Icon name="erase" />
                  Vote for candidate
                </Header>
                {(electionStatus&&electionStatus.isEnabled===true)&&(<Button color="green" as={Link} to='/login'>
                  Election
                </Button>)}
                {(electionStatus&&electionStatus.isEnabled===false)&&(<Button color="green" disabled>
                  Election
                </Button>)}
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



