import React, {Component} from 'react';
import {Button, Form, Input, Radio, Select, TextArea} from 'semantic-ui-react';
import * as emailjs from 'emailjs-com'
import firebaseConf from './Firebase';
import {Offline} from 'react-detect-offline';
import {withRouter} from 'react-router-dom';
import { database } from 'firebase';

class FormExampleFieldControl extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      prefectName: '',
      prefectId: '',
      schoolId: '',
      section: '',
      reason: '',
      todo: '',
      url: '',
      alert: false,
      alertData: {},
      fetchedSchoolId: [],
      disapprovedId:[],
      aspirant:[],
      postsData:[],
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
      schoolId: this.state.schoolId,
      votes: [],
    };
   
    /**
     * similar to the Array.push method,
     * this sends a copy of our object so
     * that it can be stored in Firebase.
     */
    //finding the one that is equal to the value in the text box
    let filteredSchoolId = this.state.fetchedSchoolId.find(id => {
      return this.state.schoolId === id.schoolId;
    });
    let disapprovedSchoolId=this.state.disapprovedId.find(id=>{
      return this.state.schoolId===id.disapprovedSchoolId
    })
    
    // checking for used school id
    let usedSchoolId=this.state.aspirant.find(id=>{
      return this.state.schoolId===id.schoolId
    })
    

    const itemsRef = firebaseConf
      .database()
      .ref(`posts/${this.state.prefectId}/aspirants`);
      //if the schoolId typed in the checkbox is not equal to the schoolId registered 
    if (!filteredSchoolId) {
      this.showAlert(
        'danger',
        'The school Id was not registered with this school, Contact administrator for future explanation'
      );
      this.setState({isLoading: false});
      //else if the id typed has been used by another  aspirant
    } else if(usedSchoolId || disapprovedSchoolId) {
      this.showAlert(
        'danger',
        'The school Id was registered by another user, Contact administrator if it was not you'
      );
      this.setState({isLoading: false});
      //if the two conditions do not apply the the information can be pushed to firebase
    }else{
            itemsRef
        .push(item)
        .then(() => {
          this.sendAdminFeedback('fizzysuleman@gmail.com',`${this.state.firstName+' '+this.state.lastName}`)
          this.showAlert('success', 'You have successfully filled the form');
          this.props.history.push({pathname: '/successful-aspirants'});
        })
        .catch(message => {
          this.showAlert('danger', message);
        });
      this.setState({isLoading: false});
      // this.resetForm();
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({isLoading: true});
//fetching the image selected by its ID
    var myFile = document.getElementById('my-file-id').files[0];
    if (myFile){
    var storageRef = firebaseConf
      .storage()
      .ref('aspirantImages/' + myFile ? myFile.name : '')
    }
if(myFile){
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
    }else{
      const downloadURL=''
      this.setUrl({downloadURL})
    }
  };

  sendAdminFeedback=(adminEmail,aspirantName)=>{
    var template_params = {
      "adminEmail": adminEmail,
      "aspirantName": aspirantName,
      "link": "https://e-voting-2f5a4.firebaseapp.com/admin"
   }
   
   var service_id = "default_service";
   var template_id = "adminEmail";
   var user_id ="user_0BXEej2yQcLmlDlTI6wdg"

   emailjs.init(user_id);

   emailjs.send(service_id, template_id, template_params,user_id)
   .then(res => {
    this.setState({ formEmailSent: true })
  })
  // Handle errors here however you like, or use a React error boundary
  .catch(err => console.error('Failed to send feedback. Error: ', err))
  }
  
  componentWillMount() {
    //fetching the posts
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
      firebaseConf
      .database()
      .ref('disapprovedAspirants')
      
      .on('value', snapshot => {
        const disapprovedId = [];
        snapshot.forEach(data => {
          disapprovedId.push({
            disapprovedSchoolId:data.val().schoolId
          });
          this.setState({disapprovedId})
          });
         
        })
    // fetching the schoolId
    firebaseConf
      .database()
      .ref('school')
      .on('value', snapshot => {
        const fetchedSchoolId = [];
        snapshot.forEach(data => {
          const fetchedSchoolIdNew = {
            schoolId: data.val().schoolId,
          };
          fetchedSchoolId.push(fetchedSchoolIdNew);
          this.setState({fetchedSchoolId});
        });
      });

    //fetching aspirants data to be used in finding if someone with the school id has been found
    firebaseConf
      .database()
      .ref('posts')
      .orderByChild('post')
      .on('value', snapshot => {
        const postsData = [];
        snapshot.forEach(data => {
          postsData.push({
            aspirants: Object.entries(
              data.val().aspirants ? data.val().aspirants : []
            ).map(e => Object.assign(e[1], {aspirantKey: e[0]})),
          });
        });
        //trying to get the items in the in aspirants 
        let newData = postsData.filter(item => {
          return item.aspirants.length > 0;
        });

        let finalData = newData.map(item => {
          return item.aspirants;
        });
        //joining all the arrays together
        let finalFinalData = finalData.reduce((a, b) => {
          return a.concat(b);
        }, []);

        this.setState({aspirant: finalFinalData});
        
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
      schoolId,
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
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Select}
              label="Post"
              options={options}
              placeholder="Post"
              name="prefectId"
              onChange={this.handleOptionSelect}
              value={prefectId}
            />
            <Form.Field
              control={Input}
              label="School ID"
              placeholder="School ID"
              name="schoolId"
              value={schoolId}
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
            label="Reason for aspiring  to become a Prefect"
            placeholder="Tell us  ..."
            name="reason"
          />
          <Form.Field
            control={TextArea}
            label="What would you contribute to the value of the school you become a prefect"
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
              !todo ||
              !schoolId
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
