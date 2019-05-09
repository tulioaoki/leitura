import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from "./Post";
import PostHeader from "./PostHeader";
import PostBottom from "./PostBottom";
import Paper from "@material-ui/core/Paper";
import {withRouter} from "react-router-dom";

class PostView extends Component{

    render(){
        const {posts, sort} = this.props
        console.log("POST, VIE2",this.props)
        return(
            <div className="container">
                        <ul className='complete-post' style={{"listStyleType":"none"}}>
                            {sort_by(posts,sort)
                                .map((item, index) => (
                                <li key={item.id}>
                                    <Paper>
                                        <PostHeader post={item} index={index}/>
                                        <Post post={item} index={index}/>
                                        <PostBottom post={item} index={index}/>
                                    </Paper>
                                    <br/>
                                </li>))}
                        </ul>
            </div>)
    }
}

function sort_by (posts,sort){
    sort = sort.sort
    if(posts && sort === 'score'){
        return posts.sort((a, b) => b.voteScore - a.voteScore)
    }else if (posts && sort === 'timestamp'){
        return posts.sort((a,b) => b.timestamp - a.timestamp)
    }
    else {
        return []

    }
}




function mapStateToProps({ posts, sort }){
    console.log("SORT",sort)
    if( posts.posts === undefined ){
        return{posts:[], sort:'score'}
    }else {
        return {
            posts:posts.posts,
            sort:sort,
        }
    }
}

export default withRouter(connect(mapStateToProps)(PostView))
