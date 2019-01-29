import React, {Component} from 'react';
import 'tachyons';
import {withRouter} from 'react-router-dom';
import firebaseConf from './Firebase';
import {Form, Input, Button} from 'semantic-ui-react';
import {Offline} from 'react-detect-offline';
// import './App.css';
// import { Link } from 'react-router-dom';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fuid: [],
      username: '',
      password: '',
      isLoading: false,
      alert: false,
      alertData: {},
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
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  componentDidMount() {
    firebaseConf
      .database()
      .ref('admin')
      .on('value', snapshot => {
        const fuid = [];
        snapshot.forEach(data => {
          const fuidNew = {
            username: data.val().username,
            password: data.val().password,
          };
          fuid.push(fuidNew);
          this.setState({fuid});
        });
      });
  }

  handleSubmit = event => {
    this.setState({isLoading: true});
    const {fuid} = this.state;
    event.preventDefault();

    let correctUser = fuid.find(data => {
      return (
        data.username === this.state.username &&
        data.password === this.state.password
      );
    });
    const finalUsername = correctUser ? correctUser.username : '';
    const finalPassword = correctUser ? correctUser.password : '';
    // console.log(this.state.id);
    if (
      finalUsername === this.state.username &&
      finalPassword === this.state.password &&
      this.state.username !== '' &&
      this.state.password !== ''
    ) {
      sessionStorage.setItem('USERNAME', this.state.username);
      this.props.history.push({pathname: '/admin'});

      this.setState({isLoading: false});
    } else {
      this.showAlert(
        'danger',
        'You have either entered a wrong admin detail or check your internet connection and try again.'
      );
      this.setState({isLoading: false});
    }
  };

  render() {
    const {username, password, isLoading} = this.state;
    return (
      <div>
        <h1>Admin Login</h1>
        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field control={Button} type="submit" loading={isLoading}>
            Login!!!
          </Form.Field>
        </Form>
        <Offline>
          <marquee>
            You are currently offline,Connect to continue the process
          </marquee>
        </Offline>
      </div>
    );
  }
}

export default withRouter(AdminLogin);
