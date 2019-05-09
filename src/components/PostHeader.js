import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import {handleEditPostDownvote, handleEditPostUpvote} from "../actions/posts";

class PostHeader extends Component{
    render(){
        const key = this.props.id;
        const post = this.props.post;
        const { dispatch } = this.props
        const { author, title, timestamp, voteScore, id } = post;
        const date = new Date(timestamp).toLocaleDateString("pt-BR");
        const path = `/posts/${key}`;

        const handleUpvote = () => (
            dispatch(handleEditPostUpvote(id,key, post))
        )

        const handleDownvote = () => (
            dispatch(handleEditPostDownvote(id,key, post))
        )

        return(
            <div className='container'>
                    <header className='header'>
                        <div>
                            <div className="canto-esquerdo" style={{'float':'left'}}>
                                <div style={{'justify-content':'left','float': 'left'}}>
                                    <br/>
                                    <div className="arrow-up" onClick={handleUpvote}></div>
                                    <br/>
                                    <br/>
                                    <div className="arrow-down" onClick={handleDownvote}></div>
                                </div>
                                <span className='voteScore'>
                                    {voteScore}
                                    <p style={{'fontSize':'10px'}}>
                                        SCORE
                                    </p>
                                </span>
                            </div>
                            <div>
                                <Link to={path} className='link'>
                                    <h1 className='title'>{title}</h1>
                                </Link>
                            </div>
                        </div>
                        <div className='sub-header'>
                            <p className='author'>{author}</p>
                            <p className='header-date'>{date}</p>
                        </div>
                    </header>
            </div>
        )
    }
}

function mapStateToProps({ posts }, { post, index }){
    return {
        post:post,
        id:index,
    }
}

export default connect(mapStateToProps)(PostHeader)