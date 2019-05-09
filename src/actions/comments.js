import generateUID from "../utils/extra";
import {addComment, deleteComment, getPostCommentsById, updateComment, updatePost} from "../utils/requests";
import {handleGetInitialData} from "./shared";
export const GET_COMMENT_BY_POST_ID = 'GET_COMMENT_BY_POST_ID';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';


export function getCommentByPostId (comments) {
    return {
        type: GET_COMMENT_BY_POST_ID,
        comments:comments,
    }
}

export function addCommentByPostId (comment) {
    return {
        type: ADD_COMMENT,
        comment:comment,
    }
}


export function deleteCommentByPostId (comment_id) {
    return {
        type: DELETE_COMMENT,
        comment_id:comment_id,
    }
}

export function editCommentById (comment, key) {
    return {
        type: EDIT_COMMENT,
        key:key,
        comment,
    }
}


export function handleAddComment(comment, parent_id) {
    const {author , text} = comment
    const timestamp = Date.now();
    const id = generateUID();
    return (dispatch) => {
        return addComment({author, body:text, timestamp, id, parentId:parent_id})
            .then(({ comment }) => {
                dispatch(addCommentByPostId(comment));
            })
    }
}

export function handleGetPostCommentsById(post_id) {
    return (dispatch) => {
        return getPostCommentsById(post_id)
            .then(({ comments }) => {
                dispatch(getCommentByPostId(comments));
            })
    }
}

export function handleEditComment({text ,key,comment_id}){
    const timestamp = Date.now();
    return(dispatch) => {
        return updateComment({
            text,
            timestamp,
            id:comment_id,
        })
            .then((comment) => dispatch(editCommentById(comment, key)))
    }
}


export function handleDeleteComment(comment_id, comment_key){
    return (dispatch) => {
        return deleteComment(comment_id)
            .then(() => {
                dispatch(deleteCommentByPostId(comment_key));
                dispatch(handleGetInitialData());
            })
    }
}