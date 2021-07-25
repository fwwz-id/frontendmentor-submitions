// libraries
import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeContext } from "./context/ThemeContext";

// component
import Home from "./container/Home";
import CardDetail from "./components/CardDetail";
import Navigation from "./container/Navigation";

function App(props) {
	const { isDark } = useContext(ThemeContext);
	return (
		<div className={isDark ? "theme-dark" : "theme-light"}>
			<Router>
				<Navigation />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/name/:id" component={CardDetail} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
