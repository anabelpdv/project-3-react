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
              locationReady:true,

      },()=>{
        this.getComments();
      })
  }

  getComments=()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/comments/${this.state.id}`)
          .then(response=>{
            console.log('this is the response',response.data)
              this.setState({
                comments:response.data.reverse(),
              })
          })
          .catch(err=>{
            console.log(err)
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
                  />
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
                  <Carousel className="carousel">
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
                    <div className="description-box">
                      <h1>{this.state.title}</h1>
                      <p className>{this.state.description}</p>
                    </div>
                    <button className="details-btn" onClick={()=>this.props.history.push('/home')}>Close</button>
                    <button onClick={this.editLocationToggle} className="details-btn">Edit</button>
                </div>
                <div className="comments-box">
                        <button className="icon-btn comment"><i className="far fa-comments"></i></button> 
                        <AddComment
                        getComments={this.getComments}
                        locationId={this.state.locationId}
                        currentUser={this.props.currentUser}
                        />
                      
                        <div className="comments-container">        
                            {this.state.comments.map((comment,i)=>(
                                    <div key={i}> 
                                      <div className="comment-bubble">
                                        <p className="comment-content"><span>{comment.author.fullName}</span> {comment.content}</p>  
                                      </div>
                                    </div>
                                ))} 
                        </div>
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
    return (
        <div>
          {this.renderDetails()}
        </div>
    )
  }
}
