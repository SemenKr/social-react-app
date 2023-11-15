// Импортируем действия из dialogs-reducer.ts
import {actions} from '../Redux/dialogs-reducer';

// Импортируем компонент Dialogs
import Dialogs from "./Dialogs";

// Импортируем функцию connect из react-redux для подключения компонента к Redux store
import {connect} from "react-redux";

// Импортируем HOC для редиректа при отсутствии авторизации
import {withAuthRedirect} from "../hoc/withAuthRedirect";

// Импортируем функцию compose из redux для последовательного применения функций усилителей
import {compose} from "redux";

// Импортируем тип AppStateType из redux-store
import {AppStateType} from "../Redux/redux-store";

// Импортируем тип ComponentType из react
import {ComponentType} from "react";

// Функция mapStateToProps выбирает те части данных из store, которые нужны компоненту Dialogs
let mapStateToProps = (state: AppStateType) => {
	return {
		dialogs: state.dialogPage,
	}
};

// Создаем контейнерную компоненту DialogsContainer, которая подключена к Redux store и обернута в HOC withAuthRedirect
const DialogsContainer = compose<ComponentType>(
	// Подключаем компонент Dialogs к Redux store
	connect(mapStateToProps, {...actions}),
	// Оборачиваем компонент Dialogs в HOC withAuthRedirect
	withAuthRedirect
)(Dialogs)

// Экспортируем DialogsContainer как модуль по умолчанию
export default DialogsContainer


 //Это контейнерная компонента для Dialogs в React-Redux приложении. Она использует функцию connect из библиотеки react-redux для подключения компонента к Redux store.
//
// mapStateToProps используется для выбора тех частей данных из store, которые компоненту Dialogs нужны для отображения.
//
// actions - это объект, содержащий action creators, которые были импортированы из dialogs-reducer.ts. Они передаются в connect вместе с mapStateToProps, чтобы они были доступны в качестве пропсов в компоненте Dialogs.
//
// withAuthRedirect - это высокоуровневая компонента (HOC), которая оборачивает Dialogs и редиректит пользователя, если он не авторизован.
//
// compose из Redux используется для применения нескольких функций усилителей (в данном случае, connect и withAuthRedirect) последовательно справа налево.
//
// В итоге, DialogsContainer экспортируется как компонент, который подключен к Redux store и обернут в withAuthRedirect.
