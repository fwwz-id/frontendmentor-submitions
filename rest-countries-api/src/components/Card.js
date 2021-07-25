function Card({ flag, name, population, region, capital }) {
	const alt = `${name}'s flag`;

	// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	const giveCommas = (x) => {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	};
	return (
		<div className="card">
			<div className="card-image">
				<img src={flag} alt={alt} />
			</div>
			<div className="card-description">
				<p className="bold title">{name}</p>
				<div className="subtitle">
					<p className="semi-bold">
						Population: <span className="light">{giveCommas(population)}</span>
					</p>
					<p className="semi-bold">
						Region: <span className="light">{region}</span>
					</p>
					<p className="semi-bold">
						Capital: <span className="light">{capital}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Card;
