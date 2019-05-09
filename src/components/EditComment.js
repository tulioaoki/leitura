import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import {Redirect, withRouter} from "react-router-dom";
import {handleEditComment, handleEditPost} from '../actions/comments'

class EditComment extends Component{
    componentDidMount() {
        const { id } = this.props.match.params;
        const comment = this.props.comments.comments[id];
        this.setState({
            id:comment.id,
            text:comment.body,
        })
    }
    state = {
        id:'',
        text: '',
        submitted:false,
    };
    handleChangeText = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            text
        }))
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props)
        const { text } = this.state;
        const { dispatch, id, comments } = this.props;
        const comment_object = comments.comments[id];

        dispatch(handleEditComment({text, comment_id:comment_object.id, key:id}));
        this.setState(() => ({
            id:'',
            text: '',
            submitted:true,
        }))
    };
    render(){
        const classes = this.props;
        const {text, submitted } = this.state;

        if(submitted === true){
            return <Redirect to='/'/>
        }

        return(
            <div className='container'>
                <Paper>
                    <h3 className='header'>Edit Comment</h3>
                    <form className='new-post' >
                        <input type='text' value={text} placeholder='Text' onChange={this.handleChangeText} className='textarea'/>
                    </form>
                    <p style={{'text-align':'center', 'padding':'1px', 'padding-bottom':'30px'}}>
                        <Button
                            onClick={this.handleSubmit}
                            type='submit'
                            size="small"
                            color="primary"
                            variant='outlined'
                            disabled={ text === '' }
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

function mapStateToProps({ classes,comments }, props){
    const { id } = props.match.params;
    return {
        classes,
        comments,
        id,
    }
}

export default withRouter(connect(mapStateToProps)(EditComment))
