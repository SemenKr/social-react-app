import { getAuthUserData } from './auth-reduce';

const ActionTypes = {
    SET_INITIALIZED: 'SET_INITIALIZED',
};

const initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_INITIALIZED:
            return { ...state, initialized: true };
        default:
            return state;
    }
};

export const initializedSuccess = () => ({
    type: ActionTypes.SET_INITIALIZED,
});

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(initializedSuccess());
};

export default appReducer;