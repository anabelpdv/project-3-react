import React from 'react'

export default class LocationDetails extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log('this are the props you are looking for: ',this.props)
    return (
      <div className="location-details-container">
        <h1>Details page</h1>
        <div>Hello</div>
      </div>
    )
  }
}
