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
      correctIdName:''
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
            fullName:data.val().fullName,
            status:data.val().status
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
    let correctPerson=fuid.find(person=>{
      return this.state.id=== person.id
    })
    let correctIdName=correctPerson?correctPerson.fullName:''
    let status=correctPerson?correctPerson.status:""
    let uid=correctPerson?correctPerson.uid:''
    this.setState({correctIdName})
    const finalId = correctId ? correctId.id : '';
    if (finalId === this.state.id && this.state.id !== '' &&(status==='Not voted' ||status==='Voting in progress')) {
      sessionStorage.setItem('VOTERID', finalId);
      this.props.history.push({
        pathname: '/election',
        state:{
          correctIdName,
          uid
        }

      });
      
      this.setState({isLoading: false});
      firebaseConf
      .database()
      .ref(`/voters/${uid}`)
      .update({
        status:'Voting in progress'
      });

    }else if (status==='Has Voted'){
      this.showAlert(
        'danger',
        'The Voter ID you entered has already been used to vote.'
      );
      this.setState({isLoading: false});
    }
     else {
      this.showAlert(
        'danger',
        'You have either entered a wrong voter Id or check your internet connection'
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
