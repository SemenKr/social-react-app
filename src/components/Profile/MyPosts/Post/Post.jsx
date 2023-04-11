import React from 'react';
import p from './Post.module.css';

const Post = () => {
	return (
		<div className={p.post}>
			<img src="https://i.pravatar.cc/300" alt="" />
			<p>Post1</p>
		</div>
	);
};

export default Post;
