import { useContext } from "react";

// context
import { ThemeContext } from "../context/ThemeContext";

// component
import ThemeBar from "../components/ThemeBar";

function Navigation(props) {
	const { toggleTheme } = useContext(ThemeContext);

	return (
		<nav>
			<div className="container">
				<p className="hero bold">Where in the world?</p>

				<ThemeBar toggleTheme={toggleTheme} />
			</div>
		</nav>
	);
}

export default Navigation;
