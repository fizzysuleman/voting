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
import {withRouter} from 'react-router-dom'

 class AccordionExampleStandard extends Component {
  state = {activeIndex: '', contestantsPost: []};

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

  handleFinish=()=>{
    localStorage.removeItem('VOTERID')
    this.props.history.push({
      pathname:'/Login'
    })
  }
  componentDidMount() {
    this.fetchAspirantsdata();
    let voterId = localStorage.getItem('VOTERID');
    this.setState({voterId});
  }

  handleUnvote = (prefectId, aspirantKey) => () => {
    const {voterId} = this.state;

    const removeRef = firebaseConf
      .database()
      .ref(`posts/${prefectId}/aspirants/${aspirantKey}/votes/${voterId}`);
    removeRef.remove();
  };

  handleVote = (prefectId, aspirantKey) => () => {
    const {voterId} = this.state;
    const itemsRef = firebaseConf
      .database()
      .ref(`posts/${prefectId}/aspirants/${aspirantKey}/votes`);

    itemsRef
      .child(voterId)
      .set({voterId: voterId})
      


    //   const itemsRef2 = firebaseConf
    //   .database()
    //   .ref(`posts/${prefectId}/aspirants/voters`);

    // itemsRef2
    //   .child(voterId)
    //   .set({voterId: voterId})
   
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
    const {activeIndex, contestantsPost, voterId} = this.state;
    console.log(voterId);
    return (
      <div>
        <h1>Welcome and Vote wisely!!</h1>
        <Container>
          <Accordion styled style={{width: '100%'}}>
            {contestantsPost.map((item, index) => {
              return (
                <div>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={this.handleClick}
                    key={item.key}
                  >
                    <Icon name="dropdown" />
                    {item.post}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    <Card.Group centered stretched>
                      {item.aspirants.map((item, index) => (
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
                                    item.aspirantKey
                                  )}
                                >
                                  Vote
                                </Button>
                              )}
                              {item.votes && item.votes[voterId] && (
                                <Button
                                  color="red"
                                  onClick={this.handleUnvote(
                                    item.prefectId,
                                    item.aspirantKey
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
          <Form.Field style={{paddingLeft:'auto',paddingRight:'auto'}} control={Button} type="submit" color="blue" onClick={this.handleFinish}>
            Finish
          </Form.Field>
        </Container>
      </div>
    );
  }
}


export default withRouter(AccordionExampleStandard)