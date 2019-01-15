import React from 'react'
const SAMPLE_JSON = {
    a: 1,
    b: 2,
    c: 3
    
};
 
const LOCALSTORAGE_KEY = 'someJson'
 
class SomeComponent extends React.Component {
	constructor (props) {
  	super(props)
    
    this.json = {}
  }
  
  componentWillMount () {
    this.loadJson()
  }
 
  validateJson (json) {
    let validJson
    
    try{
      validJson = JSON.stringify(JSON.parse(this.state.json), null, 2)
    } catch(e) {
      throw e
    }
    
    return validJson
  }
  
  loadJson = () => {
    const json = window.localStorage.getItem(LOCALSTORAGE_KEY) || JSON.stringify(SAMPLE_JSON, null, 2)
    this.setState({ json })
  }
  
  saveJson = () => {
    const validJson = this.validateJson(this.state.json)
    
    if (!validJson) return;
    
    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      validJson
    )
  }
  
  handleChange = e => this.setState({
    json: e.target.value
  })
  
  render () {
    return (
      <div>
        <textarea onChange={this.handleChange} value={this.state.json} />
        <button onClick={this.saveJson}>SAVE to LocalStorage</button> 
        <button onClick={this.loadJson}>LOAD from LocalStorage</button>
<p>save/load JSON data via a React Component</p>
      </div>
    )
  }
}

export default SomeComponent