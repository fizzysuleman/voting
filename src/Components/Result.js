import React, {Component} from 'react';
import {Message,Card, Segment, Icon, Container,Label} from 'semantic-ui-react';
import firebaseConf from './Firebase';

class Result extends Component {
  constructor() {
    super();
    this.state = {
      contestantsPost: [],
      
    };
  }

  componentDidMount() {
    this.fetchAspirantsdata();
  }
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
          
        });
      });
  };
  render() {
    const {contestantsPost} = this.state;
    return (
      <div>
        <Container >
        <Card.Group centered>
          
          {contestantsPost.map(item => {
            return (
              
              <Card>
              <Segment.Group>
                <Message danger attached='bottom'>
                <Icon name='user' />
                {item.post}
              </Message>
                {item.aspirants.map((item, index) => (
                  <div>
                    <Segment.Group>
                      <Segment>{item.lastName + ' ' + item.firstName} <Label color={item.votes?Object.keys(item.votes).length} style={{float:"right"}}>{item.votes?Object.keys(item.votes).length:"0"}</Label></Segment>
                    </Segment.Group>
                  </div>
                ))}
              </Segment.Group>
              </Card>
            );
          })}
          
        </Card.Group>
        </Container>

      </div>
    );
  }
}

export default Result;