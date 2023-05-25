import {addChatItemActionCreator, updateNewChatTextActionCreator} from '../Redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";


let mapStateToProps = (state) => {
	return {
		dialogs: state.dialogPage,
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

const AuthDialogsRedirect = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthDialogsRedirect)

export default DialogsContainer;
