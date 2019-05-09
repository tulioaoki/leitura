import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import {handleAddPost} from "../actions/posts";
import generateUID from "../utils/extra";
import {Redirect, withRouter} from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core";
import styles from "../utils/navigator_styles";
import PropTypes from 'prop-types';
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

class NewPost extends Component{
    state = {
        text: '',
        title: '',
        author: '',
        category:'',
    };
    handleChangeText = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            text
        }))
    };
    handleChangeCategory = (e) => {
        const category = e.target.value;
        this.setState(() => ({
            category
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
        console.log(this.props)
        const { text, title, author, category } = this.state;
        const { dispatch, id, posts } = this.props;
        const timestamp = Date.now();
        const uid = generateUID();
        dispatch(handleAddPost({text, title, author, timestamp, category, id:uid, key:Object.keys(posts).length}));
        this.setState(() => ({
            text: '',
            title: '',
            author: '',
            category:'',
            toHome: id ? false : true,
        }))
    };
    render(){
        const classes = this.props;
        const {text, title, author, category, toHome } = this.state;

        if(toHome === true){
            return <Redirect to='/'/>
        }

        return(
            <div className='container'>
                <Paper>
                    <h3 className='header'>Create new Post</h3>
                    <form className='new-post' >
                        <input type='text' value={title} placeholder='Title' onChange={this.handleChangeTitle} className='formField'/>
                        <input type='text' value={author} placeholder='Author' onChange={this.handleChangeAuthor} className='formField'/>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={this.state.category}
                                onChange={this.handleChangeCategory}
                                name="age"
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="" disabled>
                                    Category
                                </MenuItem>
                                <MenuItem value=''> </MenuItem>
                                <MenuItem value='react'>React</MenuItem>
                                <MenuItem value='redux'>Redux</MenuItem>
                                <MenuItem value='udacity'>Udacity</MenuItem>
                            </Select>
                            <FormHelperText>Category</FormHelperText>
                        </FormControl>
                        <input type='text' value={text} placeholder='Text' onChange={this.handleChangeText} className='textarea'/>
                    </form>
                    <p style={{'text-align':'center', 'padding':'1px', 'padding-bottom':'30px'}}>
                        <Button
                            onClick={this.handleSubmit}
                            type='submit'
                            size="small"
                            color="primary"
                            variant='outlined'
                            disabled={ author === '' || text === '' || title === ''|| category === ''}
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

const mapStateToProps = ({ classes,posts }) => ({
    classes,
    posts
})

NewPost.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(connect(mapStateToProps)(withStyles(styles)(NewPost)))
