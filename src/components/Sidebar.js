import React from 'react'
import { NavLink } from "react-router-dom";

export default class Sidebar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="sidebar-container">
        <NavLink className="brand-sidebar" to="/home">U-XER</NavLink>
        <div className="user-info-container">
              <div className="profile-image-container">
              </div>
              {this.props.currentUser && <p className="user-name">Welcome back {this.props.currentUser.fullName}!</p>}
        </div>
        <div className="sidebar-element">
            <button className="icon-btn"onClick={this.props.addLocationToggle}>
            <i className="fas fa-map-marker-alt"></i>
            </button>
            <p>Add Location</p>
        </div>
        <div className="sidebar-element">
            <button className="icon-btn">
            <i class="fas fa-heart"></i>
            </button>
            <p>Favorites</p>
        </div>
        <div className="sidebar-element">
          <button className="icon-btn">
          <i className="fas fa-search"></i>
          </button>
          <p>Search</p> 
        </div>
        <div className="sidebar-element">
          <button className="icon-btn">
          <i class="fas fa-globe-americas"></i>
          </button>
          <p>List All</p>
        </div>
        <div className="sidebar-element">
          <button className="icon-btn"  onClick={this.props.logout}>
          <i class="fas fa-sign-out-alt"></i>
          </button> 
          <p>Logout </p>
        </div>
              

      </div>

      
    )
  } 
}
