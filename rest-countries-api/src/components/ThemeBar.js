import { MoonSVG } from "../assets/index";

function ThemeBar({ toggleTheme }) {
	return (
		<div className="theme-switcher" onClick={toggleTheme}>
			<MoonSVG />
			<p className="theme-indicator bold">Dark Mode</p>
		</div>
	);
}

export default ThemeBar;
