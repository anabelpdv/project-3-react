import React from 'react';
import axios from 'axios';


export default class Login extends React.Component {

    constructor(){
      super();
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
      axios.post('http://localhost:5000/api/login', this.state, { withCredential : true })
            .then(response=>{
              const { userDoc } = response.data;
              this.props.onUserChange(userDoc);
              alert('You are logged in')
            })
            .catch(err=>{
              console.log(err)
              if(err.response.data){
                return this.setState({ messsage: err.response.data.message })
              }
            });
    }


    render() {
      const { fullName, email, password } = this.state;

      return (
        <section>
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
