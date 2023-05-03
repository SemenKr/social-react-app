import {addChatItemActionCreator, updateNewChatTextActionCreator} from '../Redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


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
			dispatch(updateNewChatTextActionCreator(text))
		},

	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;
