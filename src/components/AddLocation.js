import React from 'react';

export default class AddLocation extends React.Component {

  constructor(props){
    super(props);
    this.state={
    }
  }


  render() {

    return (
      <div className="add-location-form">
        <form onSubmit={(e) =>this.props.s(e)}>
          <div>
              <p>Title</p>
              <input className="input-element" onChange={this.props.inputHandler} type="text" name="title" value={this.props.title}/>
          </div>
          <div >
              <p>Description</p>
              <textarea className="textarea-element" onChange={this.props.inputHandler} type="text" name="description" value={this.props.description}/>
          </div>
          <div>
              <p>Latitude</p>
              <input className="input-element" onChange={this.props.inputHandler} type="number" name="lat" value={this.props.lat}/>
          </div>
          <div>
              <p>Longitude</p>
              <input className="input-element" onChange={this.props.inputHandler} type="number" name="lng" value={this.props.lng}/>
          </div>
          <div>
          <div className="images-container">
            <div className="image-box">
              <button className='image-button'>Image 1</button>
              <img src="" alt=""/>
              <input name="image1" className="image-input"type="file" onChange={this.props.fileUploadHandler}/>
            </div>
            <div className="image-box">
              <button className='image-button'>Image 2</button>
              <img src="" alt=""/>
              <input name="image2" className="image-input"type="file" onChange={this.props.fileUploadHandler}/>
            </div>
            <div className="image-box">
              <button className='image-button'>Image 3</button>
              <img src="" alt=""/>
              <input name="image3" className="image-input"type="file" onChange={this.props.fileUploadHandler}/>
            </div>
            <div className="image-box">
              <button className='image-button'>Image 4</button>
              <img src="" alt=""/>
              <input name="image4" className="image-input"type="file" onChange={this.props.fileUploadHandler}/>
            </div>
            <div className="image-box">
              <button className='image-button'>Image 5</button>
              <img src="" alt=""/>
              <input name="image5" className="image-input"type="file" onChange={this.props.fileUploadHandler}/>
            </div>
            <div className="image-box">
              <button className='image-button'>Image 6</button>
              <img src="" alt=""/>
              <input name="image6" className="image-input"type="file" onChange={this.props.fileUploadHandler}/>
            </div>
          </div>
          </div>
          <button className="btn">Save</button>
          <button className="btn" onClick={this.props.addLocationToggle}>Cancel</button>
        </form> 
        
      </div>
    )
  }
}
