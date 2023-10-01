import { useEffect, useState } from "react";
import { addDishFromAPI, updateDishFromAPI } from "./api";
import "./DishesForm.scss";

const initialState = {
	name: "",
	image: "",
	ingredients: "",
	icon: "",
	price: 0,
	side: "",
	changes: "",
	mealType: "",
	restaurant: "",
};

function DishForm({ onDishAdded, mode, initialData }: any) {
	const [newDish, setNewDish] = useState(initialState);

	useEffect(() => {
		if (mode === "Update" && initialData) {
			const sides = initialData.side.map((item: any) => item).join(",");
			const changes = initialData.changes.map((item: any) => item).join(",");
			const mealType = initialData.mealType.map((item: any) => item).join(",");

			setNewDish({ ...initialData, side: sides, changes: changes, mealType: mealType });
		}
	}, [mode, initialData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setNewDish({ ...newDish, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const tempDish = {
			...newDish,
			side: newDish.side.split(","),
			changes: newDish.changes.split(","),
			mealType: newDish.mealType.split(","),
		};

		const request = mode === "Add" ? addDishFromAPI : updateDishFromAPI;

		try {
			await request(tempDish);
			onDishAdded();
			setNewDish(initialState);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='dish-form-container'>
			<h2>{mode} Dish:</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Dish Name:</label>
					<input
						type='text'
						id='name'
						name='name'
						placeholder='Dish Name'
						value={newDish.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Dish Image:</label>
					<input
						type='text'
						id='image'
						name='image'
						placeholder='Dish Image URL'
						value={newDish.image}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Dish Ingredients:</label>
					<input
						type='text'
						id='ingredients'
						name='ingredients'
						placeholder='Dish Ingredients'
						value={newDish.ingredients}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Icon:</label>
					<input
						type='text'
						id='icon'
						name='icon'
						placeholder='Dish Icon'
						value={newDish.icon}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Dish Price:</label>
					<input
						type='number'
						id='price'
						name='price'
						placeholder='Dish Price'
						value={newDish.price}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Dish Sides:</label>
					<input
						type='text'
						id='side'
						name='side'
						placeholder='Dish Sides'
						value={newDish.side}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label>Dish Changes:</label>
					<input
						type='text'
						id='changes'
						name='changes'
						placeholder='Dish Changes'
						value={newDish.changes}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Dish Meal Type:</label>
					<input
						type='text'
						id='mealType'
						name='mealType'
						placeholder='Dish Meal Type'
						value={newDish.mealType}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Restaurant Id:</label>
					<input
						type='text'
						id='restaurant'
						name='restaurant'
						placeholder='Restaurant Id'
						value={newDish.restaurant}
						onChange={handleInputChange}
						required
					/>
				</div>
				<button type='submit'>{mode} Dish</button>
			</form>
		</div>
	);
}

export default DishForm;
