import React, {Component} from  'react';
// import './App.css';
import { Link } from 'react-router-dom';
import giphy from './successful.gif'

class Successful extends Component{
    render(){
        return(
            <div>
                <h1>You have successfully registered</h1>
                <img className="register" src={giphy} alt='gif' height="300px" width="50%" />
                
            
            </div>
        )
    }
}

export default Successful



















