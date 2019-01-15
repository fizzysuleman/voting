import React, {Component} from 'react';
import {Button, Form, Input, Radio, Select, TextArea} from 'semantic-ui-react';

import firebaseConf from './Firebase';
import {Offline} from 'react-detect-offline';
import {withRouter} from 'react-router-dom';

class FormExampleFieldControl extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      prefectName: '',
      prefectId: '',

      section: '',
      reason: '',
      todo: '',
      url: '',
      alert: false,
      alertData: {},

      options: [
        {
          text: '',
          value: '',
          key: '',
        },
      ],
      isLoading: false,
    };
  }
  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: {type, message},
    });
    setTimeout(() => {
      this.setState({alert: false});
    }, 8000);
  }
  // resetForm() {
  //   this.refs.contactForm.reset();
  // }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleOptionSelect = (e, {name, value}) => {
    this.setState({[name]: value});
  };

  setUrl = downloadURL => {
    this.setState({url: downloadURL});

    /* store all of everything thats being submitted,
     * We do this by calling the ref method and passing
     * in the destination we'd like them to be stored
     */

    //get prefect name that corresponds to the selected prefect id
    let prefect = this.state.options.find(option => {
      return option.key === this.state.prefectId;
    });

    const item = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      prefectName: prefect.text,
      prefectId: this.state.prefectId,
      reason: this.state.reason,
      section: this.state.section,
      todo: this.state.todo,
      imageUrl: this.state.url,
      votes:[]
    };
    console.log(item);
    /**
     * similar to the Array.push method,
     * this sends a copy of our object so
     * that it can be stored in Firebase.
     */

    const itemsRef = firebaseConf
      .database()
      .ref(`posts/${this.state.prefectId}/aspirants`);

    itemsRef
      .push(item)
      .then(() => {
        this.showAlert('success', 'You have successfully filled the form');
        this.props.history.push({pathname: '/Successful1'});
      })
      .catch(message => {
        console.log(`this is the error :${message}`);
        this.showAlert('danger', message);
      });
    this.setState({isLoading: false});
    // this.resetForm();
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({isLoading: true});

    var myFile = document.getElementById('my-file-id').files[0];
    var storageRef = firebaseConf
      .storage()
      .ref('aspirantImages/' + myFile ? myFile.name : '');

    storageRef
      .put(myFile)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
      })
      .then(downloadURL => {
        this.setState({isLoading: false});
        return this.setUrl({downloadURL});
      })
      .catch(message => {
        // Use to signal error if something goes wrong.
        console.log(`error response : ${message}`);
      });
  };

  componentWillMount() {
    firebaseConf
      .database()
      .ref('posts')
      .orderByChild('post')
      .on('value', snapshot => {
        const options = [];
        snapshot.forEach(data => {
          const optionNew = {
            text: data.val().post,
            value: data.key,
            key: data.key,
          };

          options.push(optionNew);
          this.setState({options: options});
        });
      });
  }

  render() {
    const {
      firstName,
      lastName,
      prefectId,
      reason,
      section,
      todo,

      options,
      isLoading,
    } = this.state;
    return (
      <div>
        <h1>Register Aspirants</h1>
        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <Form
          ref="contactForm"
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="First name"
              placeholder="First name"
              name="firstName"
              value={firstName}
            />
            <Form.Field
              control={Input}
              label="Last name"
              placeholder="Last name"
              name="lastName"
              value={lastName}
            />
            {/* <img src={this.state.url?this.state.url.downloadURL:""}/> */}
            <Form.Field
              control={Select}
              label="Post"
              options={options}
              placeholder="Post"
              name="prefectId"
              onChange={this.handleOptionSelect}
              value={prefectId}
            />
          </Form.Group>
          <Form.Group inline>
            <label>SS2</label>
            <Form.Field
              control={Radio}
              label="A"
              value="A"
              checked={this.state.section === 'A'}
              name="section"
              onChange={this.handleOptionSelect}
            />
            <Form.Field
              control={Radio}
              label="B"
              value="B"
              checked={this.state.section === 'B'}
              name="section"
              onChange={this.handleOptionSelect}
            />
            <Form.Field
              control={Radio}
              label="C"
              value="C"
              checked={this.state.section === 'C'}
              name="section"
              onChange={this.handleOptionSelect}
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label="Reason want to become a Prefect"
            placeholder="Tell us  ..."
            name="reason"
          />
          <Form.Field
            control={TextArea}
            label="What would you do when you become a prefect"
            placeholder="Tell us  ..."
            name="todo"
          />
          <Form.Group widths="equal">
            <Input type="file" id="my-file-id" />
          </Form.Group>
          <br />
          <br />
          <br />

          <Form.Field
            control={Button}
            type="submit"
            color="blue"
            disabled={
              !firstName ||
              !lastName ||
              // !prefect ||
              !reason ||
              !section ||
              !todo
            }
            loading={isLoading}
          >
            Submit
          </Form.Field>
        </Form>
        <div />
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
