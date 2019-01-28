import React, {Component} from 'react';
import {Form, Input, Button, Container} from 'semantic-ui-react';
// import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import firebaseConf from './Firebase';
import {Offline} from 'react-detect-offline';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postName: '',

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
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({isLoading: true});
    /**
     * store all of everything thats being submitted,
     * We do this by calling the ref method and passing
     * in the destination we'd like them to be stored
     */
    const postsRef = firebaseConf.database().ref('posts');
    const uniqueID = function() {
      return (
        'pst' +
        Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()
      );
    };

    const posts = {
      post: this.state.postName,
      id: uniqueID(),
    };


    postsRef
      .push(posts)
      .then(() => {
        this.showAlert('success', 'You have successfully added a new post');
      })

      .then(() => {
        this.setState({isLoading: false});
      });

    // this.setState(this.baseState)
  };
  render() {
    const {isLoading} = this.state;
    return (
      <div>
        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <Container>
          <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                placeholder="Post name"
                name="postName"
                value={this.state.postName}
              />
            </Form.Group>
            <Form.Field
              control={Button}
              loading={isLoading}
              color="blue"
              disabled={!this.state.postName}
            >
              Add Post
            </Form.Field>
          </Form>
        </Container>
        <Offline>
          <marquee>
            You are currently offline,Connect and contimue the process
          </marquee>
        </Offline>
      </div>
    );
  }
}

export default AddPost;
