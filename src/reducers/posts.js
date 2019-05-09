import {ADD_POSTS, DELETE_POST, EDIT_POST, VOTE_DOWN, VOTE_UP} from '../actions/posts'
import {RECEIVE_POSTS} from "../actions/shared";

export default function posts (state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTS :
            return {
                ...state,
                posts:action.posts
            };
        case ADD_POSTS:
            const { posts } = action.posts;
            const copy = state
            copy.posts.push(posts)
            return{
                ...copy
            };
        case DELETE_POST:
            const clone = state
            clone.posts.splice(action.id, 1);
            return{ ...clone};
        case EDIT_POST:
            const new_state = state
            const post = action.post;
            new_state.posts[action.id] = post
            return{
                ...new_state
            };
        case VOTE_UP:
            const clone_state = state
            const up_post = action.post;
            up_post.voteScore++;
            clone_state.posts[action.id] = up_post
            return{
                ...clone_state
            };
        case VOTE_DOWN:
            const down_state = state
            const down_post = action.post;
            down_post.voteScore--;
            down_state.posts[action.id] = down_post
            return{
                ...down_state
            };
        default :
            return state
    }
}