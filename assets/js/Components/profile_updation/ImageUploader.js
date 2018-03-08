import React, {Component} from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';
import './App.css';
import axios from 'axios';

class ImageUploader extends Component {
  constructor(props){
        super(props);
        this.state = {
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
      axios.post('',fd);
    }

  render(){
    return(
      <div>
        <input 
        style={{display: 'none'}} 
        type="file" 
        onChange={this.fileSelectedHandler}
        ref={fileInput => this.fileInput = fileInput}/>
        <button onClick={() => this.fileInput.click()}>Pick a File</button>
        &nbsp;&nbsp;
        <button onClick={this.fileUploadHandler}>Upload Pic!</button>
      </div>
    );
  }
}

export default ImageUploader;