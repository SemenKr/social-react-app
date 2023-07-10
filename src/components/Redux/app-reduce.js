import {getAuthUserData} from "./auth-reduce";

const SET_INITIALIZES = 'SET-INITIALIZES';

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZES:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;

    }


}

export const  initializedSuccess = () => ({type: SET_INITIALIZES})

export const getInitializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    //dispatch(somethingElse());
    //dispatch(somethingElse());
    Promise.all([promise])
        .then(() => {
                dispatch(initializedSuccess());
            }
        )
}


export default appReducer;
