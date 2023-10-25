const ADD_CHAT_ITEM = 'ADD-CHAT-ITEM';

type DialogType = {
    id: number,
    name: string
}
type ChatType = {
    id: number,
    message: string,
    alt: string,
    ava: number,
}

let initialState = {
    dialogData: [
        {id: 1 as number | null, name: 'Andrew' as string | null},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Nadine'},
        {id: 4, name: 'Tony'},
        {id: 5, name: 'Felix'},
        {id: 6, name: 'Uliana'},
    ] as Array<DialogType>,
    chatData: [
        {
            id: 1 as number | null,
            message: 'Hi World ...' as string | null,
            alt: 'Alt of img' as string | null,
            ava: 1 as number | null
        },
        {id: 2, message: 'Hi Sam ...', alt: 'Alt of img', ava: 2,},
        {id: 3, message: 'omg lol ...', alt: 'Alt of img', ava: 1,},
        {
            id: 4,
            message: 'Totally boring text for test this element and bla bla bla bla?',
            alt: 'Alt of img',
            ava: 2,
        },
        {id: 5, message: 'Hi World ...', alt: 'Alt of img', ava: 1,},
        {id: 6, message: 'omg lol ...', alt: 'Alt of img', ava: 2,},
    ] as Array<ChatType>,
}

export type InitialStateDialogsType = typeof initialState

const dialogsReducer = (state:InitialStateDialogsType = initialState, action: any): InitialStateDialogsType => {
    switch (action.type) {
        case ADD_CHAT_ITEM: {
            let newChatItem:ChatType = {
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

type AddChatItemActionCreatorActionType = {
	type: typeof ADD_CHAT_ITEM
	text: string
}
export const addChatItemActionCreator = (text: string):AddChatItemActionCreatorActionType => ({type: ADD_CHAT_ITEM, text});
export default dialogsReducer;
