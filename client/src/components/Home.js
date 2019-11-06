import React from "react";
import axios from 'axios'
import AddLocation from "./AddLocation";
import Map from "./Map";
import Sidebar from "./Sidebar";
import LocationDetails from "./LocationDetails";




export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state={
            map:{},
            markers: [],
            title:'',
            description:'',
            lat:'',
            lng:'',
            imageUrl:[],
            addLocation:false,
            details:false,
        }
    }


    addLocationToggle=()=>{
        this.setState({
            addLocation:!this.state.addLocation,
            title:'',
            description:'',
            lat:'',
            lng:'',
            imageUrl:[],
        })
    }
    detailsToggle=()=>{
        this.setState({
            details:!this.state.details,
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

    fileUploadHandler = (e) =>{ 
        let copy = [...this.state.imageUrl]
        copy.push(e.target.files[0])
    
        this.setState({imageUrl: copy})
        
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

    
        this.state.imageUrl.forEach((image,index) =>{
            uploadData.append('imageUrl', this.state.imageUrl[index]);
        })
        
        axios.post('http://localhost:5000/api/locations',uploadData)
                .then(response=>{
                    this.props.getAllLocations();
                    this.setState({
                        title:'',
                        description:'',
                        lat:'',
                        lng:'',
                        imageUrl:'',
                    })
                    this.addLocationToggle()
                })
                .catch(err=>{
                    console.log(err)
                })
    }



    render(){
        
        return (
            <section>
                {this.props.ready &&
                                        <Map 
                                            visibleLocations={this.props.visibleLocations}
                                            inputCoordinatesHandle={this.inputCoordinatesHandle}
                                            addLocationToggle={this.addLocationToggle}
                                            detailsToggle={this.detailsToggle}
                                            
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

