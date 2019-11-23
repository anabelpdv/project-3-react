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
		location:this.props.locationId,
	}

	axios.post(`${process.env.REACT_APP_API_URL}/comments`,newComment)
					.then(response=>{	
						this.props.getComments();
						this.setState({
							content:'',
						})
					})
					.catch(err=>{
							console.log(err)
					})
}

render() {
		return (
			<div>
				<form onSubmit={this.commentFormHandler}>
						<input type="text" className="comment-input"onChange={this.inputHandler} placeHolder="Write a comment..." name="content" value={this.state.content}/>
						<button style={{display:'none'}}>submit</button>
				</form>
			</div>
		)
	}
}
