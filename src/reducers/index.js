import { combineReducers } from 'redux'
import posts from "./posts";
import comments from "./comments";
import categories from "./categories";
import sort from "./sort";

export default combineReducers({
    posts,
    comments,
    categories,
    sort,
})