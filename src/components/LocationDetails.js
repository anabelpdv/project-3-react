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
          <div className="gallery" id="gallery">
            {location.imageUrl.map(image =>{
              return(
                  <div className="mb-3 pics animation all 2">
                    <img className="img-fluid" src={image} alt="Card image cap"/>
                  </div>
                
              )
            })
            }
          </div> 
      </div>
      
    )
  }

  render() {
  //console.log('Location details is rendered')
    return (
      <div className="details-background">
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
