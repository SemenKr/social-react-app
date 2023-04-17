import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import state, {addPost} from "./components/Redux/state";

export const renderEntireTree = () => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<React.StrictMode>
			<App state={state} addPost={addPost} />
		</React.StrictMode>
	);
}