import React from "react";
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";



const App = (props) => {
	return (
		<BrowserRouter>


			<div className="app app-wrapper">
				<Header />
				<NavBar state={props.state.navBar} />
				<div className="app__content">
					<Routes>
						<Route path='/profile' element={<Profile addPost={props.addPost} postsData={props.state.profilePage.postsData} newPostText={props.state.profilePage.newPostText} updateNewPostText={props.updateNewPostText} />} />

						<Route path='/messages/*' element={<Dialogs dialogs={props.state.dialogPage} updateNewChatText={props.updateNewChatText} addChatItem={props.addChatItem} />} />

						<Route path='/news' element={<News />} />

						<Route path='/music' element={<Music />} />
					</Routes>
				</div>
			</div>

		</BrowserRouter>

	);
}

export default App;
