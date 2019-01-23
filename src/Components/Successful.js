import React, {Component} from  'react';
// import './App.css';
import { Link } from 'react-router-dom';
import giphy from './successful.gif'
import {Popup,Button} from 'semantic-ui-react'

class Successful extends Component{
    constructor(props){
        super(props)
        this.state={
            uniqueId:props.location.state.uniqueId,
            fullName:this.props.location.state.fullName
        }
    }
    render(){
      

        return(
            <div>
                <h1>You have successfully registered</h1>
                <img className="register" src={giphy} alt='gif' height="300px" width="50%" />
                <center><div >The VoterID for {' '+this.state.fullName+' '}is<span style={{fontWeight:'bold'}}>{' '+this.state.uniqueId}</span></div></center>
                <br/>
                <center><div style={{fontWeight:'bold'}}>Take Note!!!...The voterID would be needed during voting process</div></center>
                <br/>
               <div style={{marginLeft:'50%',marginRight:'50%'}}> <Popup  trigger={<Button primary  as={Link} to='/Register' >Finish!</Button>} content='Go back to Login'/></div>
            </div>
        )
    }
}

export default Successful



















