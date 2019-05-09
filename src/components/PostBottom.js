import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {handleDeletePost} from "../actions/posts";
import {Link, Redirect} from "react-router-dom";
import Icon from "@material-ui/core/Icon";

class PostBottom extends Component{
    render(){
        const { dispatch, id } = this.props;
        const post = this.props;
        function handleDelete(){
            dispatch(handleDeletePost(post)).catch(() => {return <Redirect to='/'/>})
        }
        const path = `/posts/${id}`;
        const { commentCount } = post.post;
        const classes = this.props;
        return(
            <div className='container'>
                    <footer className='post-botton-container'>
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary" style={{'float':'left'}}
                            className={classes.margin}>
                            <Link to={path} className='link' style={{'color':'black'}}>
                                Reply ({commentCount})
                            </Link>
                        </Button>
                        <div style={{'float':'right', 'display':'inline-block'}}>
                            <Link to={'/posts/'+id+'/edit'} className='link' style={{'color':'gray'}}>
                                <IconButton >
                                    <Icon>edit_icon</Icon>
                                </IconButton>
                            </Link>
                            <IconButton onClick={handleDelete} >
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                        <br/>
                    </footer>
            </div>
        )
    }
}



const mapStateToProps = ({ posts, classes }, { post, index }) => ({
        post: post,
        classes:classes,
        id:index,
})

export default connect(mapStateToProps)(PostBottom)