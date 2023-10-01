import axios from "axios";
import { dish } from "../../shared/types";

export async function getDishesFromAPI() {
	const result = await axios.get(`http://localhost:5000/dishes`);
	return result;
}

export async function addDishFromAPI(newDish : any) {
	const result = await axios.post(`http://localhost:5000/dishes`, newDish);
	return result;
}

export async function deleteDishFromAPI(dishId : string) {
	const result = await axios.delete(`http://localhost:5000/dishes/${dishId}`);
	return result;
}

export async function updateDishFromAPI(dishUpdatedData : any) {
	const result = await axios.put(`http://localhost:5000/dishes/${dishUpdatedData._id}`, dishUpdatedData);
	return result;
}
