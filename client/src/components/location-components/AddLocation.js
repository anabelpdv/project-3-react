import React from 'react';
import axios from 'axios';

export default class AddLocation extends React.Component {

  constructor(props){
    super(props);
    this.state={
      images:[],
    }
  }


  render() {
    return (
      <div className="add-location-form">
        <form onSubmit={(e) =>this.props.formHandler(e)}>
          <div>
              <label>Title</label>
              <input onChange={this.props.inputHandler} type="text" name="title" value={this.props.title}/>
          </div>
          <div>
              <label>Description</label>
              <input onChange={this.props.inputHandler} type="text" name="description" value={this.props.description}/>
          </div>
          <div>
              <label>Latitude</label>
              <input onChange={this.props.inputHandler} type="number" name="lat" value={this.props.lat}/>
          </div>
          <div>
              <label>Longitude</label>
              <input onChange={this.props.inputHandler} type="number" name="lng" value={this.props.lng}/>
          </div>
          <div className="image-box">
            <button className='image-button'>Image 1</button>
            <img src="" alt=""/>
            <input className="image-input"type="file" onChange={this.props.fileUploadHandler}/>
          </div>
          <button>Save Location</button>
        </form> 
      </div>
    )
  }
}
