import React from 'react'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const location = this.props.currentLocation;
    return (
      <div className="details-background">
        <button className="btn" onClick={this.props.detailsToggle}>Close</button>
        <h1>{location.title}</h1>
        <h4></h4>
      </div>
    )
  }
}
