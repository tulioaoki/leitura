import { GET_COMMENT_BY_POST_ID, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, UP_COMMENT, DOWN_COMMENT } from '../actions/comments'

const initial_state = {
    comments:[]
}

export default function comments (state = initial_state, action) {
    switch(action.type) {
        case GET_COMMENT_BY_POST_ID :
            return {
                ...state,
                comments: action.comments
            }
        case DELETE_COMMENT :
            const clone_comments = state.comments;
            clone_comments.splice(action.comment_id, 1);
            return {
                ...state,
                comments: clone_comments
            }
        case ADD_COMMENT:
            const updated_comments = state.comments
            const { comment } = action
            updated_comments[updated_comments.length] = comment
            return{
                ...state,
                comments: updated_comments,
            }
        case EDIT_COMMENT:
            const all_comments = state.comments
            all_comments[action.key] = action.comment
            return{
                ...state,
                comments:all_comments

            };
        case UP_COMMENT:
            console.log(state)
            const new_comments = state.comments
            new_comments[action.key].voteScore++
            return{
                ...state,
                comments:new_comments

            };
        case DOWN_COMMENT:
            const down_comments = state.comments
            down_comments[action.key].voteScore--
            return{
                ...state,
                comments:down_comments

            };
        default :
            return state
    }
}