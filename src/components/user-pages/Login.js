import React from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';


class Login extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        email:'',
        password:'',
        message:'',
      }
    }

    genericSync = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`${process.env.REACT_APP_API_URL}/login`, this.state, { withCredentials : true })
            .then(response=>{
              const { userDoc } = response.data;
              console.log("user login: ", userDoc)
              this.props.onUserChange(userDoc);
              this.props.showLoginToggle();
              this.props.history.push(`/home`)
            })
            .catch(err=>{
              console.log(err)
            });
    }


    render() {
      const { fullName, email, password } = this.state;
      if(this.props.currentUser){
        return <Redirect to='/home' />
      }

      return (
        <div className="login-container">
          <h2>Log in</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Email:</label>
            <div>
              <input
              className="user-input"  
              type='email'
              value={email}np
              onChange={this.genericSync}
              name='email'
              placeholder='user@uxer.com'
              />
            </div>
            <label>Password:</label>
            <div>
              <input 
              className="user-input" 
              type='password'
              value={password}
              onChange={this.genericSync}
              name='password'
              placeholder='**************'
              />
            </div>
            <button className="btn">Login</button>
            <button onClick={this.props.showLoginToggle}className="btn">Cancel</button>
          </form>
          
        </div>
      )
    }
}


export default withRouter(Login)
