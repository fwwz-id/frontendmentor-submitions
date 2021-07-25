import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
	const [isDark, setIsDark] = useState(false);

	const toggleTheme = () => {
		setIsDark((isDark) => !isDark);
		setLocalItem("isDark", isDark);
	};

	const setLocalItem = (key, value) => {
		localStorage.setItem(key, value);
	};

	useEffect(() => {
		setLocalItem("isDark", isDark);
	}, [isDark]);

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
