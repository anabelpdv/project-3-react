import React from 'react'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
        console.log('Rendering Location details')
    return (
      <div className="location-details-container">
        <h1>Location Details</h1>
        {/* <button className="btn" onClick={this.props.detailsToggle}>Close</button>
        <span onClick={()=>this.props.editLocationToggle()} className="edit-button"><i className="far fa-edit"></i></span>
        <h1>{location.title}</h1>
        <p>{location.description}</p>

        {location.imageUrl.map((img,i)=>(
          <div key={i}>
            <img src={img} alt=""/>
          </div>
        ))} */}
      </div>
    )
  }
}
