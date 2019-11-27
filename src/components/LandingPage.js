  import React, { Component } from 'react'
  import  Login from './user-pages/Login';
  import  Signup from './user-pages/Signup';

class LandingPage extends Component {
  render() {
    return (
    <div>
        <div className="pimg1">
            <div class="ptext">
                  <nav className="login-navbar">
                    {/* <button onClick={this.props.showSignupToggle}className="signup-btn" to="/signup-page"> Sign Up </button> */}
                    <button className="signup-btn" to="/signup-page"> Sign Up </button>
                    <span class="brand-text">U-XER</span>
                    <button onClick={this.props.showLoginToggle} className="login-btn" to="/login"> Log In </button>
                  </nav>
                  <div className="overlay"/>

                  {this.props.showLogin &&
                  <Login 
                  showLoginToggle={this.props.showLoginToggle}
                  currentUser = { this.props.currentUser }   
                  onUserChange = { this.props.onUserChange }  
                /> 
              }
              {this.props.showSignup &&
                  <Signup 
                  showSignupToggle={this.props.showSignupToggle}
                  currentUser = { this.props.currentUser }  
                  onUserChange = { this.props.onUserChange }    
                  /> 
              } 
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
            <p>Share your locations and upload images so that anyone can see GPS coords and know what to expect.</p>
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

  export default (LandingPage)