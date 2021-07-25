import React, { useContext, useState } from "react";

import { CountriesContext } from "../context/CountriesContext";

import { DownIndicatorSVG } from "../assets/index";

function Filter() {
	const { fullCountries, setDisplayedCountries } = useContext(CountriesContext);
	const [isOpen, setIsOpen] = useState(false);

	const regions = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

	const filterHandler = (e) => {
		const target = e.target.innerHTML.toLowerCase();

		target === "america"
			? setDisplayedCountries(
					// filtered america as americas
					fullCountries.filter(
						(country) => country.region.toLowerCase() === "americas"
					)
			  )
			: target !== "all"
			? setDisplayedCountries(
					// filtered whole data regions, except 'all'
					fullCountries.filter(
						(country) => country.region.toLowerCase() === target
					)
			  )
			: setDisplayedCountries(fullCountries);
	};

	function dropdownHandler() {
		setIsOpen(!isOpen);
	}

	return (
		<div className="dropdown light">
			<div className="dropdown-button" onClick={dropdownHandler}>
				Filter by Region
				<DownIndicatorSVG />
			</div>
			<div className="dropdown-list">
				{isOpen &&
					regions.map((region, index) => (
						<div key={index} className="dropdown-item" onClick={filterHandler}>
							{region}
						</div>
					))}
			</div>
		</div>
	);
}
export default Filter;
