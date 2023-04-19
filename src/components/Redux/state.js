let renderEntireTree = () => {
	console.log('yo')
}

const state = {
	navBar: {
		navMenu: {
			links: [
				{id: 1, name: 'Profile', path: '/profile'},
				{id: 2, name: 'Messages', path: '/messages/*'},
				{id: 3, name: 'News', path: '/news'},
				{id: 4, name: 'Music', path: '/music'},
				{id: 5, name: 'Video', path: '/video'},
			],
			users: [
				{id: 1, name: 'Andrew', src: 'https://i.pravatar.cc/150?img=1', alt: 'Andrew-avatar', },
				{id: 2, name: 'Alex', src: 'https://i.pravatar.cc/150?img=2', alt: 'Alex-avatar', },
				{id: 3, name: 'Nadine', src: 'https://i.pravatar.cc/150?img=3', alt: 'Nadine-avatar', },
				{id: 4, name: 'Tony', src: 'https://i.pravatar.cc/150?img=4', alt: 'Tony-avatar', },
				{id: 5, name: 'Felix', src: 'https://i.pravatar.cc/150?img=5', alt: 'Felix-avatar', },
				{id: 6, name: 'Uliana', src: 'https://i.pravatar.cc/150?img=6', alt: 'Uliana-avatar', },
			],
		},
	},
	dialogPage: {
		dialogData: [
			{id: 1, name: 'Andrew'},
			{id: 2, name: 'Alex'},
			{id: 3, name: 'Nadine'},
			{id: 4, name: 'Tony'},
			{id: 5, name: 'Felix'},
			{id: 6, name: 'Uliana'},
		],
		chatData: [
			{id: 1, message: 'Hi World ...', alt: 'Alt of img', ava: 1, },
			{id: 2, message: 'Hi Sam ...', alt: 'Alt of img', ava: 2, },
			{id: 3, message: 'omg lol ...', alt: 'Alt of img', ava: 1, },
			{
				id: 4,
				message: 'Totally boring text for test this element and bla bla bla bla?',
				alt: 'Alt of img',
				ava: 2,
			},
			{id: 5, message: 'Hi World ...', alt: 'Alt of img', ava: 1, },
			{id: 6, message: 'omg lol ...', alt: 'Alt of img', ava: 2, },
		],
		newChatMessage: '',
	},
	profilePage: {
		postsData: [
			{
				id: 1,
				message: 'Привет, мои дорогие подписчики! Я так рада, что вы зашли на мой блог. Здесь я буду писать о моей жизни, о моих путешествиях и о том, что меня вдохновляет. Буду рада вашим комментариям и предложениям!',
				likesCount: 12,
				src: 'https://i.pravatar.cc/150?img=1',
			},
			{
				id: 2,
				message: 'Приветствую всех, кто зашел на мой блог! Я специализируюсь на теме здоровья и фитнеса, и буду рад делиться с вами своим опытом и знаниями. Надеюсь, что мои статьи помогут вам быть здоровыми и счастливыми!',
				likesCount: 11111,
				src: 'https://i.pravatar.cc/300?img=2',
			},
			{
				id: 3,
				message: 'Привет, друзья! Я очень люблю путешествовать и открывать новые места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.',
				likesCount: 33,
				src: 'https://i.pravatar.cc/300?img=3',
			},
			{
				id: 4,
				message: 'Привет, друзья! Я очень ... места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.',
				likesCount: 3,
				src: 'https://i.pravatar.cc/300?img=4',
			},
		],
		newPostText: ''
	},
};

export const addPost = () => {
	let newPost = {
		id: 5,
		message: state.profilePage.newPostText,
		likesCount: 12,
		src: 'https://i.pravatar.cc/150?img=5',
	};
	state.profilePage.postsData.push(newPost);
	state.profilePage.newPostText = '';
	renderEntireTree()
}

export const addChatItem = () => {
	let newChatItem = {
		id: 6,
		message: state.dialogPage.newChatMessage,
		alt: 'Alt of img',
		ava: 1,
	};

	state.dialogPage.chatData.push(newChatItem);
	state.dialogPage.newChatMessage = '';
	renderEntireTree()
}

export const updateNewPostText = (newText) => {

	state.profilePage.newPostText = newText
	renderEntireTree()
}

export const updateNewChatText = (newText) => {

	state.dialogPage.newChatMessage = newText
	renderEntireTree()
}

export const subscriber = (observe) => {
	renderEntireTree = observe;
}

export default state;