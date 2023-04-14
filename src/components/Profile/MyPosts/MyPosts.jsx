import React from 'react';
import Post from './Post/Post';
import './MyPosts.module.css';

const MyPosts = () => {

	const postData = [
		{id: 1, message: 'Привет, мои дорогие подписчики! Я так рада, что вы зашли на мой блог. Здесь я буду писать о моей жизни, о моих путешествиях и о том, что меня вдохновляет. Буду рада вашим комментариям и предложениям!', likesCount: 12, src: 'https://i.pravatar.cc/150?img=1', },
		{id: 2, message: 'Приветствую всех, кто зашел на мой блог! Я специализируюсь на теме здоровья и фитнеса, и буду рад делиться с вами своим опытом и знаниями. Надеюсь, что мои статьи помогут вам быть здоровыми и счастливыми!', likesCount: 11111, src: 'https://i.pravatar.cc/300?img=2', },
		{id: 3, message: 'Привет, друзья! Я очень люблю путешествовать и открывать новые места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.', likesCount: 33, src: 'https://i.pravatar.cc/300?img=3', },
	]

	return (
		<div>
			<div>
				wtf Post
				<textarea name="" id="" rows="5"></textarea>
				<button type="button">
					Отправить
				</button>
			</div>
			<ul>
				<li>
					<Post
						imgId={postData[0].src}
						message={postData[0].message}
						likesCount={postData[0].likesCount}
					/>
				</li>
				<li>
					<Post
						imgId={postData[1].src}
						message={postData[1].message}
						likesCount={postData[1].likesCount}
					/>
				</li>
				<li>
					<Post
						imgId={postData[2].src}
						message={postData[2].message}
						likesCount={postData[2].likesCount}
					/>
				</li>
			</ul>
		</div>
	);
};

export default MyPosts;
