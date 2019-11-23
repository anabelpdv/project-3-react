import React from 'react';

export default class EditLocation extends React.Component {

  constructor(props){
    super(props);
  }



  render() {
    return (

      <div className="edit-location-form">
      <h3>Edit Location</h3>
        <form onSubmit={(e)=>{
          this.props.editFormHandler(e)
          this.props.editLocationToggle()
        }}>
          <div>
              <p>Title</p>
              <input className="edit-input-element" onChange={this.props.inputHandler} type="text" name="title" value={this.props.title}/>
          </div>
          <div >
              <p>Description</p>
              <textarea className="edit-textarea-element" onChange={this.props.inputHandler} type="text" name="description" value={this.props.description}/>
          </div>
          <div>
              <p>Latitude</p>
              <input className="edit-input-element" onChange={this.props.inputHandler} type="number" name="lat" value={this.props.lat}/>
          </div>
          <div>
              <p>Longitude</p>
              <input className="edit-input-element" onChange={this.props.inputHandler} type="number" name="lng" value={this.props.lng}/>
          </div>
          <div>
          </div>
          <button className="details-btn">Save</button>
          <button className="details-btn" onClick={this.props.editLocationToggle}>Cancel</button>
        </form> 
        
      </div>
    )
  }
}
