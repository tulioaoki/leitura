import {receiveCategories} from "./categories";
import {initialSort} from "./sort";
export const RECEIVE_POSTS = 'RECEIVE_POSTS';


export function receivePosts (posts) {
    return {
        type: RECEIVE_POSTS,
        posts,
    }
}
export function getInitialData(){
    const hdrs = {
        method:'GET',
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',
        }),
    };
    return Promise.all(
        [
            fetch('http://localhost:3001/posts',hdrs).then(res => res.json()).catch(() => ([])),
            fetch('http://localhost:3001/categories',hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([posts, {categories}]) => ({
            posts,
            categories,
        }))
        .catch((err) => {
            console.log(err);
        })
}

export function handleGetInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({ posts, categories }) => {
                dispatch(receivePosts(posts));
                dispatch(receiveCategories(categories));
                dispatch(initialSort())
            })
    }
}