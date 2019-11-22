import React,{useState} from "react";
import { Link } from "react-router-dom";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "../mapStyles";

function Map(props) {

  const [currentLocation, setCurrentLocation] = useState(null);

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: props.latitude, lng: props.longitude}}
      defaultOptions={{ 
        styles: mapStyles, 
        disableDoubleClickZoom: true,
        mapTypeControl:false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
      onDblClick={(e)=>{
        props.addLocationToggle()
        props.inputCoordinatesHandle(e);
      }}
    >
    {props.visibleLocations.map(location=>(
    <Marker 
      key={location._id}
      position = {{ 
        lat: location.lat,
        lng: location.lng }}
        onClick={()=>{
          setCurrentLocation(location);
        }}
        icon={{
          url: `/marker.png`,
          scaledSize: new window.google.maps.Size(40, 40)
        }}
      />
    ))}
      {currentLocation && (
      <InfoWindow 
        position = {{ 
          lat: currentLocation.lat,
          lng: currentLocation.lng }}
          onCloseClick={()=>{
            setCurrentLocation(null);
        }}
        >
        <div className="info-window">
          <h6>{currentLocation.title}</h6>
          <Link to={{
            pathname:'/details',
            state:{
              location: currentLocation,
            }
          }}> 
          
          <img className="info-window-img" src={currentLocation.imageUrl[0]} alt=""/>
          </Link>
          
        
        </div>
        </InfoWindow>
    )} 
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;