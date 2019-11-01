import React from 'react'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // const { theLocation } = this.props.location.blah;
    console.log("in details: ", this.props)
  }


  render() {
    return (
      <div className="location-details-container">
        <h1>Details page</h1>
        <div>Hello</div>
      </div>
    )
  }
}
