import React from 'react';
import Post from './Post/Post';
import p from './MyPosts.module.css';

const MyPosts = () =>
(
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
					imgId="https://i.pravatar.cc/150?img=1"
					message="Привет, мои дорогие подписчики! Я так рада, что вы зашли на мой блог. Здесь я буду писать о моей жизни, о моих путешествиях и о том, что меня вдохновляет. Буду рада вашим комментариям и предложениям!"
					likesCount={12}
				/>
			</li>
			<li>
				<Post
					imgId="https://i.pravatar.cc/300?img=2"
					message="Приветствую всех, кто зашел на мой блог! Я специализируюсь на теме здоровья и фитнеса, и буду рад делиться с вами своим опытом и знаниями. Надеюсь, что мои статьи помогут вам быть здоровыми и счастливыми!"
					likesCount={1}
				/>
			</li>
			<li>
				<Post
					imgId="https://i.pravatar.cc/300?img=3"
					message="Привет, друзья! Я очень люблю путешествовать и открывать новые места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия."
					likesCount={124}
				/>
			</li>
		</ul>
	</div>
);

export default MyPosts;
