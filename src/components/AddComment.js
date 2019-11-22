import React from 'react'
import axios from  'axios'

export default class AddComment extends React.Component {

constructor(props){
	super(props)
	this.state={
		content:'',
		locationId:'',
	}
}

inputHandler=(e)=>{
	const name = e.target.name;
	const value = e.target.value;
	this.setState({
			[name]: value,
	})
}

commentFormHandler=(e)=>{
	e.preventDefault()

	const newComment = {
		author:this.props.currentUser._id,
		content:this.state.content,
		locationId:this.props.locationId,
	}

	axios.post(`${process.env.REACT_APP_API_URL}/comments`,newComment)
					.then(response=>{	
						console.log('this is the toggle for the comment that is not working')
						this.props.addCommentToggle()
					})
					.catch(err=>{
							console.log(err)
					})
}

render() {
		return (
			<div>
				<form onSubmit={this.commentFormHandler}>
						<input type="text" className="comment-input"onChange={this.inputHandler} name="content" value={this.state.content}/>
						<button style={{display:'none'}}>submit</button>
				</form>
			</div>
		)
	}
}
