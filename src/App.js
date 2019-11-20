import React from 'react';
import './App.css';
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/user-pages/Signup";
import Home from "./components/Home";
import Login from "./components/user-pages/Login";
import LocationDetails from './components/LocationDetails'
import Sidebar from './components/Sidebar'


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      allLocations:[],
      visibleLocations:[],
      latitude:25.4,
      longitude:-80.555,
      locationsReady: false,
      coordinatesReady: false,
    }
  }

  componentDidMount(){
    this.getAllLocations()
    this.requestUserToDB(); 
    this.getCurrentCoordinates();
  }

  getAllLocations=()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/locations`)
            .then(response=>{
                this.setState({
                    allLocations: response.data,
                    visibleLocations: response.data,
                    locationsReady:true,
                })
            })
            .catch(err=>{
            console.log(err)
            })
}

  requestUserToDB(){
    axios.get(`${process.env.REACT_APP_API_URL}/checkuser`, { withCredentials: true })
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
    axios.post(`${process.env.REACT_APP_API_URL}/logout`,{}, { withCredentials: true })
          .then(response=>{
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

  getCurrentCoordinates = () =>{
      navigator.geolocation.getCurrentPosition((position)=>{
        this.setState({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          coordinatesReady:true,
        })
    
  })}

  editLocationToggle=()=>{
    this.setState({
        editLocation:!this.state.editLocation,
    })
}


  render(){
    return (
      <div>
  
        <Switch>
            <Route exact path="/" render={ ()=>< Home
                currentUser={this.state.currentUser}
                coordinatesReady={this.state.coordinatesReady}
                visibleLocations={this.state.visibleLocations}
                locationsReady={this.state.locationsReady}
                getAllLocations={this.getAllLocations}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
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

            <Route exact path="/details" render={ (props)=> 
                <LocationDetails 
                  {...props} 
                  getAllLocations={this.getAllLocations}
                  editLocationToggle={this.editLocationToggle}
                  currentUser = { this.state.currentUser }   
              
                /> 
            }/>

        </Switch>
        <Sidebar 
            logout={this.logout}
            currentUser={this.state.currentUser}
            >   
        </Sidebar>
      </div>
    );
  }
}

export default App;
