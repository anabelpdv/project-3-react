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

  const [currentLocation, setCurrentLocation] = useState(null);

  console.log('Props in map: ', props)
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
          <button onClick={()=>{
            props.currentLocationDetails(currentLocation)
            props.detailsToggle()
          }}>Details</button>
        </div>
        </InfoWindow>
    )} 
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;