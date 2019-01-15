import React, {Component} from 'react';
import 'tachyons';
import {withRouter} from 'react-router-dom';
import firebaseConf from './Firebase';
import {Form, Input, Button} from 'semantic-ui-react';
import {Offline} from 'react-detect-offline';
// import './App.css';
// import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fuid: [],
      id: '',
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
      .ref('voters')
      .on('value', snapshot => {
        const fuid = [];
        snapshot.forEach(data => {
          const fuidNew = {
            id: data.val().id,
            uid: data.key,
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

    let correctId = fuid.find(id => {
      return id.id === this.state.id;
    });
    const finalId = correctId ? correctId.id : '';
    console.log(this.state.id);
    if (finalId === this.state.id && this.state.id !== '') {
      localStorage.setItem('VOTERID', finalId);
      this.props.history.push({
        pathname: '/election',
      });
      this.setState({isLoading: false});
    } else {
      this.showAlert(
        'danger',
        'You entered a wrong voter Id,Check your internet connection or Contact Admin if checked and not resolved.'
      );
      this.setState({isLoading: false});
    }
  };

  render() {
    const {id, isLoading} = this.state;
    return (
      <div>
        <h1>Type in your ID to start Voting</h1>
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
              label="Voter ID"
              placeholder="Voter ID"
              name="id"
              value={id}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field control={Button} type="submit" loading={isLoading}>
            Start Voting!!!
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

export default withRouter(Login);
