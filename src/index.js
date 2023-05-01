import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import store from './components/Redux/redux-store';
import StoreContext from "./components/Redux/storeContext";


const root = ReactDOM.createRoot(document.getElementById('root'));

const renderEntireTree = () => {
	root.render(
		<React.StrictMode>
			<StoreContext.Provider value={store}>
				<App />
			</StoreContext.Provider>

		</React.StrictMode>
	);
}

renderEntireTree(store.getState());

store.subscribe(() => {
	let state = store.getState()
	renderEntireTree(state)
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
