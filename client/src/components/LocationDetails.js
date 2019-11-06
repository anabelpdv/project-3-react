import React from 'react'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
  }


  renderLocationDetails=()=>{
    const location= this.props.visibleLocations.find(location => location._id === this.props.match.params.id);
    return(
      <div>
          <h1>{location.title}</h1>
          <h4>{location.description}</h4>
      </div>
      
    )
  }

  render() {
    console.log(this.props.ready)
  // console.log('Location details is rendered')
  // console.log(this.props.visibleLocations)

    return (
      <div>
        {this.props.ready &&
                          
                          <div className="location-details-container">
                            <h1>Location details</h1>
                            {this.renderLocationDetails()}
                          </div>              
                }
      </div>
    )
  }
}
