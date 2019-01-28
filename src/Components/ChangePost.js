import React, {Component} from 'react';
import {Button, Form, Input, Select} from 'semantic-ui-react';
import firebaseConf from './Firebase';
import {withRouter} from 'react-router-dom';
import {Offline} from 'react-detect-offline';

class ChangePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          key: '',
        },
      ],
      selectedOption: '',
      post: props.location.state ? props.location.state.post : '',
      firstName: props.location.state ? props.location.state.firstName:'',
      lastName: props.location.state? props.location.state.lastName:'',
      id:props.location.state? props.location.state.id:'',
      aspirantKey:props.location.state? props.location.state.aspirantKey:'',
      section: props.location.state? props.location.state.section:'',
      reason: props.location.state? props.location.state.reason:'',
      todo: props.location.state? props.location.state.todo:'',
      imageUrl:{ downloadURL: props.location.state.imageUrl},
      isLoading: false,
      fullName:
        (props.location.state.firstName + ' ' + props.location.state.lastName)?props.location.state.firstName + ' ' + props.location.state.lastName:'',
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
  updatePost = (postId, aspirantKey) => {
    const {options} = this.state;
    this.setState({isLoading: true});
    let prefect = options.find(option => {
      return option.key === this.state.selectedOption;
    });
    let prefectId = prefect.key;
    const aspirantPush = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      prefectName: prefect.text,
      prefectId: prefectId,
      reason: this.state.reason,
      section: this.state.section,
      todo: this.state.todo,
      imageUrl: this.state.imageUrl,
      votes: [],
    };
    
    /**
     * similar to the Array.push method,
     * this sends a copy of our object so
     * that it can be stored in Firebase.
     */

    const itemsRef = firebaseConf
      .database()
      .ref(`posts/${prefectId}/aspirants`);

    itemsRef
      .push(aspirantPush)

      .then(() => {
        firebaseConf
          .database()
          .ref(`/posts/${postId}/aspirants/${aspirantKey}`)
          .remove();

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
      options,
      post,
      fullName,
      id,
      selectedOption,
      isLoading,
      aspirantKey,
      key,
    } = this.state;
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
            onClick={() => this.updatePost(id, aspirantKey)}
          >
            Change
          </Form.Field>
        </Form>
        <Offline>
          <marquee>
            You are currently offline,Connect to the internet and continue the
            process
          </marquee>
        </Offline>
      </div>
    );
  }
}

export default withRouter(ChangePost);
