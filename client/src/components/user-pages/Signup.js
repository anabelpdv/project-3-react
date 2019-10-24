import React from 'react';
import axios from 'axios';



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
    axios.post('http://localhost:5000/api/signup', this.state, {withCredentials: true})
          .then(response =>{
            const { userDoc } = response.data;
            this.props.onUserChange(userDoc);
          })
          .catch(err=>{
            console.log('Error in signup: ', err);
          })
  }

  render() {

    const { fullName, email, password } = this.state;

    if(this.props.currentUser){
      return (
        <div>
          <h2>Welcome to your app, {this.props.currentUser.fullName}  You're signed in!</h2>
        </div>
      )
    }
    return (
        <section className="signup-page">
          <h2>Sign up</h2>
            <form onSubmit={this.handleSubmit}>
            <label>Full name:</label>
              <input type="text"
                      value={fullName}
                      onChange={this.genericSync}
                      name="fullName"
                      palceholder="Anabel"
              />
              <label>Email:</label>
              <input type="email"
                      value={email}
                      onChange={this.genericSync}
                      name="email"
                      placeholder='user@uxer.com'
              />
              <label>Password:</label>
              <input type="password"
                      value={password}
                      onChange={this.genericSync}
                      name="password"
                      placeholder='*************'
              />
              <button>Sign up</button>
            </form>
            {this.state.message && <div>{this.state.message}</div>} 
        </section>
    )
  }
}
