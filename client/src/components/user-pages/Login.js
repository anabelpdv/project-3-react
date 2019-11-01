import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class Login extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        email:'',
        password:'',
        message:'',
      }
    }

    genericSync = (e) => {
      const {  name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5000/api/login', this.state, { withCredentials : true })
            .then(response=>{
              const { userDoc } = response.data;
              console.log("user login: ", userDoc)
              this.props.onUserChange(userDoc);
              this.props.history.push(`/`)
            })
            .catch(err=>{
              console.log(err)
            });
    }


    render() {
      const { fullName, email, password } = this.state;
      console.log("user in login: ", this.props.currentUser)
      if(this.props.currentUser){
        return <Redirect to='/' />
      }

      return (
        <section className="login-page">
          <h2>Log in</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Email:</label>
            <input  type='email'
                    value={email}
                    onChange={this.genericSync}
                    name='email'
                    placeholder='user@uxer.com'
            />
            <label>Password:</label>
            <input  type='password'
                    value={password}
                    onChange={this.genericSync}
                    name='password'
                    placeholder='**************'
            />
            <button>Login</button>
          </form>
        </section>
      )
    }
}
