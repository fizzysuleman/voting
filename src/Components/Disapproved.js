import React, {Component} from 'react';
import {Table, Header, Image, Button, Icon, Modal,Popup} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import firebaseConf from './Firebase';
import HeaderContent from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderContent';

class TableExampleSelectableInvertedRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsData: [],
      isLoading: false,
      openDisapprovedModal: false,
      aKey: '',
      userId: '',
      aspirant: [],
      modalOpen: false,
      modalProfileOpen:false
    };
  }
  // item.prefectId,
  // item.aspirantKey,
  // item.lastName,
  // item.firstName,
  // item.prefectName,
  // item.section,
  // item.schoolId,
  // item.reason,
  // item.todo,
  // item.imageUrl
  openDisapprove = (id, aspirantKey, lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl) => {
    this.setState({userId: id,aspirantKey, lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl});
   
   
    this.handleOpenDisapprovedModal();
  };

  approveItem = (userId, aspirantKey, lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl) => {
    this.setState({isLoading: true});
    
    const itemRef = firebaseConf
      .database()
      .ref(`/posts/${userId}/aspirants/`);
    itemRef.child(`${aspirantKey}`).set({
      firstName: firstName,
      lastName: lastName,
      prefectName: prefectName,
      prefectId:userId,
      reason: reason,
      section: section,
      todo: todo,
      imageUrl: imageUrl,
      schoolId: schoolId,
    }).then(() => {
      firebaseConf.database().ref(`disapprovedAspirants/${aspirantKey}`).remove()
      this.setState({isLoading: false});
      this.handleCloseDisapprovedModal();
    });
  };

  openProfile = (id,aspirantKey,lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl) => {
    this.setState({ userId: id,aKey: aspirantKey,lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl,})
    this.handleProfileOpen()
  };
  handleProfileOpen = () => this.setState({modalProfileOpen: true});

  handleProfileClose = () => this.setState({modalProfileOpen: false});


  openReason=(prefectName,lastName,firstName,reasonDisapproval)=>{
    this.setState({prefectName,lastName,firstName,reasonDisapproval})
    this.handleOpen()
  }
  handleOpen = () => {
    this.setState({modalOpen: true});
  };

  handleClose = () => {
    this.setState({modalOpen: false});
  };
  handleOpenDisapprovedModal = () => {
    this.setState({openDisapprovedModal: true});
  };

  handleCloseDisapprovedModal = () => {
    this.setState({openDisapprovedModal: false});
  };

  changePost = (
    post,
    lastName,
    firstName,
    id,
    aspirantKey,
    section,
    reason,
    todo,
    imageUrl
  ) => {
    this.props.history.push({
      pathname: '/change',
      state: {
        post,
        lastName,
        firstName,
        id,
        aspirantKey,
        section,
        reason,
        todo,
        imageUrl,
      },
    });
  };

  componentDidMount() {
    this.fetchAspirantsdata();
  }

  fetchAspirantsdata = () => {
    firebaseConf
      .database()
      .ref('disapprovedAspirants')
      .orderByChild('prefectName')
      .on('value', snapshot => {
        const postsData = [];
        snapshot.forEach(data => {
          postsData.push({
            firstName: data.val().firstName,
            lastName: data.val().lastName,
            prefectId: data.val().prefectId,
            imageUrl: data.val().imageUrl,
            prefectName: data.val().prefectName,
            reason: data.val().reason,
            schoolId: data.val().schoolId,
            section: data.val().section,
            todo: data.val().todo,
            aspirantKey:data.key,
            reasonDisapproval:data.val().reasonDisapproval
          });
        });

        this.setState({postsData: postsData});
      });
  };

  render() {
    const {postsData, isLoading, openDisapprovedModal, aspirant,aspirantKey, lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl} = this.state;
    return (
      <div>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Fullname</Table.HeaderCell>
              <Table.HeaderCell>Post</Table.HeaderCell>
              <Table.HeaderCell>Class(SS2)</Table.HeaderCell>
              <Table.HeaderCell>School ID</Table.HeaderCell>
              <Table.HeaderCell>
                Reason want to become a Prefect
              </Table.HeaderCell>
              <Table.HeaderCell>
                What would do if put in that post
              </Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {postsData.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Header as="h4">
                    <Image
                      src={item.imageUrl ? item.imageUrl.downloadURL:''}
                      rounded
                      size="mini"
                    />
                    <Header.Content style={{color: 'white'}}>
                      {item.lastName + ' ' + item.firstName}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{item.prefectName}</Table.Cell>
                <Table.Cell>{item.section}</Table.Cell>
                <Table.Cell>{item.schoolId}</Table.Cell>
                <Table.Cell>{item.reason}</Table.Cell>
                <Table.Cell>{item.todo}</Table.Cell>
                <Table.Cell>
                  <Button
                    basic
                    color="green"
                    onClick={() =>
                      this.openDisapprove(
                        item.prefectId,
                        item.aspirantKey,
                        item.lastName,
                        item.firstName,
                        item.prefectName,
                        item.section,
                        item.schoolId,
                        item.reason,
                        item.todo,
                        item.imageUrl
                      )
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    basic
                    color="blue"
                    onClick={() =>
                      this.openReason(
                        item.prefectName,
                        item.lastName,
                        item.firstName,
                        item.reasonDisapproval
                      )
                    }
                  >
                    Reason for disapproval
                  </Button>
                  <Popup trigger={<Button primary icon='eye'onClick={() =>
                        this.openProfile(
                          item.prefectId,
                          item.aspirantKey,
                          item.lastName,
                          item.firstName,
                          item.prefectName,
                          item.section,
                          item.schoolId,
                          item.reason,
                          item.todo,
                          item.imageUrl
                        )
                      } />} content='View details' />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Image src={this.state.img} rounded size="mini" />
        {/* .............................................................................................................................................. */}
        {/* .............................................................................................................................................. */}
        {/* .............................................................................................................................................. */}

        <div>
          <Modal
            open={openDisapprovedModal}
            onClose={this.handleCloseDisapprovedModal}
            basic
            size="small"
            style={{minHeight: '100vh'}}
          >
            <Header icon="check circle" content="Approval Confirmation" />
            <Modal.Content>
              <p>Are you sure you want to approve {this.state.firstName+' '+this.state.lastName}</p>
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
                onClick={() =>
                  this.approveItem(this.state.userId,aspirantKey, lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl)
                }
                loading={isLoading}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div>
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header>
              The reason for the disapproval of {this.state.lastName+' '+this.state.firstName} as an aspirant of {this.state.prefectName} is ...
              </Header>
            <Modal.Content>
              <h2 style={{color:'white'}}>
{this.state.reasonDisapproval}
              </h2>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={this.handleClose} inverted>
                <Icon name="checkmark" /> Got it
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div>
        <Modal
            open={this.state.modalProfileOpen}
            onClose={this.handleProfileClose}
            basic
            size="small"
          >
            <Modal.Header>{this.state.lastName+' '+this.state.firstName}</Modal.Header>
            <Modal.Content image>
              <Image
                wrapped
                size="medium"
                src={this.state.imageUrl?this.state.imageUrl.downloadURL:''}
              />
              <Modal.Description>
                <Header style={{color:'white'}}>SchoolID: {this.state.schoolId}</Header>
                <p>
                 <b>Reason for applying to become a prefect:</b>{'   '+this.state.reason}
                </p>
                <p><b>What would you do if you get there:</b>{'   '+this.state.todo}</p>
                <p><b>Class:</b> SS2{'   '+this.state.section}</p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={this.handleProfileClose} >
                <Icon name="checkmark" /> Got it
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  }
}
export default withRouter(TableExampleSelectableInvertedRow);
