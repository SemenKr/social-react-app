import React from "react";
import {addChatItemActionCreator, updateNewChatTextActionCreator} from '../Redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import StoreContext from "../Redux/storeContext";


const DialogsContainer = () => {


    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState().dialogPage;
                const addMessage = () => {
                    store.dispatch(addChatItemActionCreator())
                };
                const onChatChange = (text) => {
                    let action = updateNewChatTextActionCreator(text);
                    store.dispatch(action);
                }
                return (
                    <Dialogs updateNewChatText={onChatChange}
                             sendMessage={addMessage}
                             dialogs={state}
                    />
                )
            }
            }
        </StoreContext.Consumer>

    )
}

export default DialogsContainer;
