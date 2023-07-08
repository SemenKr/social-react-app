import React from "react";
import './App.scss';
import {BrowserRouter, Routes, Route, useParams, useNavigate, useLocation} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from "./components/Login/Login";
import {getInitializeApp} from "./components/Redux/app-reduce";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";



function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        // let location = useLocation();
        // let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{ params }} />
        );
    }
    return ComponentWithRouterProp;
}

class App extends React.Component {
	componentDidMount() {
        let userId = this.props.router.params.userId; // Извлечение значения userId из объекта params
        if (!userId) {
            userId = 2;
        }
		this.props.getInitializeApp();
	}
	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}
		return (
			<BrowserRouter>
				<div className="app-wrapper">
					<HeaderContainer/>
					<NavBarContainer/>
					<div className="app__content">
						<Routes>
							<Route path="/profile" element={<ProfileContainer/>}/>
							<Route path="/messages/*" element={<DialogsContainer/>}/>
							<Route path='/news' element={<News/>}/>
							<Route path='/users' element={<UsersContainer/>}/>
							<Route path='/music' element={<Music/>}/>
							<Route path='/login' element={<Login/>}/>
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
})

export default compose(
    connect(mapStateToProps, {getInitializeApp}),
    withRouter,
)(App)