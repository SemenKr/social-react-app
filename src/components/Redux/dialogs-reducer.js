const UPDATE_NEW_CHAT_TEXT = 'UPDATE-NEW-CHAT-TEXT';
const ADD_CHAT_ITEM = 'ADD-CHAT-ITEM';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_CHAT_ITEM:
            let newChatItem = {
                id: 6,
                message: state.newChatMessage,
                alt: 'Alt of img',
                ava: 1,
            };

            state.chatData.push(newChatItem);
            state.newChatMessage = '';
            return state
        case UPDATE_NEW_CHAT_TEXT:
            state.newChatMessage = action.newText
            return state;
        default:
            return state;
    }
}

export const addChatItemActionCreator = () => ({type: ADD_CHAT_ITEM});

export const updateNewChatTextActionCreator = text => ({type: UPDATE_NEW_CHAT_TEXT, newText: text});

export default dialogsReducer;