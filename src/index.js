import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Dialogs Data
const dialogData = [
	{id: 1, name: 'Andrew'},
	{id: 2, name: 'Alex'},
	{id: 3, name: 'Nadine'},
	{id: 4, name: 'Tony'},
	{id: 5, name: 'Felix'},
	{id: 6, name: 'Uliana'},
];
const chatData = [
	{id: 1, message: 'Hi World ...', alt: 'Alt of img', ava: 1, },
	{id: 2, message: 'Hi Sam ...', alt: 'Alt of img', ava: 2, },
	{id: 3, message: 'omg lol ...', alt: 'Alt of img', ava: 1, },
	{id: 4, message: 'Totally boring text for test this element and bla bla bla bla?', alt: 'Alt of img', ava: 2, },
	{id: 5, message: 'Hi World ...', alt: 'Alt of img', ava: 1, },
	{id: 6, message: 'omg lol ...', alt: 'Alt of img', ava: 2, },
];
// Profile Data
const postsData = [
	{id: 1, message: 'Привет, мои дорогие подписчики! Я так рада, что вы зашли на мой блог. Здесь я буду писать о моей жизни, о моих путешествиях и о том, что меня вдохновляет. Буду рада вашим комментариям и предложениям!', likesCount: 12, src: 'https://i.pravatar.cc/150?img=1', },
	{id: 2, message: 'Приветствую всех, кто зашел на мой блог! Я специализируюсь на теме здоровья и фитнеса, и буду рад делиться с вами своим опытом и знаниями. Надеюсь, что мои статьи помогут вам быть здоровыми и счастливыми!', likesCount: 11111, src: 'https://i.pravatar.cc/300?img=2', },
	{id: 3, message: 'Привет, друзья! Я очень люблю путешествовать и открывать новые места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.', likesCount: 33, src: 'https://i.pravatar.cc/300?img=3', },
	{id: 4, message: 'Привет, друзья! Я очень ... места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.', likesCount: 3, src: 'https://i.pravatar.cc/300?img=4', },
]


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App
			postsData={postsData}
			chatData={chatData}
			dialogData={dialogData} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
