import { useEffect, useState } from "react";
import { addChefFromAPI, updateChefFromAPI } from "./api";
import "./ChefsForm.scss";

const initialState = {
	name: "",
	image: "",
	ingredients: "",
	summary: "",
	popularity: 0,
	isNew: "",
	restaurants: [],
};

function ChefForm({ onChefAdded, mode, initialData }: any) {
	const [newChef, setNewChef] = useState(initialState);
	const [error, setError] = useState("");

	useEffect(() => {
		if (mode === "Update" && initialData) {
			const restaurantsIds = initialData.restaurants.map((restaurant: any) => restaurant._id);
			const restaurantsIdsField = restaurantsIds.join(",");
			setNewChef({ ...initialData, restaurants: restaurantsIdsField });
		}
	}, [mode, initialData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setNewChef({ ...newChef, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const tempChef = {
			...newChef,
		};

		const request = mode === "Add" ? addChefFromAPI : updateChefFromAPI;

		try {
			await request(tempChef);
			setNewChef(initialState);
			onChefAdded();
			setError("");
		} catch (error: any) {
			setError(error.response.data.message);
			console.log(error);
		}
	};

	return (
		<div className='chef-form-container'>
			<h2>{mode} Chef:</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Chef Name:</label>
					<input
						type='text'
						id='name'
						name='name'
						placeholder='Chef Name'
						value={newChef.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Chef Image:</label>
					<input
						type='text'
						id='image'
						name='image'
						placeholder='Chef Image URL'
						value={newChef.image}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Chef Summary:</label>
					<input
						type='text'
						id='summary'
						name='summary'
						placeholder='Chef Summary'
						value={newChef.summary}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Chef Popularity:</label>
					<input
						type='text'
						id='popularity'
						name='popularity'
						placeholder='Chef Popularity'
						value={newChef.popularity}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Is Chef New:</label>
					<input
						type='text'
						id='isNew'
						name='isNew'
						placeholder='Is Chef New'
						value={String(newChef.isNew)}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Chef Restaurants:</label>
					<input
						type='text'
						id='restaurants'
						name='restaurants'
						placeholder='Chef Restaurants'
						value={newChef.restaurants}
						onChange={handleInputChange}
						// required
					/>
				</div>
				<button type='submit'>{mode} Chef</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
}

export default ChefForm;
