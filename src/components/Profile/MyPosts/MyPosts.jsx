import React from 'react';
import Post from './Post/Post';
import p from './MyPosts.module.scss';
import d from "../../Dialogs/Dialogs.module.css";
import {Field, Form} from "react-final-form";
// import styles from "../../Login/Login.module.scss";
import {composeValidators, maxLength, minLength} from "../../utils/validators.tsx";
import {Textarea} from "../../ui/Form-controls";
import {Button} from "@mui/material";

const AddPostForm = (props) => {
    // const required = values => (values ? undefined : "Required")
    return (
        <div className={d.chat__newMessage}>
            <Form onSubmit={props.onSubmit}>
                {({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="newPostMessage" component={Textarea} validate={composeValidators(minLength(3), maxLength(10))} />
                        <Button variant="contained" type="submit" disabled={pristine || submitting}>
                            Add post
                        </Button>
                    </form>
                )}
            </Form>

        </div>
    )
}


const MyPosts = (props) => {

    let posts = props.posts.postsData.map(post => <li key={post.id}><Post imgId={post.src} message={post.message}
                                                                          likesCount={post.likesCount}/></li>
    )

    const addPost = (values, form) => {
        props.addPost(values.newPostMessage);
        setTimeout(() => {form.reset()}, 100)

    }

    return (
        <div className={p.myPosts}>
            <div className={p.textField}>
                <AddPostForm onSubmit={addPost}/>

            </div>
            <ul>
                {posts}
            </ul>
        </div>
    );
}


export default MyPosts;
