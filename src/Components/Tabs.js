import React, {Component} from 'react';
import {
  Card,
  Icon,
  Image,
  Container,
  Button,
  Accordion,
} from 'semantic-ui-react';
import firebaseConf from './Firebase';
import per from './6.jpg';

export default class AccordionExampleStandard extends Component {
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
  componentDidMount() {
    this.fetchAspirantsdata();
  }
  
  handleVote=(prefectId,aspirantKey )=>()=>{
    let voterId=localStorage.getItem('VOTERID');
    console.log(voterId)
    const itemsRef = firebaseConf
      .database()
      .ref(`posts/${prefectId}/aspirants/${aspirantKey}/votes`);

    itemsRef
      .push(voterId)
      .then(() => {
        // this.showAlert('success', 'You have successfully filled the form');
      })
      .catch(message => {
        console.log(`this is the error :${message}`);
        this.showAlert('danger', message);
      });
    this.setState({isLoading: false});
    // this.resetForm();
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
    const {activeIndex, contestantsPost} = this.state;

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
                              <Button color="green" onClick={this.handleVote(item.prefectId, item.aspirantKey)}>Vote</Button>
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
        </Container>
      </div>
    );
  }
}

// import React, {Component} from 'react';
// import {Card, Icon, Image, Container, Button} from 'semantic-ui-react';
// import per from './6.jpg';
// import firebaseConf from './Firebase';
// class Election extends Component {
//   constructor() {
//     super();
//     this.state = {
//       contestantsPost: [],
//       totalNumberOfPositions: '',
//       currentIndex: '',
//     };
//   }
//   componentDidMount() {
//     this.fetchAspirantsdata();
//   }

//   fetchAspirantsdata = () => {
//     firebaseConf
//       .database()
//       .ref('posts')
//       .orderByChild('prefect')
//       .on('value', snapshot => {
//         const contestantsPost = [];
//         snapshot.forEach(data => {
//           contestantsPost.push({
//             id: data.val().id,
//             post: data.val().post,
//             aspirants: Object.values(
//               data.val().aspirants ? data.val().aspirants : ''
//             ),
//           });
//           this.setState({contestantsPost});
//           console.log(this.state.contestantsPost);
//         });
//       });
//   };
//   render() {
//     const {contestantsPost} = this.state;
//     console.log(contestantsPost[1]);

//     return (
//       <div>
//         <h1>Welcome and Vote wisely!!</h1>
//         {/* {contestantsPost.aspirants &&
//           contestantsPost.aspirants.map(constestant => {
//             return ( */}
//         {contestantsPost && (
//           <div>
//             {contestantsPost.map((item, index) => (
//               <Container>
//                 <center>
//                   <h2>{item.post}</h2>
//                 </center>
//                 <br />
//                 <Card.Group centered>
//                   {item.aspirants.map(item => (
//                     <Card style={{width: '25%', height: 'e'}}>
//                       <Image src={per} />
//                       <Card.Content>
//                         <Card.Header>
//                           <center>
//                             {item.firstName + ' ' + item.lastName}
//                           </center>
//                         </Card.Header>
//                       </Card.Content>
//                       <Card.Content extra>
//                         <center>
//                           <Button color="green">Vote</Button>
//                         </center>
//                       </Card.Content>
//                     </Card>
//                   ))}
//                 </Card.Group>
//               </Container>
//             ))}
//           </div>
//         )}

//         {/* );
//           })} */}
//       </div>
//     );
//   }
// }

// export default Election;
