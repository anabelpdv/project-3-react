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
      defaultZoom={10}
      defaultCenter={{ lat: props.latitude, lng: props.longitude}}
      defaultOptions={{ styles: mapStyles, disableDoubleClickZoom: true }}
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
        <div>
          <h1>{currentLocation.title}</h1>
          
          <Link to={{
            pathname:'/details',
            state:{
              location: currentLocation,
            }
          }}> <button>  Details</button></Link>
          
        
        </div>
        </InfoWindow>
    )} 
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;