import axios from "axios";
import { restaurant } from "../../shared/types";

export async function getRestaurantsFromAPI() {
	const result = await axios.get(`restaurants`);
	return result;
}

export async function addRestaurantFromAPI(newRestaurant : any) {
	const result = await axios.post(`restaurants`, newRestaurant);
	return result;
}

export async function deleteRestaurantFromAPI(restaurantId : string) {
	const result = await axios.delete(`restaurants/${restaurantId}`);
	return result;
}

export async function updateRestaurantFromAPI(restaurantUpdatedData : any) {
	const result = await axios.put(`restaurants/${restaurantUpdatedData._id}`, restaurantUpdatedData);
	return result;
}
