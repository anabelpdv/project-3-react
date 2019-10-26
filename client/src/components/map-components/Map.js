import React, { Component } from 'react'
import mapStyle from '../../mapStyles';

export default class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
      map:'',
      markers: [],
    }
  }

  componentDidMount(){
    this.renderMap();
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
    this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  }

  addMarker = () => {
    for(let locations = 0; locations < this.props.allLocations.length; locations++){
        const lat = this.props.allLocations[locations].lat;
        const lng = this.props.allLocations[locations].lng;
        
        var marker = new window.google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: this.state.map
        });

        let markersCopy = [...this.state.markers] 

        markersCopy.push(marker);
        this.setState({
          markers:markersCopy
        });
    }
  }

  initMap = () =>  {
    var myLatlng = {lat:25.7617,lng:-80.1918}
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: myLatlng,
        zoom: 9,
        styles: mapStyle,
        disableDoubleClickZoom: true,
      });
      this.setState({
        map:map,
      })

      map.addListener('dblclick',(e)=>{
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


