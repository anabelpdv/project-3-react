import React from 'react'

export default class Sidebar extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  render() {
    return (
      <div className="sidebar-container">
        <div className="user-info-container">
              <div className="profile-image-container">
              </div>
              <p className="user-name">User Name</p>
        </div>
        <div className="sidebar-element">
          <button onClick={this.props.addLocationToggle}>Add Location</button>
        </div>
        <div className="sidebar-element">
          <button>Favorites</button>
        </div>
        <div className="sidebar-element">
          <button>Search</button>
        </div>
        <div className="sidebar-element">
          <button>List All</button>
        </div>
      </div>
    )
  } 
}
