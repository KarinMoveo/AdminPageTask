import axios from "axios";
import { chef } from "../../shared/types";

export async function getChefsFromAPI() {
	const result = await axios.get(`http://localhost:5000/chefs`);
	return result;
}

export async function addChefFromAPI(newChef : any) {
	const result = await axios.post(`http://localhost:5000/chefs`, newChef);
	return result;
}

export async function deleteChefFromAPI(chefId : string) {
	const result = await axios.delete(`http://localhost:5000/chefs/${chefId}`);
	return result;
}

export async function updateChefFromAPI(chefUpdatedData : any) {
	const result = await axios.put(`http://localhost:5000/chefs/${chefUpdatedData._id}`, chefUpdatedData);
	return result;
}
