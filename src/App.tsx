/// <reference lib="dom" />

import { useEffect } from "react";
import './App.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import { initializeApp } from "./components/Redux/app-reduce";
import { connect } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";
import NotFoundPage from "./components/common/404error/Error404";
import { AppStateType } from "./components/Redux/redux-store";
import { UserPage } from "./components/Users/UsersContainer";
import { LoginPage } from "./components/Login/Login";

interface PromiseRejectionEvent extends Event {
	reason?: any;
}

function App({
				 initialized,
				 initializeApp
			 }: {
	initialized: boolean;
	initializeApp: () => void;
}) {
	useEffect(() => {
		// Добавляем слушатель события unhandledrejection
		window.addEventListener("unhandledrejection", handlePromiseRejection);

		// Функция-обработчик необработанных промисов
		function handlePromiseRejection(event: PromiseRejectionEvent) {
			const { reason } = event;
			console.error("Unhandled Promise Rejection:", reason);
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
					<Route path='/users' element={<UserPage pageTitle={"Samurai"} />} />
					<Route path='/music' element={<Music />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</div>
	);
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized,
});

export default compose(
	connect(mapStateToProps, { initializeApp })
)(App);
