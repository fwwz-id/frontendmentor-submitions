import React, { createContext, useState, useEffect } from "react";

import { Countries } from "../countries.api";

export const CountriesContext = createContext();

function CountriesProvider({ children }) {
	const [fullCountries, setFullCountries] = useState([]);
	const [displayedCountries, setDisplayedCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const data = await Countries("/all");

			const result =
				data.length !== 0
					? (setFullCountries(data),
					  setDisplayedCountries(data),
					  setIsLoading(false))
					: null;
			return result;
		}

		fetchData();
	}, []);

	return (
		<CountriesContext.Provider
			value={{
				fullCountries,
				displayedCountries,
				setDisplayedCountries,
				isLoading,
			}}
		>
			{children}
		</CountriesContext.Provider>
	);
}

export default CountriesProvider;
