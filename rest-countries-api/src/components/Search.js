import React, { useContext } from "react";

import { CountriesContext } from "../context/CountriesContext";

import { SearchSVG } from "../assets/index";

function Search() {
	const { fullCountries, setDisplayedCountries } = useContext(CountriesContext);

	const searchHandler = (evt) => {
		const searchValue = evt.target.value.toLowerCase();

		if (searchValue.length > 0) {
			const data = fullCountries.filter((country) =>
				country.name.toLowerCase().includes(searchValue)
			);
			setDisplayedCountries(data);
		} else {
			setDisplayedCountries(fullCountries);
		}
	};

	return (
		<div className="search-bar">
			<SearchSVG />
			<input
				type="text"
				placeholder="Search for a country..."
				onChange={(event) => searchHandler(event)}
			/>
		</div>
	);
}

export default Search;
