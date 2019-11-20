import React from 'react'
import EditLocation from './EditLocation'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      description:'',
      lat:'',
      lng:'',
      imageUrl:[],
      editLocation:false,
      locationReady:false,
    }
  }


  componentDidMount(){
    this.getLocation();
  }

  getLocation=()=>{
    const location = this.props.location.state.location

    console.log('This is the location Im getting in this component', location)
      this.setState({
              title:location.title,
              description:location.description,
              lat:location.lat,
              lng:location.lng,
              id:location._id,
              imageUrl: location.imageUrl,
              locationReady:true,

      })
  }

  editLocationToggle=()=>{
    this.setState({
        editLocation:!this.state.editLocation,
    })
  }


  inputHandler=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value,
    })
  }


  editFormHandler=(e)=>{
    e.preventDefault()
    const editedLocation ={
      title: this.state.title,
      description: this.state.description,
      lat: this.state.lat,
      lng: this.state.lng,
    }

    axios.post(`${process.env.REACT_APP_API_URL}/locations/${this.state.id}`,editedLocation)
            .then(response=>{
                this.props.getAllLocations()
                this.addLocationToggle()
            })
            .catch(err=>{
                console.log(err)
            })
  }

  editLocationRender=()=>{
      if(this.state.editLocation){
          return(
              <div>
                  <EditLocation
                      inputHandler={this.inputHandler} 
                      editFormHandler={this.editFormHandler} 
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

  // renderCarousel=()=>{
  //   return(
  //     <Carousel>
  //         {this.state.imageUrl.map((photo,i)=>{
  //             return(
                
  //               <Carousel.Item>
  //               <Carousel.Item>
                
  //             )
  //         })}

  //     </Carousel>
  //   )
  // }

  renderDetails=()=>{
    if(this.state.locationReady){
      return(
        <div className="location-wrapper">
          <div className="location-details-container">
              <div className="details-box">
                  <button className="btn" onClick={()=>this.props.history.push('/')}>Close</button>
                  <button onClick={this.editLocationToggle} className="btn">Edit</button>
                  <button onClick={()=>console.log('I do nothing')} className="btn">Comment</button>
                  <Carousel>
                      {this.state.imageUrl.map((photo,i)=>(
                              <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src={photo}
                                alt="First slide"
                              />
                            </Carousel.Item>
                        ))}
                  </Carousel>
                  <h1>{this.state.title}</h1>
                  <p>{this.state.description}</p>
                </div>
                <div className="comments-box">
                  <h1>Comments here</h1>
                </div>
                {this.editLocationRender()}
        </div>
        </div>
      )
    }
  }


  render() {

    return (
        <div>
          {this.renderDetails()}
        </div>
    )
  }
}
