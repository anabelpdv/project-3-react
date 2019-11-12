import React,{useState} from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "../mapStyles";


function Map(props) {

  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setcurrentLng] = useState(0);

  let pos = null;
  navigator.geolocation.getCurrentPosition((position)=>{
    setCurrentLat(position.coords.latitude)
    setcurrentLng(position.coords.longitude)
  },(positionError)=>{

})

console.log('This are my props',props.visibleLocations)


  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: props.latitude, lng: props.longitude}}
      defaultOptions={{ styles: mapStyles, disableDoubleClickZoom: true }}
      onDblClick={(e)=>console.log('This is the event', e.latLng.lat())}
    >
    {props.visibleLocations.map(location=>(
    <Marker 
      key={location._id}
      position = {{ 
        lat: location.lat,
        lng: location.lng }}
    /> 
    ))}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;