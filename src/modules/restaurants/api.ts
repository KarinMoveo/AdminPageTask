import axios from "axios";

export async function getRestaurantsFromAPI(filters: any) {
	const result = await axios.get(`http://localhost:5000/restaurants?category=${filters.category}`);

	return result;
}
