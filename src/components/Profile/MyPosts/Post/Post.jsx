import React from 'react';
import p from './Post.module.css';

const Post = props =>
(
	<div className={p.post}>
		<div>
			<img className={p.post__image} src={props.imgId} alt="" />
			<p>likes<span>{props.likesCount}</span></p>
		</div>

		<p className={p.post__description}>{props.message}</p>
	</div>
);

export default Post;
