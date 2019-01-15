import React, {Component} from 'react';
import {Button, Form, Input} from 'semantic-ui-react';
import firebaseConf from './Firebase';
import {withRouter} from 'react-router-dom';
import {Offline} from 'react-detect-offline';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      oldPassword: '',
      newPassword: '',
      password: [
        {
          adminPass: 'mfvmd',
          id: '',
        },
      ],

      isLoading: false,
    };
    //post: props.location.state ? props.location.state.post : ""
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

  updatePassword = passwordId => {
    const {password, oldPassword} = this.state;
    // console.log(password[0].id);
    this.setState({isLoading: true});
    const {newPassword} = this.state;
    if (oldPassword === password[0].adminPass) {
      firebaseConf
        .database()
        .ref(`/admin/${passwordId}`)
        .update({
          password: newPassword,
        })
        .then(() => {
          this.showAlert(
            'success',
            'You have successfully changed your admin password'
          );
          this.setState({isLoading: false});
        });
    } else {
      this.showAlert('danger', 'You entered an incorrect Old password');
      this.setState({isLoading: false});
    }
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  componentDidMount() {
    firebaseConf
      .database()
      .ref('admin')
      .on('value', snapshot => {
        const password = [];
        snapshot.forEach(data => {
          const passwordNew = {
            adminPass: data.val().password,
            id: data.key,
          };
          password.push(passwordNew);
          this.setState({password});
        });
      });
  }

  render() {
    const {
      fullName,

      oldPassword,
      newPassword,
      isLoading,
      password,
    } = this.state;
    // console.log(this.state.password[0].id);
    return (
      <div>
        <h1>Change Admin Password</h1>

        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <h2>{fullName}</h2>

        <Form onChange={this.handleChange}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Old Password"
              value={oldPassword}
              name="oldPassword"
              placeholder="Old Password"
              type="password"
            />
            <Form.Field
              control={Input}
              label="New Password"
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              type="password"
            />
          </Form.Group>
          <Form.Field
            control={Button}
            loading={isLoading}
            onClick={() => this.updatePassword(password[0].id)}
          >
            Change
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

export default withRouter(ChangePassword);
