import React, {Component} from 'react';
import {
  Card,
  Icon,
  Image,
  Container,
  Button,
  Accordion,
  Form,
} from 'semantic-ui-react';
import firebaseConf from './Firebase';
import per from './6.jpg';
import {withRouter} from 'react-router-dom';

class AccordionExampleStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '',
      contestantsPost: [],
      fullName: props.location.state ? props.location.state.correctIdName : '',
      aspirant:'',
      selectedAspirant: {},
      haveVoted: [],
      voterId: '',
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

  handleClick = (e, titleProps) => {
    const {index} = titleProps;
    const {activeIndex} = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({activeIndex: newIndex});
    if (this.state.contestantsPost[index].votes) {
       this.setState({
        aspirant: this.state.contestantsPost[index].votes[this.state.voterId],
      })
     
    }
    

    this.setState({selectedAspirant: this.state.contestantsPost[index] })

    
  };

  handleFinish = () => {
    localStorage.removeItem('VOTERID');
    this.props.history.push({
      pathname: '/Login',
    });
  };
  componentDidMount() {
    this.fetchAspirantsdata();

    let voterId = localStorage.getItem('VOTERID');
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
    this.setState({
      aspirant:''
    })
  };

  handleVote = (prefectId, aspirantKey, postIndex, aspirantIndex) => () => {
    const {voterId, aspirant,contestantsPost} = this.state;
    const itemsRef = firebaseConf
      .database()
      .ref(`posts/${prefectId}/aspirants/${aspirantKey}/votes`);

    itemsRef.child(voterId).set({voterId: voterId});

    const votersRef = firebaseConf.database().ref(`posts/${prefectId}/votes`);

    votersRef
      .child(voterId)
      .set({voterId: voterId})

      .then(() => {})

      .catch(message => {
        console.log(`this is the error :${message}`);
        this.showAlert('danger', message);
      });
    this.setState({isLoading: false});
    if (this.state.contestantsPost[postIndex].votes) {
    this.setState({
      aspirant: this.state.contestantsPost[postIndex].votes[this.state.voterId].voterId,
    })
  }
  let remainingContestant=contestantsPost.filter((contestant,index)=>{
    return(contestant[index]!==postIndex)
  })
  this.setState({
    aspirant:remainingContestant
  })
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
          console.log(this.state.contestantsPost);
        });
      });
  };

  render() {
     console.log(this.state.aspirant)
    console.log(this.state.selectedAspirant)
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
                    {posts.post}
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
                                  disabled={this.state.aspirant===voterId}
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
          <Form.Field
            style={{paddingLeft: 'auto', paddingRight: 'auto'}}
            control={Button}
            type="submit"
            color="blue"
            onClick={this.handleFinish}
          >
            Finish
          </Form.Field>
        </Container>
      </div>
    );
  }
}

export default withRouter(AccordionExampleStandard);
