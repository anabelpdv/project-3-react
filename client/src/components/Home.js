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
            imageUrl:'',
        }
    }

    componentDidMount(){
        this.getAllLocations();
    }

    inputHandler=(e)=>{
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

    formHandler=(e)=>{
        e.preventDefault()
        const newLocation = {
            title:this.state.title,
            description: this.state.description,
            lat: this.state.lat,
            lng: this.state.lng,
            imageUrl: this.state.imageUrl,
        }
    
        axios.post('http://localhost:5000/api/locations',newLocation)
                .then(response=>{
                    this.getAllLocations();
                })
                .catch(err=>{
                    console.log(err)
                })
    }

    fileUploadHandler = (e) =>{ 
        console.log('The file to be uploaded is: ', e.target.files[0]);
        const uploadData = new FormData();
        uploadData.append('imageUrl', e.target.files[0])
    
        axios.post('http://localhost:5000/api/uploads',uploadData)
            .then(res =>{
                //********After file is uploaded this line takes time to execute and if save is hit before the same image is save in MongoDb twice
                //*************************** */
                //*************************** */
                this.setState({imageUrl: res.data.secure_url});
            })
            .catch(err=>{
                console.log('Error while uploading the file: ', err);
            });
    }

    getAllLocations=()=>{
        axios.get("http://localhost:5000/api/locations")
                .then(response=>{
                    this.setState({
                        allLocations: response.data,
                        visibleLocations: response.data,
                        ready:true,
                    },()=>{
                     //this.renderMap()
                    })
                })
                .catch(err=>{
                console.log(err)
                })
    }

    render(){
        return (
            <section>
                {this.state.ready &&
                                        <Map 
                                            allLocations={this.state.allLocations}
                                            inputCoordinatesHandle={this.inputCoordinatesHandle}
                                        />
                }
                <AddLocation 
                    inputHandler={this.inputHandler} 
                    fileUploadHandler={this.fileUploadHandler}
                    formHandler={this.formHandler} 
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

