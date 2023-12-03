import React from 'react';
import Post from './Post/Post';
// @ts-ignore
import styles from './MyPosts.module.scss';
// @ts-ignore
import d from "../../Dialogs/Dialogs.module.css";
import {Field, Form, FormRenderProps} from "react-final-form";
import {composeValidators, maxLength, minLength} from "../../utils/validators";
import {Textarea} from "../../ui/Form-controls";
import {Button} from "@mui/material";

// Интерфейс для пропсов AddPostForm
interface AddPostFormProps {
    onSubmit: (values: { newPostMessage: string }, form: any) => void;
}


// Интерфейс для пропсов MyPosts
interface MyPostsProps {
    posts: {
        postsData: Array<{
            id: number;
            src: string;
            message: string;
            likesCount: number;
        }>;
    };
    addPost: (message: string) => void;
}

const AddPostForm: React.FC<AddPostFormProps> = (props) => {
    return (
        <div className={d.chat__newMessage}>
            <Form onSubmit={props.onSubmit}>
                {({ handleSubmit, pristine, submitting, values }: FormRenderProps<{ newPostMessage: string }>) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="newPostMessage"
                            component={Textarea}
                            validate={composeValidators(minLength(3), maxLength(10))}
                        />
                        <Button variant="contained" type="submit" disabled={pristine || submitting}>
                            Add post
                        </Button>
                    </form>
                )}
            </Form>
        </div>
    );
};

const MyPosts: React.FC<MyPostsProps> = (props) => {
    let posts = props.posts.postsData.map(post => (
        <li key={post.id}>
            <Post imgId={post.src} message={post.message} likesCount={post.likesCount} />
        </li>
    ));

    const addPost = (values: { newPostMessage: string }, form: any) => {
        props.addPost(values.newPostMessage);
        setTimeout(() => {
            form.reset();
        }, 100);
    };

    return (
        <div className={styles.myPosts}>
            <div className={styles.textField}>
                <AddPostForm onSubmit={addPost} />
            </div>
            <ul>{posts}</ul>
        </div>
    );
};

export default MyPosts;
