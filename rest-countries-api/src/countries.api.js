export const Countries = async (param) => {
	const data = await fetch(`https://restcountries.com/rest/v2${param}`);
	const response = await data.json();

	return response;
};
