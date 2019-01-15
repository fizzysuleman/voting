import React, {Component} from 'react';
import {Button, Form, Input, Select} from 'semantic-ui-react';
import firebaseConf from './Firebase';
import {withRouter} from 'react-router-dom';
import {Offline} from 'react-detect-offline';

class ChangePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOption: '',
      post: props.location.state ? props.location.state.post : "",
      fullName: props.location.state.fullName,
      id: props.location.state.id,
      aspirantKey:props.location.state.aspirantKey,
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
  updatePost = (postId,aKey) => {
    this.setState({isLoading: true});
    const {selectedOption} = this.state;
    firebaseConf
      .database()
      .ref(`/posts/${postId}/aspirant/${aKey}`)
      .update({
        prefectName: selectedOption,
      })

      .then(() => {
        this.showAlert('success', 'You have successfully added a new post');

        this.setState({isLoading: false});
      });
  };

  handleOptionSelect = (e, {name, value}) => {
    this.setState({[name]: value});
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
            value: data.val().post,
          };
          options.push(optionNew);
          this.setState({options: options});
        });
      });
  }

  render() {
    const {options, post, fullName, id, selectedOption, isLoading,aspirantKey} = this.state;
    // console.log(options);
    return (
      <div>
        <h1>Change Aspirant Post</h1>

        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <h2>{fullName}</h2>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Post selected"
              placeholder={this.props.post}
              readOnly
              value={post}
            />
            <Form.Field
              control={Select}
              label="Preferred Post"
              options={options}
              placeholder="Post"
              name="selectedOption"
              value={selectedOption}
              onChange={this.handleOptionSelect}
            />
          </Form.Group>
          <Form.Field
            control={Button}
            loading={isLoading}
            onClick={() => this.updatePost(id,aspirantKey)}
          >
            Change
          </Form.Field>
        </Form>
        <Offline>
          <marquee>
            You are currently offline,Connect to the internet and continue the process
          </marquee>
        </Offline>
      </div>
    );
  }
}

export default withRouter(ChangePost);
