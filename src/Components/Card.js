import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import 'tachyons'
// import '././App.css';
// import Login from './Login'
const Card = (props)=>{
    
        return (
            <div>
                <h1>Voter's Card</h1>

                <article className="center mw5 mw6-ns br3 hidden ba b--black-12 mv4">
                    <h1 className="f3 bg-near-white br3 br--top black-60 mv0 pv2 ph3">FEDERAL REPUBLIC OF NIGERIA</h1>
                    <div className="pa3 bt b--black-12">
                        <p className="f6 f5-ns lh-copy measure">Name:{props.registrationDetails.username}</p>
                        <p className="f6 f5-ns lh-copy measure">State of registration:{props.registrationDetails.origin}</p>
                        <p className="f6 f5-ns lh-copy measure">Date of birth:{props.registrationDetails.birthday}</p>
                        <p className="f6 f5-ns lh-copy measure">Gender:{props.registrationDetails.gender}</p>
                        <p className="f6 f5-ns lh-copy measure">Occupation:{props.registrationDetails.occupation}</p>
                        <p className="f6 f5-ns lh-copy measure">Home Address:{props.registrationDetails.address}</p>
                    </div>
                </article>
                
            </div>

        );
    }


export default Card;





