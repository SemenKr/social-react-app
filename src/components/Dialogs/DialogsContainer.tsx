 import {actions} from '../Redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
 import {compose} from "redux";
 import {AppStateType} from "../Redux/redux-store";
 import {ComponentType} from "react";


let mapStateToProps = (state: AppStateType) => {
	return {
		dialogs: state.dialogPage,
	}
};

// создаем HOC compose в который берет Dialogs, обрабатывает с помощью withAuthRedirect, потом результат передает в connect
export default compose<ComponentType>(
	connect(mapStateToProps, {
		sendMessage: actions.sendMessage
	}),
	withAuthRedirect
)(Dialogs)

