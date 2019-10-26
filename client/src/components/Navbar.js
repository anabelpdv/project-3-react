import React from 'react'
import { NavLink } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
          <header>
          <nav className="my-navbar">
            <NavLink className="navbar-link" to="/">U-Xer</NavLink>
            <NavLink className="navbar-link" to="/signup-page"> Signup </NavLink>
            <NavLink className="navbar-link" to="/login"> Login </NavLink>
            <span className="navbar-link btn-logout"  onClick={this.props.logout}>Logout</span>  
          </nav>
        </header>
      </div>
    )
  }
}
