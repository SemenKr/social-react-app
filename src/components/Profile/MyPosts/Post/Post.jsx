import React from 'react';
import p from './Post.module.css';

const Post = props => {
	return (
		<div className={p.post}>
			<img className={p.post__image} src={props.imgId} alt="" />
			<p className={p.post__description}>{props.message}</p>
		</div>
	);
};

export default Post;
