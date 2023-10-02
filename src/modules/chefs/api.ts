import axios from "axios";
import { chef } from "../../shared/types";

export async function getChefsFromAPI() {
	const result = await axios.get(`chefs`);
	return result;
}

export async function addChefFromAPI(newChef : any) {
	const result = await axios.post(`chefs`, newChef);
	return result;
}

export async function deleteChefFromAPI(chefId : string) {
	const result = await axios.delete(`chefs/${chefId}`);
	return result;
}

export async function updateChefFromAPI(chefUpdatedData : any) {
	const result = await axios.put(`chefs/${chefUpdatedData._id}`, chefUpdatedData);
	return result;
}
