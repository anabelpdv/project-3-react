import React from 'react';

export default class EditLocation extends React.Component {

  constructor(props){
    super(props);
    this.state={
    }
  }


  render() {
    return (

      <div className="edit-location-form">

       <h1>Edit Location</h1>
        <form onSubmit={(e) =>this.props.formHandler(e)}>
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
          </div>
          <button className="btn">Save</button>
          <button className="btn" onClick={this.props.editLocationToggle}>Cancel</button>
        </form> 
        
      </div>
    )
  }
}
