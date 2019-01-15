import React, {Component} from 'react';
import {Table, Header, Image, Button, Form} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebaseConf from './Firebase';

class TableExampleSelectableInvertedRow extends Component {
  constructor () {
    super ();
    this.state = {
      aspirantsData: [],
    };
  };
  removeItem= (userId) => {
// firebaseConf.database().ref('aspirants/').remove()
console.log(userId)

// firebaseConf.database().ref('aspirants/').remove()
//     var user = firebaseConf.auth().currentUser;
// console.log(user)
//     user.delete(id).then(function() {
//   console.log('success')
// })
  //  console.log(firebaseConf.database().ref(`aspirants/${userId}`))
  };

  componentDidMount () {
    this.fetchAspirantsdata ();

  }

  fetchAspirantsdata = () => {
    firebaseConf.database ().ref ('aspirants').on ('value', snapshot => {
      const aspirantsData = [];
      snapshot.forEach (data => {
        
        const aspirantsNew = {
          
          fullName: data.val ().lastName + ' ' + data.val ().firstName,
          post: data.val ().prefect,
          class: data.val ().section,
          reason: data.val ().reason,
          manifesto: data.val ().todo,
          image: data.val ().imageUrl
        };
        }

        aspirantsData.push (aspirantsNew);
        this.setState ({aspirantsData: aspirantsData});
      });
    });
  };

  render () {
    const {aspirantsData} = this.state;
    return (
      <div>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Fullname</Table.HeaderCell>
              <Table.HeaderCell>Post</Table.HeaderCell>
              <Table.HeaderCell>Class(SS2)</Table.HeaderCell>
              <Table.HeaderCell>
                Reason want to become a Prefect
              </Table.HeaderCell>
              <Table.HeaderCell>
                What would do if put in that post
              </Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {aspirantsData.map (aspirant => (
            <Table.Body>
              <Table.Row key={aspirant.fullName}>
                <Table.Cell>
                  <Header as="h4">
                    <Image
                      src={aspirant.image ? aspirant.image.downloadURL : ''}
                      rounded
                      size="mini"
                    />
                    <Header.Content style={{color: 'white'}}>
                      {aspirant.fullName}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{aspirant.post}</Table.Cell>
                <Table.Cell>{aspirant.class}</Table.Cell>
                <Table.Cell>{aspirant.reason}</Table.Cell>
                <Table.Cell>{aspirant.manifesto}</Table.Cell>
                <Table.Cell>
                  <Button basic color="green">Approve</Button>
                  <Button basic color="red" onClick={() => this.removeItem(aspirant.fullName)}>
                    Disapprove
                  </Button>
                  <Link to="/change">
                    <Button basic color="yellow">Change Post</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>

            </Table.Body>
          ))}

        </Table>
        <Image src={this.state.img} rounded size="mini" />

      </div>
    );
  }
}
export default TableExampleSelectableInvertedRow;
