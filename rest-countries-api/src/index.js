import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//context
import ThemeProvider from "./context/ThemeContext";
import CountriesProvider from "./context/CountriesContext";

// styling
import "./index.css";
import "./App.css";

ReactDOM.render(
	<React.StrictMode>
		<CountriesProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</CountriesProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
