import React, {Component} from 'react';
import {Table, Container, Button, Modal, Icon, Header} from 'semantic-ui-react';
import firebaseConf from './Firebase';
import Offline from 'react-detect-offline';

class TableExampleSelectableInvertedRow extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      openDisapprovedModal: false,
      userId: '',
      isLoading: false,
    };
  }

  openRemove = (id, post) => {
    this.setState({userId: id});
    this.setState({post});
    this.handleOpenDisapprovedModal();
  };
  removePost = userId => {
    this.setState({isLoading: true});
    const removeRef = firebaseConf.database().ref(`/posts/${userId}`);
    removeRef.remove().then(() => {
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
    firebaseConf
      .database()
      .ref('posts')
      .orderByChild('post')
      .on('value', snapshot => {
        const posts = [];
        snapshot.forEach(data => {
          const postNew = {id: data.key, post: data.val().post};
          posts.push(postNew);
          this.setState({posts: posts});
        });
      });
  }

  render() {
    const {posts, isLoading, openDisapprovedModal} = this.state;
    return (
      <div>
        <Container>
          <Table collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="right">Post</Table.HeaderCell>
                <Table.HeaderCell> </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {posts.map(postes => (
                <Table.Row key={postes.id}>
                  <Table.Cell>{postes.post} </Table.Cell>
                  <Table.Cell>
                    <Button
                      basic
                      color="red"
                      onClick={() => {
                        this.openRemove(postes.id, postes.post);
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
              <p>Are you sure you want to remove {this.state.post}</p>
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
                onClick={() => this.removePost(this.state.userId)}
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

export default TableExampleSelectableInvertedRow;
