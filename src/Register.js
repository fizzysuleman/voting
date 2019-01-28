import React, { Component } from 'react';
import { Button, Form, Input, Select } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import firebaseConf from './Components/Firebase';
import { Offline } from 'react-detect-offline';
import * as emailjs from 'emailjs-com'

const options = [
  { key: '1', text: 'JSS1/YEAR 7', value: 'JSS1/YEAR 7' },
  { key: '2', text: 'JSS2/YEAR 8', value: 'JSS2/YEAR 8' },
  { key: '3', text: 'JSS3/YEAR 9', value: 'JSS3/YEAR 9' },
  { key: '4', text: 'SS1/YEAR 10', value: 'SS1/YEAR 10' },
  { key: '5', text: 'SS2/FORM 11', value: 'SS2/FORM 11' },
  { key: '6', text: 'SS3/FORM 12', value: 'SS3/FORM 12' },
  { key: 'TS', text: 'TEACHING STAFF', value: 'TEACHING STAFF' },
  { key: 'NTS', text: 'NON-TEACHING STAFF', value: 'NON-TEACHING STAFF' },
  { key: 'O', text: 'OTHERS', value: 'OTHERS' },
];

class FormExampleFieldControl extends Component {
  constructor() {
    super();

    this.state = {
      fullName: '',
      section: '',
      teacher: '',
      category: '',
      uniqueIdentity: '',
      schoolId: '',
      email:'',
      votersData: [],
      fetchedSchoolId: [],
      isLoading: false,
    };
  }
  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: { type, message },
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 8000);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOptionSelect = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { uniqueIdentity, fullName } = this.state
    /**
     * store all of everything thats being submitted,
     * We do this by calling the ref method and passing
     * in the destination we'd like them to be stored
     */

    const itemsRef = firebaseConf.database().ref('voters');
    const uniqueID = function () {
      return (
        'LMC' +
        Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()
      );
    };
    const item = {
      fullName: this.state.fullName,
      category: this.state.category,
      section: this.state.section,
      teacher: this.state.teacher,
      schoolId: this.state.schoolId,
      email:this.state.email,
      status: 'Not voted',
      id: uniqueID(),
    };
    this.setState({ uniqueIdentity: item.id, fullName: item.fullName })
    /**
     * similar to the Array.push method,
     * this sends a copy of our object so
     * that it can be stored in Firebase.
     */
    let filteredSchoolId = this.state.fetchedSchoolId.find(id => {
      return this.state.schoolId === id.schoolId;
    });

    let usedSchoolId = this.state.votersData.find(id => {
      return this.state.schoolId === id.voterSchoolId;
    });

    if (!filteredSchoolId) {
      this.showAlert(
        'danger',
        'The school Id you used was not registered by this school, Please Contact the administrator.'
      );
      this.setState({ isLoading: false });
    } else if (usedSchoolId) {
      this.showAlert(
        'danger',
        'The school Id you entered has been used by another person to register. Please contact the administrator if it was not you.'
      );
      this.setState({ isLoading: false });

    } else {
      itemsRef.push(item).then(() => {
        this.sendFeedback("E-Voting", `${this.state.fullName}`,`${this.state.email}`,`You have successflly registered. Your voter ID is ${this.state.uniqueIdentity}.`)
        this.setState({ isLoading: false });
        this.props.history.push({
          pathname: '/successful-voter',
          state: {

            uniqueId: this.state.uniqueIdentity,

            fullName: fullName
          }
        });
      });
    }
  };

  sendFeedback = (senderName,receiverName,receiverEmail,feedback) => {

    var template_params = {
      "receiverEmail": receiverEmail,
      "reply_to": "evoting@evoting.com.ng",
      "receiverName": receiverName,
      "senderName": senderName,
      "feedback": feedback
   }
   
   var service_id = "default_service";
   var template_id = "template_KmBJEuEZ";
   var user_id ="user_0BXEej2yQcLmlDlTI6wdg"
   
  //  emailjs.init(user_id);
  //  emailjs.send(service_id, template_id, template_params,user_id)
     .then(res => {
       this.setState({ formEmailSent: true })
     })
     // Handle errors here however you like, or use a React error boundary
     .catch(err => console.error('Failed to send feedback. Error: ', err))
  }

  componentWillMount() {
    firebaseConf
      .database()
      .ref('school')
      .on('value', snapshot => {
        const fetchedSchoolId = [];
        snapshot.forEach(data => {
          const fetchedSchoolIdNew = {
            schoolId: data.key,
          };
          fetchedSchoolId.push(fetchedSchoolIdNew);
          this.setState({ fetchedSchoolId });
        });
      });
    //fetching voters school id to be able to see if they have registered before
    firebaseConf
      .database()
      .ref('voters')
      .on('value', snapshot => {
        const votersData = [];
        snapshot.forEach(data => {
          const votersDataNew = {
            voterSchoolId: data.val().schoolId,
          };
          votersData.push(votersDataNew);
          this.setState({ votersData });
        });
      });
  }

  render() {
    const {
      fullName,
      category,
      teacher,
      section,
      isLoading,
      schoolId,
      email
    } = this.state;
    return (
      <div>
        <h1>Register Voters</h1>
        <marquee>
          Note:Fill form in <strong>Capital Letters</strong>
        </marquee>
        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Full name"
              placeholder="Full name"
              name="fullName"
              value={fullName}
            />
             <Form.Field
              control={Input}
              label="Email"
              placeholder="Email address"
              type='email'
              name="email"
              value={email}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Select}
              label="Class/Category"
              options={options}
              placeholder="Class/Category"
              name="category"
              onChange={this.handleOptionSelect}
              value={category}
            />
            <Form.Field
              control={Input}
              label="Section"
              placeholder="Section"
              name="section"
              value={section}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Class Teacher"
              placeholder="Class Teacher(For only students)"
              name="teacher"
              value={teacher}
            />
            <Form.Field
              control={Input}
              label="School ID"
              placeholder="School ID"
              name="schoolId"
              value={schoolId}
            />
          </Form.Group>
          <br />
          <br />
          <br />

          <Form.Field
            control={Button}
            type="submit"
            color="blue"
            loading={isLoading}
            disabled={!fullName || !category || !schoolId}
            type="submit"
          >
            Submit
          </Form.Field>
        </Form>
        <Offline>
          <marquee>
            You are currently offline,Connect and contimue the process
          </marquee>
        </Offline>
      </div>
    );
  }
}

export default withRouter(FormExampleFieldControl);