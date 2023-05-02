import React from "react";
import {addChatItemActionCreator, updateNewChatTextActionCreator} from '../Redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


// const SDialogsContainer = () => {
//
//
//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 let state = store.getState().dialogPage;
//                 const addMessage = () => {
//                     store.dispatch(addChatItemActionCreator())
//                 };
//                 const onChatChange = (text) => {
//                     let action = updateNewChatTextActionCreator(text);
//                     store.dispatch(action);
//                 }
//                 return (
//                     <Dialogs updateNewChatText={onChatChange}
//                              sendMessage={addMessage}
//                              dialogs={state}
//                     />
//                 )
//             }
//             }
//         </StoreContext.Consumer>
//
//     )
// }

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogPage
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(addChatItemActionCreator())
        },
        updateNewChatText: (text) => {
            updateNewChatTextActionCreator(text)
        },

    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;
