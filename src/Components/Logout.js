import React, {Component} from 'react';
import {Form, Button, Modal, Header, Icon} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

class Logout extends Component {
  constructor() {
    super();
    this.state = {isLoading: false, openDisapprovedModal: false};
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
  // disableElection=()=>{

  // }
  render() {
    return (
      <div>
        <Form>
          <Form.Field
            control={Button}
            type="submit"
            onClick={this.handleOpenDisapprovedModal}
            color="blue"
          >
            Logout!
          </Form.Field>
          <Form.Field
            control={Button}
            type="submit"
            onClick={() => this.changePassword()}
            color='red'
          >
            Change Admin Password
          </Form.Field>
          <Form.Field
            control={Button}
            type="submit"
            // onClick={() => this.changePassword()}
            color='green'
          >
          Disable Election process
          </Form.Field>
          <Form.Field
            control={Button}
            type="submit"
            // onClick={() => this.changePassword()}
            color='yellow'
          >
          Disable Registration of aspirants
          </Form.Field>
          <Form.Field
            control={Button}
            type="submit"
            // onClick={() => this.changePassword()}
            
          >
          Disable Registration of Voters 
          </Form.Field>
        </Form>
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
