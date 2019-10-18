import React from 'react';

import './App.css';

import axios from "axios";

import { Switch, Route, NavLink } from "react-router-dom";


import Signup from "./components/user-pages/Signup";

import Home from "./components/Home";
import Login from "./components/user-pages/Login";


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  componentDidMount(){
    axios.get("http://localhost:5000/api/checkuser", { withCredentials: true })
        .then(response => {
          const { userDoc } = response.data;
          this.syncCurrentUSer(userDoc);
        })
        .catch(err=>{
          console.log("Err while getting the user from the checkuser route: ", err)
        })
  }

  syncCurrentUSer(user){
    this.setState({ currentUser: user })
  }

  render(){
    return (
      <div>
          <header>
          <nav>
            <NavLink to="/" > Home </NavLink>
            <NavLink to="/signup-page"> Signup </NavLink>
            <NavLink to="/login"> Login </NavLink>
            
          </nav>
        </header>
        <Switch>
            <Route exact path="/" component={ Home }   /> 
            <Route exact path="/signup-page" render = { () => 
                <Signup 
                  currentUser = { this.state.currentUser }   
                  onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }   
                /> 
            }/>
            <Route exact path="/login" component={ Login }   /> 
        </Switch>
      </div>
    );
  }
}

export default App;
