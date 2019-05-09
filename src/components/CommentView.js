import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import {withRouter} from "react-router-dom";

class CommentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments:[]
        }
    }

    render() {
        return (<div>
            <div className="container">
                <ul className="comments" style={{listStyleType: 'none', display: 'inline','justify-content': 'center'}}> {this.renderList()} </ul>
            </div>
        </div>)
    }

    renderList = () => {
        const {comments} = this.props
        return comments
            .filter(( elem, i, array ) => array[i].parent_id === this.props.post_id)
            .sort((a,b) => b.voteScore - a.voteScore)
            .map((item, index) => (<li id={index}><Comment style={{ style:'inline-block', display: 'inline'}} post_id={this.props.post_id} comment={item} comment_key={index}/></li>))
    }

}

const mapStateToProps = ({comments}) => ({
    comments: comments.comments
})

export default withRouter(connect(mapStateToProps)(CommentView))
