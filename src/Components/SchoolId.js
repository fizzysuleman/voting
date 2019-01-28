import React, {Component} from 'react';
import {Table, Header, Button, Container, Modal, Icon} from 'semantic-ui-react';

import firebaseConf from './Firebase';

class SchoolId extends Component {
  constructor() {
    super();
    this.state = {
        schoolData: [],
      isLoading: false,
      openDisapprovedModal: false,
      userId: '',
    };
  }
  openRemove = (id, fullName) => {
    this.setState({id});
    this.setState({fullName});
    this.handleOpenDisapprovedModal();
  };

  removeVoter = userId => {
    this.setState({isLoading: true});
    const removeRef = firebaseConf.database().ref(`/school/${userId}`);
    removeRef.remove()
        this.setState({isLoading: false});
      this.handleCloseDisapprovedModal();
   ;
  };
  handleOpenDisapprovedModal = () => {
    this.setState({openDisapprovedModal: true});
  };
  handleCloseDisapprovedModal = () => {
    this.setState({openDisapprovedModal: false});
  };
  componentDidMount() {
    this.fetchVotersData();
  }
  fetchVotersData = () => {
    firebaseConf
      .database()
      .ref('school')
      .orderByChild('fullname')
      .on('value', snapshot => {
        const schoolData = [];
        snapshot.forEach(data => {
          const schoolNew = {
            uid: data.key,
            fullName: data.val().fullname,
            schoolId: data.val().schoolId,
            
          };

          schoolData.push(schoolNew);
          this.setState({schoolData});
        });
      });
  };

  render() {
    const {isLoading, openDisapprovedModal} = this.state;
    return (
      <div>
        <Container>
          <Table celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Fullname</Table.HeaderCell>
                <Table.HeaderCell>School Id</Table.HeaderCell>
                
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.schoolData.map((item,index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content style={{color: 'white'}}>
                        {item.fullName}
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{item.schoolId}</Table.Cell>
                  
                  <Table.Cell>
                    <Button basic color="red"
                    onClick={() =>{
                      this.openRemove(item.uid,
item.fullName )
                    }}>Remove</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
        <div>
          <Modal
            open={openDisapprovedModal}
            onClose={this.handleCloseDisapprovedModal}
            basic
            size="small"
            style={{minHeight: '100vh'}}
          >
            <Header icon="user delete" content="Removal Confirmation" />
            <Modal.Content>
              <p>Are you sure you want to remove {this.state.fullName}</p>
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
                onClick={() => this.removeVoter(this.state.id)}
                loading={isLoading}
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

export default SchoolId;
