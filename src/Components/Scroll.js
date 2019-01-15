import React, { Component } from 'react';

class Scroll extends Component {
    render() {
        return (
            <div style={{ overflowY: 'scroll', border: '5px solid black', height: '100%' }}>
                {this.props.children}
            </div>)
    }

}

export default Scroll