import React from 'react';
import axios from 'axios';

export default class EditLocation extends React.Component {

  constructor(props){
    super(props);
    this.state={
            title:'',
            description:'',
            lat:'',
            lng:'',
    }
  }


  componentDidMount(){
    this.getLocation();
  }

  getLocation=()=>{
    const location = this.props.location;
      this.setState({
              title:location.title,
              description:location.description,
              lat:location.lat,
              lng:location.lng,
              id:location._id
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
                //this.props.getAllLocations();
                this.setState({
                    title:'',
                    description:'',
                    lat:'',
                    lng:'',
                    imageUrl:'',
                })
                this.addLocationToggle()
            })
            .catch(err=>{
                console.log(err)
            })
}

  render() {

    return (

      <div className="edit-location-form">

      <h1>Edit Location</h1>
        <form onSubmit={(e)=>this.editFormHandler(e)}>
          <div>
              <p>Title</p>
              <input className="input-element" onChange={this.inputHandler} type="text" name="title" value={this.state.title}/>
          </div>
          <div >
              <p>Description</p>
              <textarea className="textarea-element" onChange={this.inputHandler} type="text" name="description" value={this.state.description}/>
          </div>
          <div>
              <p>Latitude</p>
              <input className="input-element" onChange={this.inputHandler} type="number" name="lat" value={this.state.lat}/>
          </div>
          <div>
              <p>Longitude</p>
              <input className="input-element" onChange={this.inputHandler} type="number" name="lng" value={this.state.lng}/>
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
