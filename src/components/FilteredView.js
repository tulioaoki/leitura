import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from "./Post";
import PostHeader from "./PostHeader";
import PostBottom from "./PostBottom";
import Paper from "@material-ui/core/Paper";
import CommentView from "./CommentView";
import {withRouter} from "react-router-dom";

class FilteredView extends Component{
    constructor(props) {
        super(props)
        this.state = {
            filtered_ids:[]
        }
    }

    render(){
        const {posts} = this.props
        return(
            <div className="container">
                <ul className='complete-post' style={{"listStyleType":"none"}}>
                    {posts
                        .map((item, index) => (
                            <li key={item.id}>
                                <Paper>
                                    <PostHeader post={item} index={index}/>
                                    <Post post={item} index={index}/>
                                    <PostBottom post={item} index={index}/>
                                </Paper>
                                <br/>
                                <CommentView post={item} index={index}/>
                            </li>))}
                </ul>
            </div>)
    }
}

function mapStateToProps({ posts, sort }, props){
    if( posts.posts === undefined || props.match === undefined){
        return{posts:[]}
    }else if (sort.sort === 'score'){
        return {posts:posts.posts
                .filter(( elem, i ) => posts.posts[i].category === props.match.params.path)
                .sort((a,b) => b.voteScore - a.voteScore)
        }
    }else{
        return {
            posts:posts.posts
                .filter(( elem, i ) => posts.posts[i].category === props.match.params.path)
                .sort((a,b) => b.timestamp - a.timestamp)
        }
    }
}

export default withRouter(connect(mapStateToProps)(FilteredView))
