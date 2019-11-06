import React, { Component } from 'react'
import mapStyle from '../mapStyles';
import { BrowserRouter, Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";



export default class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
      map:'',
      markers: [],
      notifications: 'Anabelita'
    }
  }

  componentDidMount(){
    this.renderMap();
  }

  componentDidUpdate(prevprops, prevstate){
    if(prevprops.visibleLocations.length !== this.props.visibleLocations.length){
      this.addMarker();
    }
  }


  loadScript=(url)=>{
    let index = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script,index);
  }

  renderMap=()=>{
    this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places&callback=initMap`);
    window.initMap = this.initMap;
  }


  hello=()=>{
    console.log('Hello')
  }

    InfoWindowContent =(location)=>{
      return(
        <div className="container-infoWindow">
          <h6>{location.title}</h6>
          <h1>{location._id}</h1>
          <img className="image-infoWindow" alt="" src={location.imageUrl[0]}/>
          <BrowserRouter>
              <Link to={`/details/${location._id}`}>Details </Link>
          </BrowserRouter> 
        </div>
      )
    }

  addMarker = () => {
    for(let locations = 0; locations < this.props.visibleLocations.length; locations++){
        const lat = this.props.visibleLocations[locations].lat;
        const lng = this.props.visibleLocations[locations].lng;
        
        let marker = new window.google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: this.state.map
        });

        let infowindow = new window.google.maps.InfoWindow({
          content:'',
        });

        marker.addListener('click', ()=>{
          const content = ReactDOMServer.renderToString(this.InfoWindowContent(this.props.visibleLocations[locations]));
      
          infowindow.setContent(content);
          infowindow.open(this.map, marker);
        });


        let markersCopy = [...this.state.markers] 

        markersCopy.push(marker);
        this.setState({
          markers:markersCopy
        });
    }
  }

  initMap = () =>  {


    //var myLatlng = {lat:25.7617,lng:-80.1918}
  
      let map = new window.google.maps.Map(document.getElementById('map'),{styles: mapStyle,disableDoubleClickZoom: true });

      navigator.geolocation.getCurrentPosition(function(position) {
        // Center on user's current location if geolocation prompt allowed
        var initialLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude-0.7);
        map.setCenter(initialLocation);
        map.style=mapStyle;
        map.setZoom(9);
      }, function(positionError) {
        // User denied geolocation prompt - default to Chicago
        map.setCenter(new window.google.maps.LatLng(35.74750449199224, -86.7035884912965));
        map.style=mapStyle;
        map.setZoom(5);
  });

      this.setState({
        map:map,
      })

      map.addListener('dblclick',(e)=>{
        this.props.addLocationToggle();
        this.props.inputCoordinatesHandle(e);
    })

      this.addMarker();
    }

    setMapOnAll = (map) => {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    }

    showMarkers = () => {
      this.setMapOnAll(this.state.map);
    }
    
    

  render() {
    return (
      <main>
        <div id="map"></div> 
      </main>
    )
  }
}


