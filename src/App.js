import React from 'react';
import './App.css';
import axios from "axios";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from './components/LandingPage'
import LocationDetails from './components/LocationDetails'
import ProtectedRoute from './components/protected-route';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      allLocations:[],
      visibleLocations:[],
      latitude:35.7617,
      longitude:-90.1918,
      locationsReady: false,
      coordinatesReady: false,
      showLogin:false,
      showSignup:false,
    }
  }

  componentDidMount(){
    this.getAllLocations()
    this.requestUserToDB(); 
  }

  showLoginToggle=()=>{
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  showSignupToggle=()=>{
    this.setState({
      showSignup: !this.state.showSignup,
    })
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
            this.props.history.push("/")
          }) 
          .catch(err=>{
            console.log(err);
          })
  }

  syncCurrentUSer(user){
    this.setState({ currentUser: user })
  }


  editLocationToggle=()=>{
    this.setState({
        editLocation:!this.state.editLocation,
    })
}


  render(){
    return (
      <div>
  
        <Switch>

            <Route exact path="/" render={ ()=>< LandingPage
            currentUser = { this.state.currentUser } 
            onUserChange = { userDoc => this.syncCurrentUSer(userDoc) } 
            showLoginToggle = {this.showLoginToggle}
            showSignupToggle = {this.showSignupToggle}
            showLogin={this.state.showLogin}
            showSignup={this.state.showSignup}
            /> }   /> 
            <ProtectedRoute exact path="/home" currentUser={this.state.currentUser}
            component={()=>
            <Home
            logout={this.logout}
            currentUser={this.state.currentUser}
            coordinatesReady={this.state.coordinatesReady}
            visibleLocations={this.state.visibleLocations}
            locationsReady={this.state.locationsReady}
            getAllLocations={this.getAllLocations}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            /> }
            
            />
            <ProtectedRoute exact path="/details" currentUser={this.state.currentUser}
            component={ (props)=> 
                <LocationDetails 
                  {...props} 
                  getAllLocations={this.getAllLocations}
                  editLocationToggle={this.editLocationToggle}
                  currentUser = { this.state.currentUser }  
                  logout={this.logout} 
                /> 
            }/>

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
