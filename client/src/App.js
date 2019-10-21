import React from 'react';
import './App.css';
import axios from "axios";
import { Switch, Route, NavLink } from "react-router-dom";
import Signup from "./components/user-pages/Signup";
import Home from "./components/Home";
import Login from "./components/user-pages/Login";
import Logout from "./components/user-pages/Logout";
import Map from "./components/map-components/Map";


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser: null,
      allLocations:[],
      visibleLocations:[],
      ready: false,
    }
  }

  componentDidMount(){
    this.requestUserToDB();
    this.getAllLocations();
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

  getAllLocations(){
    axios.get("http://localhost:5000/api/locations")
          .then(response=>{
            console.log(response.data)
            this.setState({
              allLocations: response.data,
              visibleLocations: response.data,
              ready:true,
            })
          })
          .catch(err=>{
            console.log(err)
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
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/signup-page"> Signup </NavLink>
            <NavLink to="/login"> Login </NavLink>
            <NavLink to="/logout"> Logout </NavLink> 
          </nav>
        </header>
        <Switch>
            <Route exact path="/" render={ ()=><Home ready={this.state.ready} allLocations={this.state.visibleLocations}/> }   /> 
            <Route exact path="/signup-page" render = { () => 
                <Signup 
                  currentUser = { this.state.currentUser }   
                  onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }   
                /> 
            }/>
            <Route exact path="/login" render={ ()=> <Login onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }  /> }   /> 
            <Route exact path="/logout" render={ () => 
                <Logout 
                currentUser = { this.state.currentUser }
                onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }
                /> }/> 
        </Switch>
      </div>
    );
  }
}

export default App;
