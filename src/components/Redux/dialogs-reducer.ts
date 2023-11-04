// Определение константы для типа action
import { InferActionsTypes} from "./redux-store";




// Определение типов данных для диалогов и чатов
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

// Начальное состояние стейта
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

// Определение типа для начального стейта
export type InitialStateDialogsType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
    addChatItemActionCreator: (text: string) => ({type: 'SN/DIALOGS/ADD_CHAT_ITEM', text} as const),
}

// Редуктор для обработки действий
const dialogsReducer = (state:InitialStateDialogsType = initialState, action: ActionTypes): InitialStateDialogsType => {
    switch (action.type) {
        case "SN/DIALOGS/ADD_CHAT_ITEM": {
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


export default dialogsReducer;
