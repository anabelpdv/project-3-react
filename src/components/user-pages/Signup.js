import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



export default class Signup extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      fullName: '',
      email: '',
      password: '',
      message:null,
    }
  }

  genericSync = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/signup`, this.state, {withCredentials: true})
          .then(response =>{
            const { userDoc } = response.data;
            this.props.showSignupToggle();
            this.props.history.push('/home')
            this.props.onUserChange(userDoc);
          })
          .catch(err=>{
            console.log('Error in signup: ', err);
          })
  }

  render() {

    const { fullName, email, password } = this.state;

    console.log("is user in signup: ", this.props.currentUser)
    if(this.props.currentUser){
      return <Redirect to='/home' />
    }
    return (
        <div className="login-container">
          <h2>Sign up</h2>
            <form onSubmit={this.handleSubmit}>
            <label>Full name:</label>
              <div>
              <input type="text"
                      className="user-input"
                      value={fullName}
                      onChange={this.genericSync}
                      name="fullName"
                      placeholder="First Last "
              />
              </div>
              <label>Email:</label>
              <div>
                <input type="email"
                        className="user-input"
                        value={email}
                        onChange={this.genericSync}
                        name="email"
                        placeholder='user@uxer.com'
                />
              </div>
              <label>Password:</label>
              <div>
                <input type="password"
                        className="user-input"
                        value={password}
                        onChange={this.genericSync}
                        name="password"
                        placeholder='*************'
                />
              </div>
              
              <button className="btn">Signup</button>
              <button onClick={this.props.showSignupToggle}className="btn">Cancel</button>
            </form>
            {this.state.message && <div>{this.state.message}</div>} 
        </div>
    )
  }
}
