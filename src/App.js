import React from "react";
import './App.scss';
import {Routes, Route, useParams} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from "./components/Login/Login";
import {initializeApp} from "./components/Redux/app-reduce";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";


class App extends React.Component {
    // Этот метод вызывается, когда компонент монтируется в DOM.
    componentDidMount() {
        this.props.initializeApp();// Инициализируем приложение.
    }

    render() {
        // Если приложение ещё не инициализировано, отображаем индикатор загрузки.
        if (!this.props.initialized) {
            return <Preloader/>
        }
        // Если приложение инициализировано, отображаем основное содержимое.
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavBarContainer/>
                <div className="app__content">
                    <Routes>
                        <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                        <Route path="/messages/*" element={<DialogsContainer/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized // Сопоставляем свойство initialized из Redux состояния с props.
})

// Функция withRouter позволяет передавать связанные с маршрутизатором свойства.
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        // let location = useLocation();
        // let navigate = useNavigate();
        let params = useParams();// Получаем параметры из URL.
        return (
            <Component {...props} router={{params}}/>// Передаем параметры как свойство router.
        );
    }

    return ComponentWithRouterProp;
}

// С помощью compose объединяем withRouter и connect, чтобы применить их к компоненту App.
export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)