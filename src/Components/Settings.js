import React, {Component} from 'react';
import {Menu, Button, Modal, Header, Icon,Container,Grid,Segment} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import firebaseConf from './Firebase'

class Logout extends Component {
  constructor() {
    super();
    this.state = {isLoading: false, openDisapprovedModal: false,electionStatus:{},registerAspirantStatus:{},registerStatus:{}};
  }
  handleSubmit = () => {
    this.setState({isLoading: true});
    this.props.history.push({pathname: '/login-admin'});
    this.setState({isLoading: false});
    sessionStorage.removeItem('USERNAME')
  };
  handleOpenDisapprovedModal = () => {
    this.setState({openDisapprovedModal: true});
  };

  handleCloseDisapprovedModal = () => {
    this.setState({openDisapprovedModal: false});
  };
  changePassword = () => {
    this.props.history.push({
      pathname: '/change-password',
    });
  };
  handleDisableRegisterAspirant=()=>{
    firebaseConf.database().ref('registerAspirantButton').update({
      type:false
    })
  }
  handleEnableRegisterAspirant=()=>{
    firebaseConf.database().ref('registerAspirantButton').update({
      type:true
    })
  }

  handleDisableElection=()=>{
    firebaseConf.database().ref('election').update({
      type:false
    })
  }
  handleEnableElection=()=>{
    firebaseConf.database().ref('election').update({
      type:true
    })
  }
  handleDisableRegister=()=>{
    firebaseConf.database().ref('registerButton').update({
      type:false
    })
  }
  handleEnableRegister=()=>{
    firebaseConf.database().ref('registerButton').update({
      type:true
    })
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
        <Container centered>
        <Menu>
          <Menu.Item>
                <Button color="blue" onClick={this.handleOpenDisapprovedModal}>
                  Logout
                </Button>
              </Menu.Item>
              <Menu.Item>
              <Button color="blue" onClick={() => this.changePassword()}>
              Change  password
            </Button>
              </Menu.Item>
              <Menu.Item>
              {(electionStatus&&electionStatus.isEnabled===true)&&(<Button  color="red" onClick={this.handleDisableElection}>
              Disable Election process
              </Button> )}
              {(electionStatus&&electionStatus.isEnabled===false)&&(<Button  color="blue" onClick={this.handleEnableElection}>
              Enable Election process
              </Button>)}
              </Menu.Item>
              <Menu.Item>
              {(registerStatus&&registerStatus.isEnabled===true)&&(<Button color="red" onClick={this.handleDisableRegister} >
                  Disable Registration for voters
                </Button>)}
                {(registerStatus&&registerStatus.isEnabled===false)&&(<Button color="blue" onClick={this.handleEnableRegister} >
                  Enable Registration for voters
                </Button>)}
              </Menu.Item>
              <Menu.Item>
              {(registerAspirantStatus&&registerAspirantStatus.isEnabled===true)&&(<Button color="red" onClick={this.handleDisableRegisterAspirant} >
              Disable Registration for aspirants
            </Button>)}
            {(registerAspirantStatus&&registerAspirantStatus.isEnabled===false)&&(<Button color="blue" onClick={this.handleEnableRegisterAspirant} >
              Enable Registration for aspirants
            </Button>)}
              </Menu.Item>
              </Menu>
</Container>



        

        <div>
          <Modal
            open={this.state.openDisapprovedModal}
            onClose={this.handleCloseDisapprovedModal}
            basic
            size="small"
            style={{minHeight: '100vh'}}
          >
            <Header icon="sign-out" content="Logout Confirmation" />
            <Modal.Content>
              <p>Are you sure you want to Logout {this.state.post}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                basic
                color="red"
                inverted
                onClick={this.handleCloseDisapprovedModal}
              >
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={this.handleSubmit}
                loading={this.state.isLoadingisLoading}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(Logout);


