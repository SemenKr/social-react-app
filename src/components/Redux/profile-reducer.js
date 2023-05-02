const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

let initialState = {
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
    newPostText: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 12,
                src: 'https://i.pravatar.cc/150?img=5',
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: '',

            }
        }

        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText,
            }

        }
        default:
            return state;

    }


}

export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = text => ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;