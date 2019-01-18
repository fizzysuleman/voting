import React, {Component} from 'react';
import {Table, Header, Image, Button, Icon, Modal} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import firebaseConf from './Firebase';

class TableExampleSelectableInvertedRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsData: [],
      isLoading: false,
      openDisapprovedModal: false,
      aKey:'',
      userId: '',
      
      basic: true,
      buttonContent: 'Approved',
      aspirant: [],
    };
  }

  openDisapprove = (id,aspirantKey, fullName) => {
    this.setState({userId: id});
    this.setState({aKey: aspirantKey});
    this.setState({fullName});
    this.handleOpenDisapprovedModal();
  };

  removeItem = (userId,aKey) => {
    this.setState({isLoading: true});
    console.log(aKey)
    const itemRef = firebaseConf.database().ref(`/posts/${userId}/aspirants/${aKey}`);
    itemRef.remove().then(() => {
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
  
  changePost = (post,lastName,firstName, id,aspirantKey,section,reason,todo,imageUrl) => {
    this.props.history.push({
      pathname: '/change',
      state: {post,lastName, firstName, id,aspirantKey,section,reason,todo,imageUrl},
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
    const {postsData, isLoading, openDisapprovedModal, aspirant} = this.state;
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
                      src={item.imageUrl.downloadURL ? item.imageUrl : ''}
                      rounded
                      size="mini"
                    />
                    <Header.Content style={{color: 'white'}}>
                      {item.lastName+' '+item.firstName}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{item.prefectName}</Table.Cell>
                <Table.Cell>{item.section}</Table.Cell>
                <Table.Cell>{item.schoolId}</Table.Cell>
                <Table.Cell>{item.reason}</Table.Cell>
                <Table.Cell>{item.todo}</Table.Cell>
                <Table.Cell>
                  <Button basic={this.state.basic} color="green">
                    {this.state.buttonContent}
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() =>
                      this.openDisapprove(item.prefectId,item.aspirantKey, (item.lastName+' '+item.firstName))
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
                        (item.lastName),
                        (item.firstName),
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
                onClick={() => this.removeItem(this.state.userId,this.state.aKey)}
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
export default withRouter(TableExampleSelectableInvertedRow);
