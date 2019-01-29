import React, {Component} from  'react';
// import './App.css';
import { Link } from 'react-router-dom';
import giphy from './applied.gif'
import {Popup,Button} from 'semantic-ui-react'


class Successful extends Component{
    render(){
        return(
            <div>
                <h1>You have successfully registered</h1>
                <img className="register" src={giphy} alt='gif' height="300px" width="50%" />
                <h4 style={{fontSize:25}}><center>Wait patiently till the day of the screening!!!</center></h4>
                <div style={{marginLeft:'50%',marginRight:'50%'}}> <Popup  trigger={<Button primary  as={Link} to='/register-aspirants' >Finish!</Button>} content='Go back to  Register'/></div>

            </div>
        )
    }
}

export default Successful



















