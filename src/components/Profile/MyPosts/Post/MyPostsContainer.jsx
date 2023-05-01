import React from 'react';
import MyPosts from "../MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../Redux/profile-reducer";
import StoreContext from "../../../Redux/storeContext";


const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {store => {
                const addPost = () => {
                    store.dispatch(addPostActionCreator());
                }

                // следит за изменением в textarea и с помощью функции из state добавляет изменения в state
                const onPostChange = (text) => {
                    let action = updateNewPostTextActionCreator(text);
                    store.dispatch(action);
                }
                return (

                    <MyPosts updateNewPostText={onPostChange}
                             addPost={addPost}
                             posts={store.getState().profilePage}/>
                )
            }
            }
        </StoreContext.Consumer>

    );
}


export default MyPostsContainer;
