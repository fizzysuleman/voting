import React, {Component} from 'react';
import {Button, Form, Input, Select} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import firebaseConf from './Components/Firebase';
import {Offline} from 'react-detect-offline';

const options = [
  {key: '1', text: 'JSS1/YEAR 7', value: 'JSS1/YEAR 7'},
  {key: '2', text: 'JSS2/YEAR 8', value: 'JSS2/YEAR 8'},
  {key: '3', text: 'JSS3/YEAR 9', value: 'JSS3/YEAR 9'},
  {key: '4', text: 'SS1/YEAR 10', value: 'SS1/YEAR 10'},
  {key: '5', text: 'SS2/FORM 11', value: 'SS2/FORM 11'},
  {key: '6', text: 'SS3/FORM 12', value: 'SS3/FORM 12'},
  {key: 'TS', text: 'TEACHING STAFF', value: 'TEACHING STAFF'},
  {key: 'NTS', text: 'NON-TEACHING STAFF', value: 'NON-TEACHING STAFF'},
  {key: 'O', text: 'OTHERS', value: 'OTHERS'},
];

class FormExampleFieldControl extends Component {
  constructor() {
    super();

    this.state = {
      fullName: '',
      section: '',
      teacher: '',
      category: '',
      uniqueIdentity:'',
      schoolId: '',
      votersData: [],
      fetchedSchoolId:[],
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

  handleOptionSelect = (e, {name, value}) => {
    this.setState({[name]: value});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({isLoading: true});
    const{uniqueIdentity,fullName}=this.state
    /**
     * store all of everything thats being submitted,
     * We do this by calling the ref method and passing
     * in the destination we'd like them to be stored
     */

    const itemsRef = firebaseConf.database().ref('voters');
    const uniqueID = function() {
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
      id: uniqueID(),
    };
this.setState({uniqueIdentity:item.id ,fullName:item.fullName})
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
        'The school Id you used was not registered by this school, Contact administrator for further explanations'
      );
      this.setState({isLoading: false});
    } else if (usedSchoolId) {
      this.showAlert(
        'danger',
        'The school Id you used has been used by another person to register to vote, Contact administrator if it was not you'
      );
      this.setState({isLoading: false});

    } else {
      itemsRef.push(item).then(() => {
        this.setState({isLoading: false});
        this.props.history.push({
          pathname: '/Successful',
          state:{
            
            uniqueId:this.state.uniqueIdentity,
            
            fullName:fullName
          }
      });
      });
    }
  };
  componentWillMount() {
    firebaseConf
      .database()
      .ref('schoolInfo')
      .on('value', snapshot => {
        const fetchedSchoolId = [];
        snapshot.forEach(data => {
          const fetchedSchoolIdNew = {
            schoolId: data.key,
          };
          fetchedSchoolId.push(fetchedSchoolIdNew);
          this.setState({fetchedSchoolId});
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
          this.setState({votersData});
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
        <Form onChange={this.handleChange}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Full name"
              placeholder="Full name"
              name="fullName"
              value={fullName}
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
            onClick={this.handleSubmit}
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

// import React, {Component} from 'react';
// import firebaseConf from './Components/Firebase';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       form: [],
//       alert: false,
//       alertData: {},
//     };
//   }

//   showAlert(type, message) {
//     this.setState({
//       alert: true,
//       alertData: {type, message},
//     });
//     setTimeout(() => {
//       this.setState({alert: false});
//     }, 4000);
//   }

//   resetForm() {
//     this.refs.contactForm.reset();
//   }

//   componentWillMount() {
//     let formRef = firebaseConf
//       .database()
//       .ref('form')
//       .orderByKey()
//       .limitToLast(6);
//     formRef.on('child_added', snapshot => {
//       const {name, email, city, phone, message} = snapshot.val();
//       const data = {name, email, city, phone, message};
//       this.setState({form: [data].concat(this.state.form)});
//     });
//   }

//   sendMessage(e) {
//     e.preventDefault();
//     const params = {
//       name: this.inputName.value,
//       email: this.inputEmail.value,
//       city: this.inputCity.value,
//       phone: this.inputPhone.value,
//       message: this.textAreaMessage.value,
//     };
//     if (
//       params.name &&
//       params.email &&
//       params.phone &&
//       params.phone &&
//       params.message
//     ) {
//       firebaseConf
//         .database()
//         .ref('form')
//         .push(params)
//         .then(() => {
//           this.showAlert('success', 'Your message was sent successfull');
//         })
//         .catch(() => {
//           this.showAlert('danger', 'Your message could not be sent');
//         });
//       this.resetForm();
//     } else {
//       this.showAlert('warning', 'Please fill the form');
//     }
//   }

//   render() {
//     return (
//       <div>
//         {this.state.alert && (
//           <div
//             className={`alert alert-${this.state.alertData.type}`}
//             role="alert"
//           >
//             <div className="container">{this.state.alertData.message}</div>
//           </div>
//         )}
//         <div className="container" style={{padding: `40px 0px`}}>
//           <div className="row">
//             <div className="col-sm-4">
//               <h2>Contact Form</h2>
//               <form onSubmit={this.sendMessage.bind(this)} ref="contactForm">
//                 <div className="form-group">
//                   <label htmlFor="name">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     placeholder="Name"
//                     ref={name => (this.inputName = name)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="exampleInputEmail1">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="Email"
//                     ref={email => (this.inputEmail = email)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="city">City</label>
//                   <select
//                     className="form-control"
//                     id="city"
//                     ref={city => (this.inputCity = city)}
//                   >
//                     <option value="México">México</option>
//                     <option value="Guadalajara">Guadalajara</option>
//                     <option value="Monterrey">Monterrey</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="phone">Phone</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="phone"
//                     placeholder="+52 1"
//                     ref={phone => (this.inputPhone = phone)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="message">Message</label>
//                   <textarea
//                     className="form-control"
//                     id="message"
//                     rows="3"
//                     ref={message => (this.textAreaMessage = message)}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Send
//                 </button>
//               </form>
//             </div>
//             <div className="col-sm-8">
//               <div className="row">
//                 {this.state.form.map(form => (
//                   <div
//                     className="col-sm-6"
//                     key={form.phone}
//                     style={{margin: `0px 0px 30px 0px`}}
//                   >
//                     <div className="card">
//                       <div className="card-body">
//                         <h4 className="card-title">{form.name}</h4>
//                         <h6 className="card-subtitle mb-2 text-muted">
//                           {form.city}
//                         </h6>
//                         <p className="card-text">{form.message}</p>
//                         <a href={`tel:${form.phone}`} className="card-link">
//                           {form.phone}
//                         </a>
//                         <a href={`mailto:${form.email}`} className="card-link">
//                           {form.email}
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="alert alert-info fixed-bottom">
//           <div className="container">
//             <div className="row">
//               <div className="col-sm-12">
//                 GnDx:{' '}
//                 <a
//                   href="https://gndx.co/formulario-contacto-react-firebase/"
//                   className="alert-link"
//                 >
//                   Formulario de Contacto con React + Firebase{' '}
//                 </a>
//                 GitHub:{' '}
//                 <a
//                   href="https://github.com/gndx/react-form-firebase"
//                   className="alert-link"
//                 >
//                   react-form-firebase
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
