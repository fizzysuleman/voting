import React, {Component} from 'react';
import {
  Card,
  Icon,
  Image,
  Container,
  Button,
  Accordion,
  Form,
  Label,
  Modal,
  Header
} from 'semantic-ui-react';
import firebaseConf from './Firebase';
import {withRouter} from 'react-router-dom';

class AccordionExampleStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '',
      contestantsPost: [],
      fullName: props.location.state ? props.location.state.correctIdName : '',
      uid:props.location.state ? props.location.state.uid : '',
      haveVoted: [],
      voterId: '',
      openModal: false,
      isLoading:false
    };
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message},
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 4000);
  }

  handleOpenModal = () => {
    this.setState({openModal: true});
  };

  handleCloseModal = () => {
    this.setState({openModal: false});
  };

  handleClick = (e, titleProps) => {
    const {index} = titleProps;
    const {activeIndex} = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({activeIndex: newIndex});
  };

  

  handleFinish = () => {
    sessionStorage.removeItem('VOTERID');
    this.props.history.push({
      pathname: '/login',
    });
    firebaseConf
      .database()
      .ref(`/voters/${this.state.uid}`)
      .update({
        status:'Has Voted'
      });
  };
  componentDidMount() {
    this.fetchAspirantsdata();

    let voterId = sessionStorage.getItem('VOTERID');
    this.setState({voterId});
  }

  handleUnvote = (prefectId, aspirantKey, postIndex, aspirantIndex) => () => {
    const {voterId} = this.state;

    const removeRef = firebaseConf
      .database()
      .ref(`posts/${prefectId}/aspirants/${aspirantKey}/votes/${voterId}`);
    removeRef.remove();

    const removeRef2 = firebaseConf
      .database()
      .ref(`posts/${prefectId}/votes/${voterId}`);
    removeRef2.remove();
    
  };

  handleVote = (prefectId, aspirantKey, postIndex, aspirantIndex) => () => {
    const {voterId} = this.state;
    const itemsRef = firebaseConf
      .database()
      .ref(`posts/${prefectId}/aspirants/${aspirantKey}/votes`);

    itemsRef.child(voterId).set({voterId: voterId});

    const votersRef = firebaseConf.database().ref(`posts/${prefectId}/votes`);

    votersRef
      .child(voterId)
      .set({voterId: voterId})

     
   

  };

  fetchAspirantsdata = () => {
    firebaseConf
      .database()
      .ref('posts')
      .orderByChild('post')
      .on('value', snapshot => {
        const contestantsPost = [];
        snapshot.forEach(data => {
          contestantsPost.push({
            id: data.val().id,
            post: data.val().post,
            votes: data.val().votes,
            aspirants: Object.entries(
              data.val().aspirants ? data.val().aspirants : []
            ).map(e => Object.assign(e[1], {aspirantKey: e[0]})),
          });
          this.setState({contestantsPost});
        });
         //trying to get the items in the in aspirants 
         
      });
  };

  render() {
    const {activeIndex, contestantsPost, voterId} = this.state;

    return (
      <div>
        <h1>Welcome {' ' + this.state.fullName + ', '} Vote wisely!</h1>
        <Container>
          <Accordion styled style={{width: '100%'}}>
            {contestantsPost.map((posts, index) => {
              return (
                <div>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={this.handleClick}
                    key={posts.key}
                  >
                    <Icon name="dropdown" />
                    {(posts.votes && posts.votes[voterId])? <Label color='green' content={posts.post} />: posts.post}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    <Card.Group centered stretched>
                      {posts.aspirants.map((item, i) => (
                        <Card style={{width: '200px', height: '20%'}}>
                          <Image
                            src={item.imageUrl ? item.imageUrl.downloadURL : ''}
                            style={{height: '120px'}}
                          />
                          <Card.Content>
                            <Card.Header>
                              <center>
                                {item.lastName + ' ' + item.firstName}
                              </center>
                            </Card.Header>
                          </Card.Content>
                          <Card.Content extra>
                            <center>
                              {!(item.votes && item.votes[voterId]) && (
                                <Button
                                  color="green"
                                  onClick={this.handleVote(
                                    item.prefectId,
                                    item.aspirantKey,
                                    index,
                                    i
                                  )}
                                  disabled={(posts.votes && posts.votes[voterId])}
                                >
                                  Vote
                                </Button>
                              )}
                              {item.votes && item.votes[voterId] && (
                                <Button
                                  color="red"
                                  onClick={this.handleUnvote(
                                    item.prefectId,
                                    item.aspirantKey,
                                    index,
                                    i
                                  )}
                                >
                                  Unvote
                                </Button>
                              )}
                            </center>
                          </Card.Content>
                        </Card>
                      ))}
                    </Card.Group>
                  </Accordion.Content>
                </div>
              );
            })}
          </Accordion>
          <br />
          <div style={{marginLeft:'50%',marginRight:'50%'}}><Form.Field
            style={{paddingLeft: 'auto', paddingRight: 'auto'}}
            control={Button}
            type="submit"
            color="blue"
            onClick={this.handleOpenModal}
          >
            Finish
          </Form.Field></div>
        </Container>
        <div> 
          <Modal
            open={this.state.openModal}
            onClose={this.handleCloseModal}
            basic
            size="small"
            style={{minHeight: '100vh'}}
          >
            <Header icon="user delete" content="Removal Confirmation" />
            <Modal.Content>
              <p>Are you sure you want to want to end Voting process</p>
              <h4>Note:You cant change your mind after submitting</h4>
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
                onClick={() => this.handleFinish()}
                loading={this.state.isLoading}
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

export default withRouter(AccordionExampleStandard);
