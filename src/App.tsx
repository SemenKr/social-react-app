import React, {useEffect} from "react";
import './App.scss';
import {Routes, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer.tsx";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import UsersContainer from "./components/Users/UsersContainer.tsx";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from "./components/Login/Login.tsx";
import {initializeApp} from "./components/Redux/app-reduce.ts";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import NotFoundPage from "./components/common/404error/Error404";
import {Navigate} from "react-router";

function App({initialized, initializeApp}) {
	useEffect(() => {
		// Добавляем слушатель события unhandledrejection
		window.addEventListener("unhandledrejection", handlePromiseRejection);

		// Функция-обработчик необработанных промисов
		function handlePromiseRejection(event) {
			const {reason} = event;
			console.error("Unhandled Promise Rejection:", reason);

			// Опционально: предотвращение появления сообщения об ошибке в консоли браузера
			event.preventDefault();
		}

		// Вызываем инициализацию при монтировании компонента
		initializeApp();

		// Удаляем слушатель события при размонтировании компонента
		return () => {
			window.removeEventListener("unhandledrejection", handlePromiseRejection);
		};
	}, [initializeApp, initialized]);

	if (!initialized) {
		return <Preloader />;
	}


	// Если приложение инициализировано, отображаем основное содержимое.
	return (
		<div className="app-wrapper">
			<HeaderContainer />
			<NavBarContainer />
			<div className="app__content">
				<Routes>
					{/* Редирект с "/" на "/profile" */}
					<Route path="/" element={<Navigate to="/profile" />} />
					<Route path='/profile/:userId?' element={<ProfileContainer />} />
					<Route path="/messages/*" element={<DialogsContainer />} />
					<Route path='/news' element={<News />} />
					<Route path='/users' element={<UsersContainer pageTitle={"Samurai"} />} />
					<Route path='/music' element={<Music />} />
					<Route path='/login' element={<Login />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized // Сопоставляем свойство initialized из Redux состояния с props.
});

// Компонент App остается тем же, только теперь это функциональный компонент.

export default compose(
	connect(mapStateToProps, {initializeApp})
)(App);
