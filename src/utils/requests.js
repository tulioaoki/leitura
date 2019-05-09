export default function savePost ({text, title, author, timestamp, category, id}) {
    const body = JSON.stringify({
        id,
        body:text,
        title,
        author,
        category,
        timestamp,
    });
    const hdrs = {
        method:'POST',
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',
        }),
        body:body,
    };
    return Promise.all(
        [
            fetch('http://localhost:3001/posts',hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([posts]) => ({
            posts,
        }))
        .catch((err) => {
            console.log(err);
        })
}

export function _deletePost(id) {
    const hdrs = {
        method:'DELETE',
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',
        }),
    };
    return Promise.all(
        [
            fetch(`http://localhost:3001/posts/${id}`,hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([posts]) => ({
            posts,
        }))
        .catch((err) => {
            console.log(err);
        })
}

export function updatePost({text, title,id}){
    const body = JSON.stringify({
        body:text,
        title,
    });

    const hdrs = {
        method:'PUT',
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',
        }),
        body:body,
    };
    return Promise.all(
        [
            fetch(`http://localhost:3001/posts/${id}`,hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([posts]) => ({
            posts,
        }))
        .catch((err) => {
            console.log(err);
        })
}

export function votePost({id, vote}){
    const body = JSON.stringify({
        'option': vote
    });

    const hdrs = {
        method:'POST',
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',
        }),
        body:body,
    };
    return Promise.all(
        [
            fetch(`http://localhost:3001/posts/${id}`,hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([posts]) => ({
            posts,
        }))
        .catch((err) => {
            console.log(err);
        })
}

export function voteComment({id, vote}){
    const body = JSON.stringify({
        'option': vote
    });

    const hdrs = {
        method:'POST',
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',
        }),
        body:body,
    };
    return Promise.all(
        [
            fetch(`http://localhost:3001/comments/${id}`,hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([comment]) => ({
            comment,
        }))
        .catch((err) => {
            console.log(err);
        })
}



export function getPostCommentsById(id){
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
            fetch('http://localhost:3001/posts/'+id+'/comments',hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([comments]) => ( {
            comments,
        }))
        .catch((err) => {
            console.log(err);
        })
}

export function addComment(comment){
    const hdrs = {
        method:'POST',
        body: JSON.stringify(comment),
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',

        })
        ,
    };
    return Promise.all(
        [
            fetch('http://localhost:3001/comments',hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([comment]) => ({
            comment,
        }))
        .catch((err) => {
            console.log(err);
        })
}


export function deleteComment(comment_id){
    const hdrs = {
        method:'DELETE',
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',

        })
        ,
    };
    return Promise.all(
        [
            fetch('http://localhost:3001/comments/'+comment_id,hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([comment]) => ({
            comment,
        }))
        .catch((err) => {
            console.log(err);
        })
}

export function updateComment({text, timestamp,id}){
    console.log("UPDATE",text,timestamp, id)
    const body = JSON.stringify({
        body:text,
        timestamp,
    });

    const hdrs = {
        method:'PUT',
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: "Udacity",
            'Accept': 'application/json',
        }),
        body:body,
    };
    return Promise.all(
        [
            fetch(`http://localhost:3001/comments/${id}`,hdrs).then(res => res.json()).catch(() => ([])),
        ]
    )
        .then(([comment]) => (
            comment
        ))
        .catch((err) => {
            console.log(err);
        })
}
