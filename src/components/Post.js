import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component{
    render(){
        const {post} = this.props;
        if (post === null) {
            return <p>This Post doesn't exist</p>
        }
        const { body } = post;
        return(
            <div className='post-container'>
                <p>{body}</p>
            </div>
        )
    }
}

function mapStateToProps({ posts }, { post, index }){
    return {
        post: post
    }
}

export default connect(mapStateToProps)(Post)