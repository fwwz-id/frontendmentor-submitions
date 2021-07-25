import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../context/ThemeContext";
import { CountriesContext } from "../context/CountriesContext";

import { LeftArrowSVG } from "../assets/index";

// util
import { Countries } from "../countries.api";

function Detail({ history, match }) {
	const { isDark } = useContext(ThemeContext);
	const { fullCountries } = useContext(CountriesContext);

	const [country, setCountry] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await Countries(`/name/${match.params.id}`);
			setCountry(data);
		})();
	}, [match.params.id]);

	const backButtonClickHandler = () => history.push("/");

	return (
		<div className={`card-detail ${isDark ? "theme-dark" : "theme-light"}`}>
			{country.map((item) => {
				return (
					<div className="container" key={item.alpha2Code}>
						<div
							className="button button-back"
							onClick={backButtonClickHandler}
						>
							<LeftArrowSVG />
							Back
						</div>
						<div className="details">
							<div className="flag">
								<img src={item.flag} alt={item.name} />
							</div>
							<div className="descriptions">
								<p className="title bold">{item.name}</p>

								<Left
									native={item.nativeName}
									population={item.population}
									region={item.region}
									subregion={item.subregion}
									capital={item.capital}
								/>

								<Right
									domains={item.topLevelDomain}
									currencies={item.currencies}
									languages={item.languages}
								/>

								<div className="borders">
									<p className="semi-bold">border countries: </p>
									{item.borders.map((border) => {
										// "c" for country
										const codeToName = fullCountries.filter(
											(c) => c.alpha3Code === border
										);
										const [c] = codeToName;
										return (
											c !== undefined && (
												<Link to={`/name/${c.name}`} key={border}>
													<div className="button button-border">
														<p className="light">{c.name}</p>
													</div>
												</Link>
											)
										);
									})}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

function Left({ native, population, region, subregion, capital }) {
	function giveCommas(x) {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<div className="left">
			<p>
				native name: <span>{native}</span>
			</p>
			<p>
				population: <span>{giveCommas(population)}</span>
			</p>
			<p>
				region: <span>{region}</span>
			</p>
			<p>
				subregion: <span>{subregion}</span>
			</p>
			<p>
				capital: <span>{capital}</span>
			</p>
		</div>
	);
}

function Right({ domains, currencies, languages }) {
	const domain = domains.map((domain) => domain);
	const currency = currencies.map((currency) => currency.name).join(", ");
	const lang = languages.map((language) => language.name).join(", ");

	return (
		<div className="right">
			<p>
				top level domain: <span>{domain}</span>
			</p>
			<p>
				currencies: <span>{currency}</span>
			</p>
			<p>
				languages: <span>{lang}</span>
			</p>
		</div>
	);
}

export default Detail;
