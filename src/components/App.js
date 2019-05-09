import React, {Component, Fragment} from 'react';
import '../App.css';
import {connect} from "react-redux";
import {Link, Route, withRouter} from 'react-router-dom'
import {handleGetInitialData} from "../actions/shared";
import PostView from "./PostView";
import NewPostButton from "./NewPostButton";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import EditComment from "./EditComment";
import FilteredView from "./FilteredView";
import Navigator from "./Navigator";


class App extends Component {
   constructor(props) {
       super(props)
       this.state = {
           comments:[],
           categories:[],
           posts:[],
       }
   }

  componentDidMount() {
      this.props.dispatch(handleGetInitialData())
  }

  render(){
    return (

          <Fragment>
              <Navigator/>
              <div>
                  <Route path='/new-post' exact component={NewPost}/>
                  <Route path='/' exact component={PostView}/>
                  <Route path='/posts/:id' exact component={PostPage}/>
                  <Route path='/posts/:id/edit' exact component={EditPost}/>
                  <Route path='/comment/:id/edit' exact component={EditComment}/>
                  <Route path='/category/:path' exact component={FilteredView}/>
              </div>
              <Link to='/new-post' className='add-post-button'>
                  <NewPostButton style={{'.MuiFab-primary-128 background-color':'#232f3e'}}/>
              </Link>
          </Fragment>
    );
  }
}

const mapStateToProps = ({ posts, comments, categories, classes }) => ({
        posts:posts,
        comments:comments,
        categories:categories ,
        classes:classes,
})

export default withRouter(connect(mapStateToProps)(App))
