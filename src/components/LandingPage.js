  import React, { Component } from 'react'
  import { NavLink } from "react-router-dom";

  export default class LandingPage extends Component {
  render() {
    return (
    <div>
        <div className="pimg1">
            <div class="ptext">
                  <nav className="login-navbar">
                    <NavLink className="signup-btn" to="/signup-page"> Signup </NavLink>
                    <span class="brand-text">U-XER</span>
                    <NavLink className="login-btn" to="/login"> Login </NavLink>
                  </nav>
                  <div className="overlay"/>
            </div>
        </div>
        <section className="section section-light">
          <div className="section-box">
            <div className="icon">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <h4>Find</h4>
          <p>U-XER is a collection of abandoned locations uploaded by a growing community of urban explorers and photographers around the world.</p>
          </div>
          <div className="section-box">
            <div className="icon">
              <i className="fas fa-camera"></i>
            </div>
            <h4>Mark</h4>
            <p>Share your locations so that anyone can see GPS coords and upload images of places so that everyone knows what to expect.</p>
            </div>
          <div className="section-box">
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
            <h4>Protect</h4>
            <p>U-XER is a community for explorers and photographers that respect the sites. We protect locations, by taking only photos and leaving nothing but footprints.</p>
          </div>
        </section>
      <div className="pimg2">
        <div className="ptext">
        <div className="overlay"/>
        </div>
        </div>
      <section className="section section-dark">
        
      </section>
    </div>
    )
  }
  }
