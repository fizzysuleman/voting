import React, {Component} from  'react';
// import './App.css';
import { Link } from 'react-router-dom';
import giphy from './applied.gif'

class Successful extends Component{
    render(){
        return(
            <div>
                <h1>You have successfully registered</h1>
                <img className="register" src={giphy} alt='gif' height="300px" width="50%" />
                <h4 style={{fontSize:25}}><center>Wait patiently till the day of the screening!!!</center></h4>
            
            </div>
        )
    }
}

export default Successful



















