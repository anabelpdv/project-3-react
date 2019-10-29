import React from 'react';
import './App.css';
import axios from "axios";
import { Switch, Route, NavLink } from "react-router-dom";
import Signup from "./components/user-pages/Signup";
import Home from "./components/Home";
import Login from "./components/user-pages/Login";
import Map from "./components/Map";
import Navbar from './components/Navbar'
import LocationDetails from './components/LocationDetails'


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount(){
    this.requestUserToDB();
  }

  requestUserToDB(){
    axios.get("http://localhost:5000/api/checkuser", { withCredentials: true })
        .then(response => {
          const { userDoc } = response.data;
          this.syncCurrentUSer(userDoc);
        })
        .catch(err=>{
          console.log("Err while getting the user from the checkuser route: ", err)
        })
  }

  logout=()=>{
    axios.delete('http://localhost:5000/api/logout',{})
          .then(response=>{
            console.log(response.data)
            this.setState({
              currentUser:null,
            })

          }) 
          .catch(err=>{
            console.log(err);
          })
  }

  syncCurrentUSer(user){
    this.setState({ currentUser: user })
  }

  render(){
    return (
      <div>
        <Navbar logout={this.logout}></Navbar>
        <Switch>
            <Route exact path="/" render={ ()=><Home/> }   /> 
            <Route exact path="/signup-page" render = { () => 
                <Signup 
                  currentUser = { this.state.currentUser }   
                  onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }   
                /> 
            }/>
            <Route exact path="/login" render={ ()=> <Login onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }  /> }   /> 
            <Route exact path="/details" render={ ()=> <LocationDetails onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }  /> }   /> 
        </Switch>
      </div>
    );
  }
}

export default App;
