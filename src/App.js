import React, { useEffect } from "react";
import './App.scss';
import { Routes, Route } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from "./components/Login/Login";
import { initializeApp } from "./components/Redux/app-reduce";
import { connect } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";
import NotFoundPage from "./components/common/404error/Error404";

function App({ initialized, initializeApp }) {
    // Используем хук useEffect для выполнения инициализации при монтировании компонента.
    useEffect(() => {
        initializeApp();
    }, [initializeApp]); // Зависимость от initializeApp, чтобы запустить инициализацию.

    // Если приложение ещё не инициализировано, отображаем индикатор загрузки.
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
                    <Route path='/profile/:userId?' element={<ProfileContainer />} />
                    <Route path="/messages/*" element={<DialogsContainer />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/users' element={<UsersContainer />} />
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
    connect(mapStateToProps, { initializeApp })
)(App);
