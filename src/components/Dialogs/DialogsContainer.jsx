 import {actions} from '../Redux/dialogs-reducer.ts';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
 import {compose} from "redux";


let mapStateToProps = (state) => {
	return {
		dialogs: state.dialogPage,
	}
};
let mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (text) => {
			dispatch(actions.addChatItemActionCreator(text))
		},

	}
}
// создаем HOC compose в который берет Dialogs, обрабатывает с помощью withAuthRedirect, потом результат передает в connect
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);

