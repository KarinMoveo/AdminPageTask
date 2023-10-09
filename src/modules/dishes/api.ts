import axios from "axios";
import { dish } from "../../shared/types";

export async function getDishesFromAPI() {
	const result = await axios.get(`dishes`);
	return result;
}

export async function addDishFromAPI(newDish : any) {
	const result = await axios.post(`dishes`, newDish);
	return result;
}

export async function deleteDishFromAPI(dishId : string) {
	const result = await axios.delete(`dishes/${dishId}`);
	return result;
}

export async function updateDishFromAPI(dishUpdatedData : any) {
	const result = await axios.put(`dishes/${dishUpdatedData._id}`, dishUpdatedData);
	return result;
}
