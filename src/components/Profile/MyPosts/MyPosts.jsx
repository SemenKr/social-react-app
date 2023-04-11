import React from 'react';
import p from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
	return (
		<div>
			<div>
				New Post
				<textarea name="" id="" rows="5"></textarea>
				<button type="submit" class="button">
					Отправить
				</button>
			</div>
			<ul>
				<li>
					<Post />
				</li>
				<li>
					<Post />
				</li>
				<li>
					<Post />
				</li>
			</ul>
		</div>
	);
};

export default MyPosts;
