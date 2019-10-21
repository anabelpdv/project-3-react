import React, { Component } from 'react'
import axios from 'axios'

export default class Logout extends Component {

logout=()=>{
  axios.delete('http://localhost:5000/api/logout',this.props.currentUser)
        .then(response=>{
          console.log(response.data)

          const { userDoc } = response.data;
          this.props.onUserChange(userDoc);
        }) 
        .catch(err=>{
          console.log(err);
        })
}
  render() {
    return (
      <div>
        <button onClick={this.logout}>Logout</button>  
      </div>
    )
  }
}
