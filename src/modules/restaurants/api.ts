import axios from "axios";
import { restaurant } from "../../shared/types";

export async function getRestaurantsFromAPI() {
	const result = await axios.get(`http://localhost:5000/restaurants/allRestaurants`);
	return result;
}

export async function addRestaurantFromAPI(newRestaurant : any) {
	const result = await axios.post(`http://localhost:5000/restaurants`, newRestaurant);
	return result;
}

export async function deleteRestaurantFromAPI(restaurantId : string) {
	const result = await axios.delete(`http://localhost:5000/restaurants/${restaurantId}`);
	return result;
}

export async function updateRestaurantFromAPI(restaurantId : string, restaurantUpdatedData : any) {
	const result = await axios.put(`http://localhost:5000/restaurants/${restaurantId}`, restaurantUpdatedData);
	return result;
}
