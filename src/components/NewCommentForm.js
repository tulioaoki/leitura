import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import {handleAddComment} from "../actions/comments";

class NewCommentForm extends Component{
    state = {
        text: '',
        author: '',
    };
    handleChangeText = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            text
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

        const { text, author } = this.state;
        const { dispatch, id } = this.props;

        dispatch(handleAddComment({text, author}, this.props.posts[id].id));
        this.setState(() => ({
            text: '',
            author: '',
        }))
    };
    render(){
        const classes = this.props;
        const {text, author } = this.state;

        return(
            <div className='comment-container' style={{'justify-content': 'center'}}>
                <Paper>
                    <h3 className='comment-header'>New comment !</h3>
                    <form className='new-comment' >
                        <input type='text' value={author} placeholder='Author' onChange={this.handleChangeAuthor} className='formField'/>
                        <input type='text' value={text} placeholder='Text' onChange={this.handleChangeText} className='textarea'/>
                    </form>
                    <p style={{'text-align':'center', 'padding':'1px', 'padding-bottom':'30px'}}>
                        <Button
                            onClick={this.handleSubmit}
                            type='submit'
                            size="small"
                            color="primary"
                            variant='outlined'
                            disabled={ author === '' || text === ''}
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

const mapStateToProps = ({ classes, posts }) => ({
    classes,
    posts,
})


export default connect(mapStateToProps)(NewCommentForm)