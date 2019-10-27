import React from "react";
import axios from 'axios'
import AddLocation from "./location-components/AddLocation";
import Map from "./map-components/Map";
import Sidebar from "./Sidebar";




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
            imageUrl:null,
            addLocation:false,
        }
    }

    componentDidMount(){
        this.getAllLocations();
    }

    addLocationToggle=()=>{
        this.setState({
            addLocation:!this.state.addLocation,
        })
    }

    addLocationRender=()=>{
        if(this.state.addLocation){
            return(
                <div>
                    <AddLocation 
                        inputHandler={this.inputHandler} 
                        fileUploadHandler={this.fileUploadHandler}
                        formHandler={this.formHandler} 
                        getAllLocations={this.getAllLocations} 
                        title={this.state.title} 
                        description={this.state.description}
                        lat={this.state.lat} 
                        lng={this.state.lng}
                        addLocationToggle={this.addLocationToggle}
                        >
                    </AddLocation>
                </div>
            )
        }     
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

        const uploadData = new FormData();
        
        uploadData.append('title', this.state.title);
        uploadData.append('description', this.state.description);
        uploadData.append('lat', this.state.lat);
        uploadData.append('lng', this.state.lng);
        uploadData.append('imageUrl', this.state.imageUrl);

        
        axios.post('http://localhost:5000/api/locations',uploadData)
                .then(response=>{
                    this.getAllLocations();
                    this.setState({
                        title:'',
                        description:'',
                        lat:'',
                        lng:'',
                        imageUrl:'',
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
    }

    fileUploadHandler = (e) =>{ 

        this.setState({img:  e.target.files[0]})


        console.log('The file to be uploaded is: ', e.target.files[0]);
        const uploadData = new FormData();
        uploadData.append('imageUrl', e.target.files[0])
    
        axios.post('http://localhost:5000/api/uploads',uploadData)
            .then(res =>{
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
        console.log('rendering home component')
        return (
            <section>
                {this.state.ready &&
                                        <Map 
                                            allLocations={this.state.allLocations}
                                            inputCoordinatesHandle={this.inputCoordinatesHandle}
                                        />
                }
                
                {this.addLocationRender()}

                <Sidebar 
                    addLocationToggle={this.addLocationToggle}
                    >
                </Sidebar>
                
            </section>
        )
    }
}

