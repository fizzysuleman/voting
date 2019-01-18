import React, {Component} from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import firebaseConf from './Firebase';

class AddId extends Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      schoolId: '',
      isLoading: false,
      alert: false,
      alertData: {},
      fetchedSchoolId: [],
    };
  }
  //for the successful alert message
  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message},
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 8000);
  }
  //handle change of the text box
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  //fetch the school id
  componentDidMount() {
    firebaseConf
      .database()
      .ref('schoolInfo')
      .on('value', snapshot => {
        const fetchedSchoolId = [];
        snapshot.forEach(data => {
          const fetchedSchoolIdNew = {
            schoolId: data.key,
          };
          fetchedSchoolId.push(fetchedSchoolIdNew);
          this.setState({fetchedSchoolId});
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({isLoading: true});

    const {fetchedSchoolId, schoolId, fullName} = this.state;
//finding the one that is equal to the value in the text box 
    let filteredSchoolId = fetchedSchoolId.find(id => {
      return this.state.schoolId === id.schoolId;
    });
    //if the value is equal to the one in the text box..
    if (filteredSchoolId) {
        //raise an error
      this.showAlert(
        'danger',
        'Someone with this school ID has already been added'
      );
      this.setState({isLoading: false})
    } else {
        //else send the data to firebase
      const idRef = firebaseConf.database().ref(`schoolInfo`);
      let childId = schoolId;
      idRef
      //setting the child name to this.state.schoolId
        .child(childId)
        .set({

          fullname: fullName,
          schoolId: schoolId,
        })
        .then(() => {
          this.showAlert(
            'success',
            'You have successfully added a person to be able to vote'
          );
          this.setState({isLoading: false, fullName: '', schoolId: ''});
        });
    }
  };

  render() {
    const {fullName, schoolId} = this.state;
    return (
      <div>
        <marquee>The field must be filled with CAPITAL LETTERS</marquee>
        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <Form onChange={this.handleChange}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Fullname"
              placeholder="Fullname"
              name="fullName"
              value={fullName}
            />
            <Form.Field
              control={Input}
              label="School ID"
              placeholder="School ID"
              name="schoolId"
              value={schoolId}
            />
          </Form.Group>
          <Form.Field
            control={Button}
            type="submit"
            color="blue"
            disabled={!fullName || !schoolId}
            loading={this.state.isLoading}
            onClick={this.handleSubmit}
          >
            Submit
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default AddId;
