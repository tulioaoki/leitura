import React from 'react'
import { connect } from 'react-redux'
import Paper from "@material-ui/core/Paper";
import {Link, withRouter} from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from '@material-ui/icons/Delete';
import {handleDeleteComment, handleEditPostDownvoteComment, handleEditPostUpvoteComment} from "../actions/comments";
import IconButton from "@material-ui/core/IconButton";
import {handleEditPostDownvote, handleEditPostUpvote} from "../actions/posts";

class Comment extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            comments:[]
        }
    }

    render(){
        const { comment, dispatch, comment_key } = this.props;
        const date = new Date(comment.timestamp).toLocaleDateString("pt-BR");
        function handleDelete(){
            dispatch(handleDeleteComment(comment.id, comment_key))
        }
        const handleUpvoteComment = () => (
            dispatch(handleEditPostUpvoteComment(comment.id, comment_key, comment, this.props.post_id))
        )

        const handleDownvoteComment = () => (
            dispatch(handleEditPostDownvoteComment(comment.id, comment_key, comment, this.props.post_id))
        )

        return(
            <div className="container">
                            <Paper className='textarea'>
                                <div style={{'justify-content':'left','float': 'right'}}>
                                    <div className="arrow-up-mini" onClick={handleUpvoteComment}></div>
                                    <br/>
                                    <div className="arrow-down-mini" onClick={handleDownvoteComment}></div>
                                </div>
                                <span className='commentVoteScore'>
                                    {comment.voteScore}
                                    <p style={{'fontSize':'8px'}}>
                                        SCORE
                                    </p>
                                </span>
                                <div className='footer'>
                                    <p className='author' style={{textAlign:'left'}} > {comment.author} : </p>
                                    <p className='comment'> "{comment.body}"</p>
                                    <div className='bottonButtons'>
                                        <span className='comment-date' style={{'float':'left'}}>{date}</span>
                                        <Link to={'/comment/'+comment_key+'/edit'} className='link' style={{'color':'gray'}}>
                                            <IconButton>
                                                <Icon>edit_icon</Icon>
                                            </IconButton>
                                        </Link>
                                        <IconButton >
                                            <DeleteIcon onClick={handleDelete}/>
                                        </IconButton>
                                    </div>
                                </div>

                            </Paper>
                            <br/>

            </div>)
    }


}

const mapStateToProps = ({ posts }, props) => ({
    comment:props.comment
})


export default withRouter(connect(mapStateToProps)(Comment))
