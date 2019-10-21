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
/*****************************************/
  componentDidMount(){
    this.renderMap();
  }


  loadScript = (url)=>{
    let index = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script,index);
  }

/*****************************************/
  renderMap=()=>{
    this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  }
/*****************************************/
  addMarker = (location,info) => {
    var marker = new window.google.maps.Marker({
      position: location,
      map: this.state.map
    });
    let infowindow = new window.google.maps.InfoWindow({
      content: `<div> <button>Submit</button>${info}</div>`
    })
    marker.addListener('mouseover',function(){
      infowindow.open(this.map,marker);
    })

    marker.addListener('mouseout',function(){
      infowindow.close();
    })

    let markersCopy = [...this.state.markers] 

    markersCopy.push(marker);

    this.setState({
      markers:markersCopy
    })
  
  }
/*****************************************/
  initMap = () =>  {
    var myLatlng = {lat:26.6406,lng:-81.8723}
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: myLatlng,
        zoom: 9,
        styles: mapStyle,
        disableDoubleClickZoom: true,
      });
      this.setState({
        map:map,
      })

      map.addListener('dblclick', (event)=> {
        this.addMarker(event.latLng,'this is a test');
      });

    }
/*********************************************************************/


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


