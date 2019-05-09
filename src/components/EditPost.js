import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import { handleEditPost } from '../actions/posts'

class EditPost extends Component{
    componentDidMount() {
        const { id } = this.props.match.params;
        const post = this.props.posts.posts[id];
        this.setState({
            id:post.id,
            text:post.body,
            title:post.title,
            author:post.author,
        })
    }
    state = {
        id:'',
        text: '',
        title: '',
        author: '',
        submitted:false,
    };
    handleChangeText = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            text
        }))
    };
    handleChangeTitle = (e) => {
        const title = e.target.value;
        this.setState(() => ({
            title
        }))
    };
    handleChangeAuthor = (e) => {
        const author = e.target.value;
        this.setState(() => ({
            author
        }))
    };
    handleSubmit = (e) => {
        e.preventDefault();

        const { text, title } = this.state;
        const { dispatch, id, posts } = this.props;
        const post_object = posts.posts[id];

        dispatch(handleEditPost({title, text, post_id:post_object.id, id}));
        this.setState(() => ({
            id:'',
            text: '',
            title: '',
            author: '',
            submitted:true,
        }))
    };
    render(){
        const classes = this.props;
        const {text, title, author, submitted } = this.state;

        if(submitted === true){
            return <Redirect to='/'/>
        }

        return(
            <div className='container'>
                <Paper>
                    <h3 className='header'>Create new Post</h3>
                    <form className='new-post' >
                        <input type='text' value={title} placeholder='Title' onChange={this.handleChangeTitle} className='formField'/>
                        <input  readOnly={true} type='text' value={author} placeholder='Author' onChange={this.handleChangeAuthor} className='formField'/>
                        <input type='text' value={text} placeholder='Text' onChange={this.handleChangeText} className='textarea'/>
                    </form>
                    <p style={{'text-align':'center', 'padding':'1px', 'padding-bottom':'30px'}}>
                        <Button
                            onClick={this.handleSubmit}
                            type='submit'
                            size="small"
                            color="primary"
                            variant='outlined'
                            disabled={ author === '' || text === '' || title === ''}
                            className={classes.margin}>
                            Submit
                        </Button>
                        <Button
                            href='/'
                            size="small"
                            color="secondary"
                            variant='outlined'
                            className={classes.margin}>
                            Cancel
                        </Button>
                    </p>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps({ classes,posts }, props){
    const { id } = props.match.params;
    return {
        classes,
        posts,
        id,
    }
}

export default connect(mapStateToProps)(EditPost)