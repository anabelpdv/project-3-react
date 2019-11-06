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
import Sidebar from './components/Sidebar'



class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount(){
    this.requestUserToDB();
    axios.get("http://localhost:5000/api/checkuser", { withCredentials: true })
    .then(response => {
      const { userDoc } = response.data;
      this.syncCurrentUSer(userDoc);
      console.log('check user in app: ', userDoc)
    })
    .catch(err=>{
      console.log("hellooooooooooo")
          console.log("Err while getting the user from the checkuser route: ", err)
        })
  }

  requestUserToDB(){
    axios.get("http://localhost:5000/api/checkuser", { withCredentials: true })
        .then(response => {
          const { userDoc } = response.data;
          this.syncCurrentUSer(userDoc);
          console.log('Check user in app: ', userDoc)
        })
        .catch(err=>{
          console.log("Err while getting the user from the checkuser route: ", err)
        })
  }

  logout=()=>{
    axios.delete('http://localhost:5000/api/logout',{})
          .then(response=>{
            console.log('This is the data for user###########################',response.data)
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
        <Navbar 
          currentUser = { this.state.currentUser }  
          logout={this.logout}>
        </Navbar>
        <Sidebar>
        </Sidebar>
        <Switch>
            <Route exact path="/" render={ ()=><Home/> }   /> 
            <Route exact path="/signup-page" render = { () => 
                <Signup 
                  currentUser = { this.state.currentUser }   
                  onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }   
                /> 
            }/>
            <Route exact path="/login" render={ (props)=> 
              <Login 
              {...props} 
              currentUser = { this.state.currentUser }   
              onUserChange = { userDoc => this.syncCurrentUSer(userDoc) }  
              /> 
            } /> 
            <Route exact path="/details/:id" render={(props)=>
            <  LocationDetails {...props}/>
            }  /> 
        </Switch>
      </div>
    );
  }
}

export default App;
