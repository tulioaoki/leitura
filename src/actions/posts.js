import savePost, {_deletePost, updatePost, votePost} from '../utils/requests'
import {handleGetInitialData} from "./shared";
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';


export function addPosts (posts, key) {
    return {
        type: ADD_POSTS,
        posts,
        key:key
    }
}


export function voteUp (post, key) {
    return {
        type: VOTE_UP,
        post,
        id:key
    }
}


export function voteDown (post, key){
    return {
        type: VOTE_DOWN,
        post,
        id:key
    }
}

export function handleEditPostUpvote(post_id, key, post){
    return(dispatch) => {
        return votePost({
            id:post_id,
            vote:"upVote"
        })
            .then(() => dispatch(voteUp(post, key)) && dispatch(handleGetInitialData()))
    }
}

export function handleEditPostDownvote(post_id, key, post){
    return(dispatch) => {
        return votePost({
            id:post_id,
            vote:"downVote"
        })
            .then(() => dispatch(voteDown(post,key)) && dispatch(handleGetInitialData()))
    }
}

export function handleAddPost({text, title, author, timestamp, category, id, key}){
    return (dispatch) => {
        return savePost({
            id,
            text,
            title,
            author,
            category,
            timestamp,
        }).then((posts) => dispatch(addPosts(posts, key)))
    }
}

function editPost(post, id){
    return{
        type:EDIT_POST,
        post:post.posts,
        id:id,
    }
}

export function handleEditPost({title, text ,post_id, id}){
    return(dispatch) => {
        return updatePost({
                text,
                title,
                id:post_id})
            .then((posts) => dispatch(editPost(posts, id)))
    }
}

function deletePost(id) {
    return{
        type:DELETE_POST,
        id,
    }
}

export function handleDeletePost(post){
    return (dispatch) => {
        return _deletePost(
            post.post.id,
        ).then(dispatch(deletePost(post.id)))
    }
}