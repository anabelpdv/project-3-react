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
import MapWrapped from './components/Map1'


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      allLocations:[],
      visibleLocations:[],
      latitude:'',
      longitude:'',
      ready: false,
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
                    ready:true,
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
        })
    
  },(positionError)=>{
    this.setState({
      latitude:35.5951,
      longitude:82.5515,
    })
  })
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

            <Route exact path="/details/:id" render={(props)=>
                < LocationDetails 
                {...props}
                visibleLocations={this.state.visibleLocations}
                ready={this.state.ready}
                />
            }  /> 

            <Route exact path="/newMap" render={ (props)=>
            <div  className="newMap">
              <MapWrapped 
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                  process.env.REACT_APP_GOOGLE_KEY
                }`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            </div>
            }   /> 
        </Switch>
      </div>
    );
  }
}

export default App;
