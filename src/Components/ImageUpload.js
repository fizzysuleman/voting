import React ,{Component} from 'react';
import firebaseConf from './Firebase'
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      file: '',
      imagePreviewUrl: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    firebaseConf.storage().ref('aspirantImg');
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className='form-image' src={imagePreviewUrl} />);
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this._handleImageChange} storageRef={firebaseConf.storage().ref("aspirantImg")} />
          
        </form>
        {$imagePreview}
      </div>
    )
  }

}
export default ImageUpload