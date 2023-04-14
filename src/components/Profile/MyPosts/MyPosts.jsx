import React from 'react';
import Post from './Post/Post';
import p from './MyPosts.module.css';

const MyPosts = () => {

	const postsData = [
		{id: 1, message: 'Привет, мои дорогие подписчики! Я так рада, что вы зашли на мой блог. Здесь я буду писать о моей жизни, о моих путешествиях и о том, что меня вдохновляет. Буду рада вашим комментариям и предложениям!', likesCount: 12, src: 'https://i.pravatar.cc/150?img=1', },
		{id: 2, message: 'Приветствую всех, кто зашел на мой блог! Я специализируюсь на теме здоровья и фитнеса, и буду рад делиться с вами своим опытом и знаниями. Надеюсь, что мои статьи помогут вам быть здоровыми и счастливыми!', likesCount: 11111, src: 'https://i.pravatar.cc/300?img=2', },
		{id: 3, message: 'Привет, друзья! Я очень люблю путешествовать и открывать новые места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.', likesCount: 33, src: 'https://i.pravatar.cc/300?img=3', },
		{id: 4, message: 'Привет, друзья! Я очень ... места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.', likesCount: 3, src: 'https://i.pravatar.cc/300?img=4', },
	]

	const posts = postsData.map(post => <li><Post imgId={post.src} message={post.message} likesCount={post.likesCount} /></li>
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
