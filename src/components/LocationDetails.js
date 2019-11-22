import React from 'react'
import EditLocation from './EditLocation'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import Sidebar from './Sidebar'

import AddComment from  './AddComment'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      description:'',
      lat:'',
      lng:'',
      imageUrl:[],
      comments:[],
      editLocation:false,
      locationReady:false,
      addComment:false,
    }
  }


  componentDidMount(){
    this.getLocation();
  }

  getLocation=()=>{
    const location = this.props.location.state.location
      this.setState({
              locationId:location._id,
              title:location.title,
              description:location.description,
              lat:location.lat,
              lng:location.lng,
              id:location._id,
              imageUrl: location.imageUrl,
              comments:location.comments,
              locationReady:true,

      })
  }

  editLocationToggle=()=>{
    this.setState({
        editLocation:!this.state.editLocation,
    })
  }

  addCommentToggle=()=>{
      this.setState({
        addComment:!this.state.addComment,
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


  renderDetails=()=>{
    if(this.state.locationReady){
      return(
        <div className="location-wrapper">
          <div className="location-details-container">
              <div className="details-box">
                  <button className="btn" onClick={()=>this.props.history.push('/home')}>Close</button>
                  <button onClick={this.editLocationToggle} className="btn">Edit</button>
                  <button onClick={this.addCommentToggle} className="btn">Comment</button>
                  <Carousel>
                      {this.state.imageUrl.map((photo,i)=>(
                              <Carousel.Item key={i}>
                                <img 
                                    className="carousel-image"
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

                {this.state.addComment   && 
                                                <AddComment
                                                  addCommentToggle={this.addCommentToggle}
                                                  locationId={this.state.locationId}
                                                  currentUser={this.props.currentUser}
                                                />
                }
                    
                    {this.state.comments.map((comment,i)=>(
                            
                             // <p>{cooment.author}</p>             
                              <p>{comment.content}</p>
                        
                        ))}                  
                  </div>
                {this.editLocationRender()}
        </div>
        <Sidebar 
                    logout={this.props.logout}
                    currentUser={this.props.currentUser}
                /> 
        </div>
      )
    }
  }


  render() {
    console.log(this.state.comments)
    return (
        <div>
          
          {this.renderDetails()}
        </div>
    )
  }
}
