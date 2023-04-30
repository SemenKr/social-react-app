import React from 'react';
import Post from './Post/Post';
import p from './MyPosts.module.css';



const MyPosts = (props) => {

	let posts = props.posts.map(post => <li><Post imgId={post.src} message={post.message} likesCount={post.likesCount} /></li>
	)
	// создаем привязку "ссылку" в переменной newPost
	let newPost = React.createRef();

	// бере функцию из state которая берет newPostText из state и добавляет state объект с новым постом
	const addPost = () => {
		props.addPost();
	}

	// следит за изменением в textarea и с помощью функции из state добавляет изменения в state
	const onPostChange = () => {
		let text = newPost.current.value;
		props.updateNewPostText(text);
	}

	return (
		<div className={p.myPosts}>
			<div className={p.textField}>
				<textarea onChange={onPostChange} value={props.newPostText} className={p.textField__input} ref={newPost} />
				<div className={p.textField__btnWrapper}>
					<button onClick={addPost} className={p.btn} >Send</button >
				</div>

			</div>
			<ul>
				{posts}
			</ul>
		</div>
	);
}



export default MyPosts;
