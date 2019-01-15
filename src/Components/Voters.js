import React, {Component} from 'react';
import {Table, Header, Button, Container, Modal, Icon} from 'semantic-ui-react';

import firebaseConf from './Firebase';

class VotersTable extends Component {
  constructor() {
    super();
    this.state = {
      votersData: [],
      isLoading: false,
      openDisapprovedModal: false,
      userId: '',
    };
  }
  openRemove = (id, fullName) => {
    this.setState({userId: id});
    this.setState({fullName});
    this.handleOpenDisapprovedModal();
  };

  removeVoter = userId => {
    this.setState({isLoading: true});
    const voterRef = firebaseConf.database().ref(`/voters/${userId}`);
    voterRef.remove().then(() => {
      this.setState({isLoading: false});
      this.handleCloseDisapprovedModal();
    });
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
      .ref('voters')
      .on('value', snapshot => {
        const votersData = [];
        snapshot.forEach(data => {
          const votersNew = {
            uid: data.key,
            fullName: data.val().fullName,
            teacher: data.val().teacher,
            class: data.val().category + ' ' + data.val().section,
            id: data.val().id,
          };

          votersData.push(votersNew);
          this.setState({votersData});
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
                <Table.HeaderCell>Class</Table.HeaderCell>
                <Table.HeaderCell>Class teacher</Table.HeaderCell>
                <Table.HeaderCell>Voters id</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.votersData.map(voter => (
                <Table.Row key={voter.uid}>
                  <Table.Cell>
                    <Header as="h4">
                      <Header.Content style={{color: 'white'}}>
                        {voter.fullName}
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{voter.class}</Table.Cell>
                  <Table.Cell>{voter.teacher}</Table.Cell>
                  <Table.Cell>{voter.id}</Table.Cell>
                  <Table.Cell>
                    <Button
                      basic
                      color="red"
                      onClick={() => {
                        this.openRemove(voter.uid, voter.fullName);
                      }}
                    >
                      Remove
                    </Button>
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
                onClick={() => this.removeVoter(this.state.userId)}
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

export default VotersTable;
