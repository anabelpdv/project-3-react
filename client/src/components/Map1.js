import React,{useState} from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "../mapStyles";


function Map() {

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  let pos = null;
  navigator.geolocation.getCurrentPosition((position)=>{
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  })

console.log('This is my hook',lat)
console.log('This is my hook',lng)
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
      defaultOptions={{ styles: mapStyles, disableDoubleClickZoom: true }}
      onDblClick={(e)=>console.log('This is the event', e.latLng.lat())}
    >
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;