import React from 'react';
import './App.css';
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/user-pages/Signup";
import Home from "./components/Home";
import Login from "./components/user-pages/Login";
import Navbar from './components/Navbar'
import LocationDetails from './components/LocationDetails'
import Sidebar from './components/Sidebar'



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      allLocations:[],
      visibleLocations:[],
      ready: false,
    }
  }

  componentDidMount(){
    this.getAllLocations()
    this.requestUserToDB(); 
  }


  getAllLocations=()=>{
    axios.get("http://localhost:5000/api/locations")
            .then(response=>{
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

  requestUserToDB(){
    axios.get("http://localhost:5000/api/checkuser", { withCredentials: true })
        .then(response => {
          console.log('Im getting user')
          const { userDoc } = response.data;
          this.syncCurrentUSer(userDoc);
          console.log('Check user in app: ', userDoc)
        })
        .catch(err=>{
          console.log("Err while getting the user from the checkuser route: ", err)
        })
  }

  logout=()=>{
    axios.post('http://localhost:5000/api/logout',{})
          .then(response=>{
            console.log('This is the data for user###########################',response.data)
            this.setState({
              currentUser:response.userDoc,
            })
            this.props.history.push(`/login`)
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
            <Route exact path="/" render={ ()=>< Home
                visibleLocations={this.state.visibleLocations}
                ready={this.state.ready}
                getAllLocations={this.getAllLocations}
            /> }   /> 

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
                < LocationDetails 
                {...props}
                visibleLocations={this.state.visibleLocations}
                ready={this.state.ready}
                />
            }  /> 
        </Switch>
      </div>
    );
  }
}

export default App;
