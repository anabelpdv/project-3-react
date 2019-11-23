import React from 'react';

export default class AddLocation extends React.Component {

  constructor(props){
    super(props);
    this.state={
    }
  }


  render() {

    return (
      <div className="add-location-form">
        <h3>Add Location</h3>
        <form onSubmit={(e) =>this.props.addFormHandler(e)}>
          <div>
              <p>Title</p>
              <input className="input-element" onChange={this.props.inputHandler} type="text" name="title" value={this.props.title}/>
          </div>
          <div >
              <p>Description</p>
              <textarea className="textarea-element" onChange={this.props.inputHandler} type="text" name="description" value={this.props.description}/>
          </div>
          <div>
              <p>Latitude</p>
              <input className="input-element" onChange={this.props.inputHandler} type="number" name="lat" value={this.props.lat}/>
          </div>
          <div>
              <p>Longitude</p>
              <input className="input-element" onChange={this.props.inputHandler} type="number" name="lng" value={this.props.lng}/>
          </div>
          <div>
        
          <div className="image-input-box"> 
              <input name="image" className="image-input"type="file" onChange={this.props.fileUploadHandler} multiple/>
              <button className="image-input-btn"><i class="far fa-image"></i></button>

          </div>
          
          </div>
          <button className="btn">Save</button>
          <button className="btn" onClick={this.props.addLocationToggle}>Cancel</button>
        </form> 
        
      </div>
    )
  }
}
