import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import PostHeader from "./PostHeader";
import PostBottom from "./PostBottom";
import Paper from "@material-ui/core/Paper";
import CommentView from "./CommentView";
import {handleGetPostCommentsById} from "../actions/comments";
import NewCommentForm from "./NewCommentForm";
import {withRouter} from "react-router-dom";

class PostPage extends Component {

    componentDidMount() {
        this.props.dispatch(handleGetPostCommentsById(this.props.posts[this.props.match.params.id].id));
    }

    render() {
        const { id } = this.props.match.params;
        const post = this.props.posts[id]
        return (
            <div className='container'>
                <Paper>
                    <PostHeader post={post} index={id}/>
                    <Post post={post} index={id}/>
                    <PostBottom post={post} index={id}/>
                </Paper>
                {this.props.comments && <CommentView />}
                <NewCommentForm post={post} index={id}/>
                <br/>
            </div>
        )
    }

}

const mapStateToProps = ({posts, comments, classes}) => ({
    posts:posts.posts,
    comments,
    classes,
})

export default withRouter(connect(mapStateToProps)(PostPage))
