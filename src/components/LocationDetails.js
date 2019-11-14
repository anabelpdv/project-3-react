import React from 'react'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log("this is the props. .. ... ", this.props);
    const location = this.props.currentLocation;
    return (
      <div className="location-details-container">
        <button className="btn" onClick={this.props.detailsToggle}>Close</button>
        <span onClick={()=>this.props.editLocationToggle()} className="edit-button"><i className="far fa-edit"></i></span>
        <h1>{location.title}</h1>
        <p>{location.description}</p>

        {location.imageUrl.map((img,i)=>(
          <div key={i}>
            <img src={img} alt=""/>
          </div>
        ))}
        <h4></h4>
      </div>
    )
  }
}
