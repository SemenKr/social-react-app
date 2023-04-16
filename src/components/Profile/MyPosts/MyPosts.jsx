import React from 'react';
import Post from './Post/Post';
import p from './MyPosts.module.css';


const MyPosts = (props) => {


	const posts = props.posts.map(post => <li><Post imgId={post.src} message={post.message} likesCount={post.likesCount} /></li>
	)

	const newPostElement = React.createRef();
	let handleClick = () => {
		let text = newPostElement.current.value
		alert(text)
	}

	return (
		<div className={p.myPosts}>
			<div className={p.textField}>
				<textarea className={p.textField__input} ref={newPostElement} wrap="soft" id="" rows="5"></textarea>
				<div className={p.textField__btnWrapper}>
					<button onClick={handleClick} className={p.btn} >Send</button >
				</div>

			</div>
			<ul>
				{posts}
			</ul>
		</div>
	);
}


export default MyPosts;
