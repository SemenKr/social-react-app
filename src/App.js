import React from "react";
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


const App = () => {
    return (
        <BrowserRouter>

            <div className="app app-wrapper">
                <Header/>
                <NavBar />
                <div className="app__content">
                    <Routes>
                        <Route path='/profile'
                               element={<Profile />}/>

                        <Route path='/messages/*'
                               element={<DialogsContainer />}/>

                        <Route path='/news' element={<News/>}/>

                        <Route path='/music' element={<Music/>}/>
                    </Routes>
                </div>
            </div>

        </BrowserRouter>

    );
}

export default App;
