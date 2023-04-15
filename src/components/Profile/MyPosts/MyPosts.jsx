import React from 'react';
import Post from './Post/Post';
import p from './MyPosts.module.css';

const MyPosts = (props) => {

	const posts = props.posts.map(post => <li><Post imgId={post.src} message={post.message} likesCount={post.likesCount} /></li>
	)

	return (
		<div className={p.myPosts}>
			<div>
				wtf Post
				<textarea name="" id="" rows="5"></textarea>
				<button type="button">
					Отправить
				</button>
			</div>
			<ul>
				{posts}
			</ul>
		</div>
	);
}



export default MyPosts;
