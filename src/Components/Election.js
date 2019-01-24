import React, {Component} from 'react';
import {
  Card,
  Icon,
  Image,
  Container,
  Button,
  Accordion,
  Form,
  Label
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
      haveVoted: [],
      voterId: ''
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
  };

  componentDidUpdate(prevProps,prevState){
   if( prevState.aspirant!==this.state.aspirant){
    this.setState({aspirant:this.state.aspirant})
   }
  }

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
    const {voterId} = this.state;
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
         //trying to get the items in the in aspirants 
         let newData = contestantsPost.filter(item => {
          return item.aspirants;
        });

        let finalData = newData.map(item => {
          return item.aspirants;
        });
        //joining all the arrays together
        let finalFinalData = finalData.reduce((a, b) => {
          return a.concat(b);
        }, []);

        this.setState({newAspirant: finalData});
      });
  };

  render() {
     console.log(this.state.aspirant)
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
                    {(posts.votes && posts.votes[voterId])? <Label color='blue' content={posts.post} />: posts.post}
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
