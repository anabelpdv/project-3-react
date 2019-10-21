import React from 'react';
import axios from 'axios';

export default class AddLocation extends React.Component {

  constructor(props){
    super(props);
    this.state={
                title:'',
                description:'',
                lat:'',
                lng:''
              }
  }

  inputHandle=(e)=>{
    console.log(e.target.name)
    const  name  = e.target.name;
    const value  = e.target.value;
    this.setState({
      [name]: value,
    })
  }

  formHandle=(e)=>{
    e.preventDefault()
    const newLocation = {
      title:this.state.title,
      description: this.state.description,
      lat: this.state.lat,
      lng: this.state.lng
    }

    axios.post('http://localhost:5000/api/locations',newLocation)
          .then(response=>{
            console.log(response)
          })
          .catch(err=>{
            console.log(err)
          })
  }

  render() {
    return (
      <div className="add-location-form">
        <form onSubmit={this.formHandle}>
        <label>Title</label>
        <input onChange={this.inputHandle} type="text" name="title" value={this.state.value}/>
        <label>Description</label>
        <input onChange={this.inputHandle} type="text" name="description" value={this.state.description}/>
        <label>Latitude</label>
        <input onChange={this.inputHandle} type="number" name="lat" value={this.state.lat}/>
        <label>Longitude</label>
        <input onChange={this.inputHandle} type="number" name="lng" value={this.state.lng}/>
        <button>Save Location</button>
        </form> 
      </div>
    )
  }
}
