import { useEffect, useState } from "react";
import "./AddRestaurantForm.scss";
import { addRestaurantFromAPI, getRestaurantsFromAPI } from "./api";
import { restaurant } from "../../shared/types";

function AddRestaurantForm({ onRestaurantAdded }: any) {
	const [newRestaurant, setNewRestaurant] = useState({
		name: "",
		image: "",
		popularity: 0,
		address: "",
		from: "",
		to: "",
		openingDate: "",
		averagePrice: 0,
		distance: 0,
		chef: "",
		dishes: [],
	});

	useEffect(() => {
		setNewRestaurant({
			name: "",
			image: "",
			popularity: 0,
			address: "",
			from: "",
			to: "",
			openingDate: "",
			averagePrice: 0,
			distance: 0,
			chef: "",
			dishes: [],
		});
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewRestaurant({
			...newRestaurant,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await addRestaurantFromAPI(newRestaurant);
			onRestaurantAdded();
		} catch (error) {
			console.log(error);
		}
		console.log("New restaurant data:", newRestaurant);
	};

	return (
		<div className='add-restaurant-form-container'>
			<h2>Add Restaurant:</h2>
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
					<label>Chef Name:</label>
					<input
						type='text'
						id='chef'
						name='chef'
						placeholder='Chef Name'
						value={newRestaurant.chef}
						onChange={handleInputChange}
						required
					/>
				</div>
				{/* <div className='form-group'>
					<label>List of Dishes:</label>
					<textarea
						id='dishes'
						name='dishes'
						placeholder='List of Dishes (comma-separated)'
						value={newRestaurant.dishes}
						onChange={handleInputChange}
						required
					/>
				</div> */}
				<button type='submit'>Add Restaurant</button>
			</form>
		</div>
	);
}

export default AddRestaurantForm;
