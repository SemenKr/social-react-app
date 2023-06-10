import React from 'react';
import Post from './Post/Post';
import p from './MyPosts.module.scss';
import d from "../../Dialogs/Dialogs.module.css";
import {Field, Form, FormSpy} from "react-final-form";
import styles from "../../Login/Login.module.scss";
import {Button} from "@mui/material";



const MyPosts = (props) => {

	let posts = props.posts.postsData.map(post => <li key={post.id} ><Post imgId={post.src} message={post.message} likesCount={post.likesCount} /></li>
	)
	// создаем привязку "ссылку" в переменной newPost
	let newPost = React.createRef();

	// бере функцию из state которая берет newPostText из state и добавляет state объект с новым постом
	const addPost = (values) => {
		props.addPost(values.newPostMessage);
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

const AddPostForm = (props) => {
	const required = values => (values ? undefined : "Required")

	return (
		<div className={d.chat__newMessage}>
			<Form onSubmit={props.onSubmit}>
				{({handleSubmit, values}) => (
					<form onSubmit={handleSubmit} >
						<Field name='newPostMessage'
							   validate={required}
							   component='textarea'
							   subscription={{
								   value: true,
								   active: true,
								   touched: true,
								   error: true,
							   }}
						>{({input, meta, placeholder}) => (
							<div className={`${styles.fieldWrapper} ${meta.active ? styles.active : ''}`}>
								{/*<label htmlFor="fitstName">Имя</label>*/}
								<textarea {...input}  className={d.textField__input}  wrap="soft" id="" rows="2" />
							</div>
						)}</Field>
						<FormSpy subscription={{pristine: true}}>
							{props => (
								<Button
									variant="contained"
									type="submit"
									disabled={props.pristine}
								>
									Send
								</Button>
							)}
						</FormSpy>
					</form>
				)}
			</Form>
		</div>
	)
}


export default MyPosts;
