import React from 'react'
import EditLocation from './EditLocation'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editLocation:false,
    }
  }

  editLocationToggle=()=>{
    this.setState({
        editLocation:!this.state.editLocation,
    })
}

editLocationRender=()=>{
    if(this.state.editLocation){
        return(
            <div>
                <EditLocation
                    location={this.props.location.state.location}
                    inputHandler={this.inputHandler} 
                    fileUploadHandler={this.fileUploadHandler}
                    formHandler={this.formHandler} 
                    title={this.state.title} 
                    description={this.state.description}
                    lat={this.state.lat} 
                    lng={this.state.lng}
                    editLocationToggle={this.editLocationToggle}
                    >
                </EditLocation>
            </div>
        )
    }     
}

  render() {
    const location = this.props.location.state.location;
    return (
      <div className="location-details-container">
        <div>Location info
          <h1>Location Details</h1>
          <button className="btn" onClick={()=>console.log('Anabel')}>Close</button>
          <button onClick={this.editLocationToggle} className="btn">Edit</button>
          <h1>{location.title}</h1>
          <p>{location.description}</p>

          {location.imageUrl.map((img,i)=>(
            <div key={i}>
              <img src={img} alt=""/>
            </div>
          ))}
          </div>
          <div>Comments</div>
          {this.editLocationRender()}
      </div>
    )
  }
}
