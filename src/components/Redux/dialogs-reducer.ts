const ADD_CHAT_ITEM = 'ADD-CHAT-ITEM';

let initialState = {
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
}
const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CHAT_ITEM: {
			let newChatItem = {
				id: Date.now(),
				message: action.text,
				alt: 'Alt of img',
				ava: 1,
			};
			return {
				...state,
				chatData: [...state.chatData, newChatItem],
			}
		}


		default:
			return state;
	}
}

export const addChatItemActionCreator = (text) => ({type: ADD_CHAT_ITEM, text});
export default dialogsReducer;
