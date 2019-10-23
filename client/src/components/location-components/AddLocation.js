import React from 'react';
import axios from 'axios';

export default class AddLocation extends React.Component {

  constructor(props){
    super(props);
    this.state={
                title:'',
                description:'',
                lat:'',
                lng:''
              }
  }



  render() {
    return (
      <div className="add-location-form">
        <form onSubmit={(e) =>this.props.formHandle(e)}>
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Details
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                  <label>Title</label>
                  <input onChange={this.props.inputHandle} type="text" name="title" value={this.props.title}/>
                  <label>Description</label>
                  <input onChange={this.props.inputHandle} type="text" name="description" value={this.props.description}/>
                  <label>Latitude</label>
                  <input onChange={this.props.inputHandle} type="number" name="lat" value={this.props.lat}/>
                  <label>Longitude</label>
                  <input onChange={this.props.inputHandle} type="number" name="lng" value={this.props.lng}/>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Images
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Location
                  </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson 
                </div>
              </div>
            </div>
          </div>
          <button>Save Location</button>
        </form> 
      </div>
    )
  }
}
