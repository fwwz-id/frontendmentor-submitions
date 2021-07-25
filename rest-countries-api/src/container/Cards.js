import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CountriesContext } from "../context/CountriesContext";

import Card from "../components/Card";

function Cards() {
	const { displayedCountries, isLoading } = useContext(CountriesContext);

	const OnLoad = () => <p className="text-onload bold">Loading...</p>;

	return (
		<div className="container">
			{isLoading ? (
				<OnLoad />
			) : (
				displayedCountries.map((country) => (
					<Link to={`/name/${country.name}`} key={`key-${country.numericCode}`}>
						<Card
							flag={country.flag}
							name={country.name}
							population={country.population}
							region={country.region}
							capital={country.capital}
						/>
					</Link>
				))
			)}
		</div>
	);
}

export default Cards;
