import { useEffect, useState } from "react";
import { deleteDishFromAPI, getDishesFromAPI } from "./api";
import { dish } from "../../shared/types";
import DishesForm from "./DishesForm";
import "./Dishes.scss";

function Dishes() {
	const [dishesList, setDishesList] = useState<dish[]>([]);
	const [selectedDishId, setSelectedDishId] = useState<string | null>(null);

	useEffect(() => {
		async function getDishes() {
			try {
				const result = await getDishesFromAPI();
				setDishesList(result.data);
			} catch (error: unknown) {
				console.log(error);
			}
		}
		getDishes();
	}, []);

	const handleDishAdded = async () => {
		try {
			const result = await getDishesFromAPI();
			setDishesList(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteDish = async (dishId: string) => {
		try {
			await deleteDishFromAPI(dishId);
			setDishesList((prevList) => prevList.filter((r) => r._id !== dishId));
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateDish = async (dishId: string) => {
		setSelectedDishId(dishId);
	};

	const handleUpdateFormClose = () => {
		setSelectedDishId(null);
	};

	const updateFormVisible = selectedDishId !== null;
	const selectedDish = dishesList.find((d) => d._id === selectedDishId);

	return (
		<div className='dishes-page-container'>
			<div className='dishes-table-container'>
				<table>
					<thead>
						<tr>
							<th>Dish Name</th>
							<th>Dish Image</th>
							<th>Dish Ingredients</th>
							<th>Dish Icon</th>
							<th>Dish Price</th>
							<th>Dish Sides</th>
							<th>Dish Changes</th>
							<th>Dish Meal Types</th>
							<th>Dish Restaurant</th>
						</tr>
					</thead>
					<tbody>
						{dishesList.map((dish) => (
							<tr key={dish._id}>
								<td>{dish.name}</td>
								<td>
									<img src={dish.image} alt={dish.name} className='dish-image' />
								</td>
								<td>{dish.ingredients}</td>
								<td>
									<img src={dish.icon} alt={dish.icon} className='dish-icon' />
								</td>
								<td>{dish.price}₪</td>
								<td>
									{dish.side.map((dishSides, index) => (
										<span>
											{index > 0 && ", "}
											{dishSides}
										</span>
									))}
								</td>
								<td>
									{dish.changes.map((dishChanges, index) => (
										<span>
											{index > 0 && ", "}
											{dishChanges}
										</span>
									))}
								</td>
								<td>
									{dish.mealType.map((dishMealType, index) => (
										<span>
											{index > 0 && ", "}
											{dishMealType}
										</span>
									))}
								</td>
								<td>{dish.restaurant?.name}</td>
								<td>
									<button onClick={() => handleDeleteDish(dish._id)}>Delete</button>
								</td>
								<td>
									<button onClick={() => handleUpdateDish(dish._id)}>Update</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='restaurants-forms-row'>
				<DishesForm onDishAdded={handleDishAdded} mode='Add' />
				{updateFormVisible && (
					<DishesForm
						onDishAdded={() => {
							handleUpdateFormClose();
							handleDishAdded();
						}}
						mode='Update'
						initialData={selectedDish}
					/>
				)}
			</div>
		</div>
	);
}

export default Dishes;
