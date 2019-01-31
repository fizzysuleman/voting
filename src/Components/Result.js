import React, {Component} from 'react';
import {Message,Card, Segment, Icon, Container,Label} from 'semantic-ui-react';
import firebaseConf from './Firebase';

class Result extends Component {
  constructor() {
    super();
    this.state = {
      contestantsPost: [],
      groups:[]
      
    };
  }

  componentDidMount() {
    this.fetchAspirantsdata();
  }
  componentWillReceiveProps(){
    this.getVotes()
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
          this.getVotes()
        });
      });
  };

  getVotes=()=>{
    var votes=[]
    var size=[]
   var sizes=[0]
   this.state.contestantsPost.map((post)=>{
      post.aspirants.map((aspirant, i)=>{
        votes.push(Object.keys(aspirant.votes?aspirant.votes:{}).length)
        
      })
      size.push(post.aspirants.length)
    })
    
    var x=0
    size.forEach(element => {
       x=x+element
       sizes.push(x)
     });

    var groups = votes.map(function (e, start) {
        return votes.slice(sizes[start], sizes[start+1])
    })

    this.setState({groups})
   


  }

  render() {
    const {contestantsPost} = this.state;
    
    return (
      <div>
        <Container >
        <Card.Group centered>
          
          {contestantsPost.map((item,index) => {
            return (
              
              <Card>
              <Segment.Group>
                <Message danger attached='bottom'>
                <Icon name='user' />
                {item.post}
              </Message>
                {item.aspirants.map((item, i) => (
                  <div>
                    <Segment.Group>
                      <Segment>{item.lastName + ' ' + item.firstName} <Label color={Math.max.apply(null, this.state.groups[index])===(item.votes && Object.keys(item.votes).length)?"green":'blue'} style={{float:"right"}}>{item.votes?Object.keys(item.votes).length:"0"}</Label></Segment>
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