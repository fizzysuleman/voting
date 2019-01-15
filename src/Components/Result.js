import React, {Component} from 'react';
import {Image, Segment, Button, Container} from 'semantic-ui-react';

// let post= [
//   "Head boy": {},
//   'Head girl',
//   'Social Prefect boy',
//   'Social Prefect girl',
//   'Health Prefect boy',
//   'Health Prefect girl',
//   'Environmental Prefect boy',
//   'Environmental Prefect girl',
// ];
class Result extends Component {
  constructor() {
    super();
    this.state = {
      posts: [
        {post: 'Headboy'},
        {post: 'Headgirl'},
        {post: 'Health prefect boy'},
        {post: 'Health prefect girl'},
        {post: 'Social Prefect boy'},
        {post: 'Social Prefect girl'},
      ],
      color: ['red', 'orange', 'yellow', 'olive', 'green'],
    };
  }
  render() {
    return (
      <div>
        <Container>
          <Segment.Group>
            <Segment>
              <center>
                <b>Headboy</b>
              </center>
            </Segment>

            <Segment.Group horizontal>
              <Segment color="violet">
                <Image src="100" rounded size="mini" />
                Sadiq Bala-Dole
                <Button color="green" floated="right">
                  Vote
                </Button>
              </Segment>
              <Segment color="violet">
                <Image src="100" rounded size="mini" />
                Lebile Bolarinwa
                <Button color="green" floated="right">
                  Vote
                </Button>
              </Segment>
              <Segment color="violet">
                <Image src="100" rounded size="mini" />
                Yahaya Malik
                <Button color="green" floated="right">
                  Vote
                </Button>
              </Segment>
              <Segment color="violet">
                <Image src="100" rounded size="mini" />
                Sholanke Taiwo
                <Button color="green" floated="right">
                  Vote
                </Button>
              </Segment>
              <Segment color="violet">
                <Image src="100" rounded size="mini" />
                Sholanke Kehinde
                <Button color="green" floated="right">
                  Vote
                </Button>
              </Segment>
            </Segment.Group>
          </Segment.Group>
        </Container>
      </div>
    );
  }
}

export default Result;
