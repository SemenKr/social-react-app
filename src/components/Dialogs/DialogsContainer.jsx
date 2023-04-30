import React from "react";
import {addChatItemActionCreator, updateNewChatTextActionCreator} from '../Redux/dialogs-reducer';
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {

    let state = props.store.getState().dialogPage;
    const addMessage = () => {
        props.store.dispatch(addChatItemActionCreator())
    };
    const onChatChange = (text) => {
        let action = updateNewChatTextActionCreator(text);
        props.store.dispatch(action);
    }


    return (
        <Dialogs updateNewChatText={onChatChange}
                 sendMessage={addMessage}
                 dialogs={state}
        />
    )
}

export default DialogsContainer ;
