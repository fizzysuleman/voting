import React, {Component} from 'react';
import {
  Table,
  Header,
  Image,
  Button,
  Icon,
  Modal,
  Form,
  TextArea,
  Popup
} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import firebaseConf from './Firebase';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

class TableExampleSelectableInvertedRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsData: [],
      isLoading: false,
      openDisapprovedModal: false,
      aKey: '',
      userId: '',
      firstName: '',
      lastName: '',
      prefectName: '',
      reasonDisapproval: '',
      section: '',
      schoolId: '',
      reson: '',
      todo: '',
      imageUrl: '',
      basic: true,
      buttonContent: 'Approved',
      aspirant: [],
      modalOpen: false,
    };
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  openProfile = (id,aspirantKey,lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl) => {
    this.setState({ userId: id,aKey: aspirantKey,lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl,})
    this.handleOpen()
  };
  handleOpen = () => this.setState({modalOpen: true});

  handleClose = () => this.setState({modalOpen: false});

  openDisapprove = (id,aspirantKey,lastName,firstName,prefectName,section,schoolId,reason,todo,imageUrl ) => {
    this.setState({
      userId: id,
      aKey: aspirantKey,
      lastName,
      firstName,
      prefectName,
      section,
      schoolId,
      reason,
      todo,
      imageUrl,
    });

    this.handleOpenDisapprovedModal();
  };

  removeItem = (
    userId,
    aKey,
    lastName,
    firstName,
    prefectName,
    section,
    schoolId,
    reason,
    todo,
    imageUrl
  ) => {
    this.setState({isLoading: true});
    console.log(aKey);
    const disapproveRef = firebaseConf.database().ref(`disapprovedAspirants`);

    disapproveRef
      .child(`${aKey}`)
      .set({
        firstName: firstName,
        lastName: lastName,
        prefectName: prefectName,
        prefectId: userId,
        reason: reason,
        section: section,
        todo: todo,
        imageUrl: imageUrl,
        schoolId: schoolId,
        reasonDisapproval: this.state.reasonDisapproval,
      })

      .then(() => {
        const itemRef = firebaseConf
          .database()
          .ref(`/posts/${userId}/aspirants/${aKey}`);
        itemRef.remove().then(() => {
          this.setState({isLoading: false});
          this.handleCloseDisapprovedModal();
          this.setState({reasonDisapproval: ''});
        });
      });
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
      .ref('posts')
      .orderByChild('post')
      .on('value', snapshot => {
        const postsData = [];
        snapshot.forEach(data => {
          postsData.push({
            aspirants: Object.entries(
              data.val().aspirants ? data.val().aspirants : []
            ).map(e => Object.assign(e[1], {aspirantKey: e[0]})),
          });
        });

        this.setState({postsData: postsData});
        //trying to get the items in the in aspirants
        let newData = postsData.filter(item => {
          return item.aspirants.length > 0;
        });

        let finalData = newData.map(item => {
          return item.aspirants;
        });
        //joining all the arrays together
        let finalFinalData = finalData.reduce((a, b) => {
          return a.concat(b);
        }, []);

        this.setState({aspirant: finalFinalData});
        console.log(this.state.aspirant);
      });
  };

  render() {
    const {
      postsData,
      isLoading,
      openDisapprovedModal,
      reasonDisapproval,
      aspirant,
      userId,
      aKey,
      firstName,
      lastName,
      schoolId,
      section,
      reason,
      imageUrl,
      prefectId,
      prefectName,
      todo,
    } = this.state;
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
            {aspirant.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Header as="h4">
                    <Image
                      src={item.imageUrl ? item.imageUrl.downloadURL:''}
                      rounded
                      size="mini"
                    />
                    <Header.Content
                      style={{color: 'white',}}

                      onClick={() =>
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
                      }
                    >
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
                    color="red"
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
                    Disapprove
                  </Button>
                  <Button
                    basic
                    color="yellow"
                    onClick={() =>
                      this.changePost(
                        item.prefectName,
                        item.lastName,
                        item.firstName,
                        item.prefectId,
                        item.aspirantKey,
                        item.section,
                        item.reason,
                        item.todo,
                        item.imageUrl.downloadURL
                      )
                    }
                  >
                    Change Post
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
            <Header icon="user delete" content="Removal Confirmation" />
            <Modal.Content>
              <p>
                Are you sure you want to remove{' '}
                {this.state.lastName + ' ' + this.state.firstName}
              </p>
              <Segment inverted>
                <Form>
                  {' '}
                  <Form.Field
                    onChange={this.handleChange}
                    control={TextArea}
                    label="Reason for disapproval"
                    placeholder="What is the reason for wanting to the disapprove this aspirant"
                    name="reasonDisapproval"
                    value={reasonDisapproval}
                  />
                </Form>
              </Segment>
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
                disabled={!reasonDisapproval}
                color="green"
                onClick={() =>
                  this.removeItem(
                    userId,
                    aKey,
                    lastName,
                    firstName,
                    prefectName,
                    section,
                    schoolId ? schoolId : '',
                    reason,
                    todo,
                    imageUrl
                  )
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
            <Modal.Header>{this.state.lastName+' '+this.state.firstName}</Modal.Header>
            <Modal.Content image>
              <Image
                wrapped
                size="medium"
                src={this.state.imageUrl.downloadURL}
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
              <Button color="green" onClick={this.handleClose} >
                <Icon name="checkmark" /> Got it
              </Button>
            </Modal.Actions>
          </Modal>
          )
        </div>
      </div>
    );
  }
}
export default withRouter(TableExampleSelectableInvertedRow);
