import React from 'react';
import MyPosts from "../MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../Redux/profile-reducer";


const MyPostsContainer = (props) => {

    let state = props.store.getState();


    // берет функцию из state которая берет newPostText из state и добавляет state объект с новым постом
    const addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    // следит за изменением в textarea и с помощью функции из state добавляет изменения в state
    const onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action);
    }

    return (
        <MyPosts updateNewPostText={onPostChange}
                 addPost={addPost}
                 posts={state.profilePage}/>
    );
}


export default MyPostsContainer;
