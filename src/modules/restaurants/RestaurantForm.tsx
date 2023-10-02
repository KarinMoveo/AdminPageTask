import { useEffect, useState } from "react";
import { addRestaurantFromAPI, updateRestaurantFromAPI } from "./api";
import "./RestaurantForm.scss";

const initialState = {
	name: "",
	image: "",
	popularity: 0,
	address: "",
	from: "",
	to: "",
	openingDate: "",
	averagePrice: 0,
	distance: 100,
	chef: "",
	dishes: "",
};

function RestaurantForm({ onRestaurantAdded, mode, initialData }: any) {
	const [newRestaurant, setNewRestaurant] = useState(initialState);
	const [error, setError] = useState("");

	useEffect(() => {
		if (mode === "Update" && initialData) {
			const dishesIds = initialData.dishes.map((dish: any) => dish._id);
			const dishesIdsField = dishesIds.join(",");

			setNewRestaurant({ ...initialData, chef: initialData.chef._id, dishes: dishesIdsField });
		}
	}, [mode, initialData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		if (name === "openingDate" && value) {
			const date = new Date(value);
			const dateString = date.toISOString().split("T")[0];
			setNewRestaurant({ ...newRestaurant, [name]: dateString });
		} else {
			setNewRestaurant({ ...newRestaurant, [name]: value });
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const tempRestaurant = {
			...newRestaurant,
			dishes: newRestaurant.dishes.split(","),
			openingDate: newRestaurant.openingDate,
		};

		const request = mode === "Add" ? addRestaurantFromAPI : updateRestaurantFromAPI;

		try {
			await request(tempRestaurant);
			onRestaurantAdded();
			setNewRestaurant(initialState);
			setError("");
		} catch (error: any) {
			setError(error.response.data.message);
			console.log(error);
		}
	};

	return (
		<div className='restaurant-form-container'>
			<h2>{mode} Restaurant:</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Restaurant Name:</label>
					<input
						type='text'
						id='name'
						name='name'
						placeholder='Restaurant Name'
						value={newRestaurant.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Restaurant Image:</label>
					<input
						type='text'
						id='image'
						name='image'
						placeholder='Restaurant Image URL'
						value={newRestaurant.image}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Restaurant Popularity:</label>
					<input
						type='number'
						id='popularity'
						name='popularity'
						placeholder='Restaurant Popularity'
						value={newRestaurant.popularity}
						min={1}
						max={5}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Address:</label>
					<input
						type='text'
						id='address'
						name='address'
						placeholder='Restaurant Address'
						value={newRestaurant.address}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Open From:</label>
					<input
						type='text'
						id='from'
						name='from'
						placeholder='Open From'
						value={newRestaurant.from}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Open To:</label>
					<input
						type='text'
						id='to'
						name='to'
						placeholder='Open To'
						value={newRestaurant.to}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='openingDate'>Opening Date:</label>
					<input
						type='date'
						id='openingDate'
						name='openingDate'
						placeholder='Opening Date'
						value={newRestaurant.openingDate}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Average Price:</label>
					<input
						type='number'
						id='averagePrice'
						name='averagePrice'
						placeholder='Average Price'
						value={newRestaurant.averagePrice}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Chef Id:</label>
					<input
						type='text'
						id='chef'
						name='chef'
						placeholder='Chef Id'
						value={newRestaurant.chef}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>List of Dishes Id's:</label>
					<textarea
						id='dishes'
						name='dishes'
						placeholder='List of Dishes Ids(comma-separated)'
						value={newRestaurant.dishes}
						onChange={handleInputChange}
						required
					/>
				</div>
				<button type='submit'>{mode} Restaurant</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
}

export default RestaurantForm;
