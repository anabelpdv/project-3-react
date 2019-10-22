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



  // formHandle=(e)=>{
  //   e.preventDefault()
  //   const newLocation = {
  //     title:this.state.title,
  //     description: this.state.description,
  //     lat: this.state.lat,
  //     lng: this.state.lng
  //   }

  //   axios.post('http://localhost:5000/api/locations',newLocation)
  //         .then(response=>{
  //           this.props.getAllLocations();
  //         })
  //         .catch(err=>{
  //           console.log(err)
  //         })
  // }

  render() {
    return (
      <div className="add-location-form">
        <form onSubmit={(e) =>this.props.formHandle(e)}>
        <label>Title</label>
        <input onChange={this.props.inputHandle} type="text" name="title" value={this.props.title}/>
        <label>Description</label>
        <input onChange={this.props.inputHandle} type="text" name="description" value={this.props.description}/>
        <label>Latitude</label>
        <input onChange={this.props.inputHandle} type="number" name="lat" value={this.props.lat}/>
        <label>Longitude</label>
        <input onChange={this.props.inputHandle} type="number" name="lng" value={this.props.lng}/>
        <button>Save Location</button>
        </form> 
      </div>
    )
  }
}
