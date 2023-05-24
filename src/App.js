  import React from "react";
import './App.scss';
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';
  import Login from "./components/Login/Login";


const App = () => {
	return (
		<BrowserRouter>

			<div className="app app-wrapper">
				<HeaderContainer />
				<NavBarContainer />
				<div className="app__content">
					<Routes>
						<Route path="/profile" element={<ProfileContainer />}>
							<Route path=":userId?" element={<ProfileContainer />} />
						</Route>

						<Route path='/messages/*'
							element={<DialogsContainer />} />

						<Route path='/news' element={<News />} />

						<Route path='/users' element={<UsersContainer />} />

						<Route path='/music' element={<Music />} />

						<Route path='/login' element={<Login />} />
					</Routes>
				</div>
			</div>

		</BrowserRouter>

	);
}

export default App;
