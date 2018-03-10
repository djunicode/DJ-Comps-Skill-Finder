import React, {Component} from 'react';
import {bindAll} from 'lodash';
import './App.css';
import axios from 'axios';

class ImageUploader extends Component {
  constructor(props){
        super(props);
        this.state = {
          pic: user.photo || "/static/profile_updation/profile.png",
          selectedFile: null
        };

        this.fileSelectedHandler= this.fileSelectedHandler.bind(this);
        this.fileUploadHandler= this.fileUploadHandler.bind(this);
    }

    fileSelectedHandler(event) {
      this.setState({
        selectedFile: event.target.files[0]
      })
    }

    fileUploadHandler(event) {
      const fd = new FormData();
      fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
     {/* axios.post('',fd);*/}
    }

  render(){
    return(
      <div>
        
        <center>
        <img src= {this.state.pic} className="img-circle" alt="User Profile"/>
        <br/><br/><br/>
        <input 
        
        type="file" 
        onChange={this.fileSelectedHandler}
        />
        
        <button onClick={this.fileUploadHandler}>Upload Pic!</button>
        </center>
        
      </div>
    );
  }
}

export default ImageUploader;