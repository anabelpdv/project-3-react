import React from "react";
import axios from 'axios'
import AddLocation from "./location-components/AddLocation";
import Map from "./map-components/Map";
import mapStyle from '../mapStyles';



export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state={
            map:{},
            allLocations:[],
            visibleLocations:[],
            markers: [],
            ready: false,
            title:'',
            description:'',
            lat:'',
            lng:'',
        }
    }

    componentDidMount(){
        this.getAllLocations();
    }

    inputHandle=(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        })
    }



    inputCoordinatesHandle=(e)=>{


        this.setState({
            lat: e.latLng.lat(),
            lng:e.latLng.lng()
        })
    }

    formHandle=(e)=>{
        e.preventDefault()
        const newLocation = {
            title:this.state.title,
            description: this.state.description,
            lat: this.state.lat,
            lng: this.state.lng
        }
    
        axios.post('http://localhost:5000/api/locations',newLocation)
                .then(response=>{
                    this.getAllLocations();
                })
                .catch(err=>{
                    console.log(err)
                })
    }

    getAllLocations=()=>{
        axios.get("http://localhost:5000/api/locations")
                .then(response=>{
                    this.setState({
                        allLocations: response.data,
                        visibleLocations: response.data,
                        ready:true,
                    },()=>{
                        this.renderMap();
                    })
                })
                .catch(err=>{
                console.log(err)
                })
    }

    loadScript = (url)=>{
        let index = window.document.getElementsByTagName('script')[0];
        let script = window.document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        index.parentNode.insertBefore(script,index);
    }
    
    renderMap(){
        console.log('Aanbel')
        this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`);
        window.initMap = this.initMap;
    }

    addMarker = () => {
        for(let locations = 0; locations < this.state.allLocations.length; locations++){
            const lat = this.state.allLocations[locations].lat;
            const lng = this.state.allLocations[locations].lng;
            
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
            this.inputCoordinatesHandle(e);
        })
    
        this.addMarker();
    }

    showMarkers = () => {
        this.setMapOnAll(this.state.map);
    }
    
    setMapOnAll = (map) => {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    render(){
        return (
            <section>
                <h1> Dashboard</h1>
                <div id="map"> Hello</div>
                <AddLocation 
                    inputHandle={this.inputHandle} 
                    formHandle={this.formHandle} 
                    getAllLocations={this.getAllLocations} 
                    title={this.state.title} 
                    description={this.state.description}
                    lat={this.state.lat} 
                    lng={this.state.lng}>
                </AddLocation>
            </section>
        )
    }
}