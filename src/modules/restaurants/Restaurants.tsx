import { useEffect, useState } from "react";
import { deleteRestaurantFromAPI, getRestaurantsFromAPI, updateRestaurantFromAPI } from "./api";
import { restaurant } from "../../shared/types";
import "./Restaurants.scss";
import RestaurantForm from "./RestaurantForm";

function Restaurants() {
	const [restaurantsList, setRestaurantsList] = useState<restaurant[]>([]);
	const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);

	useEffect(() => {
		async function getRestaurants() {
			try {
				const result = await getRestaurantsFromAPI();
				setRestaurantsList(result.data);
			} catch (error: unknown) {
				console.log(error);
			}
		}
		getRestaurants();
	}, []);

	const handleRestaurantAdded = async () => {
		try {
			const result = await getRestaurantsFromAPI();
			setRestaurantsList(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteRestaurant = async (restaurantId: string) => {
		try {
			await deleteRestaurantFromAPI(restaurantId);
			setRestaurantsList((prevList) => prevList.filter((r) => r._id !== restaurantId));
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateRestaurant = async (restaurantId: string) => {
		setSelectedRestaurantId(restaurantId);
	};

	const handleUpdateFormClose = () => {
		setSelectedRestaurantId(null);
	};

	const updateFormVisible = selectedRestaurantId !== null;
	const selectedRestaurant = restaurantsList.find((r) => r._id === selectedRestaurantId);

	return (
		<div className='restaurants-page-container'>
			<div className='restaurants-table-container'>
				<table>
					<thead>
						<tr>
							<th>Restaurant Name</th>
							<th>Restaurant Image</th>
							<th>Restaurant Popularity</th>
							<th>Address</th>
							<th>Open From</th>
							<th>Open To</th>
							<th>Opening Date</th>
							<th>Average Price</th>
							<th>Chef Name</th>
							<th>List of Dishes</th>
						</tr>
					</thead>
					<tbody>
						{restaurantsList.map((restaurant) => (
							<tr key={restaurant.name}>
								<td>{restaurant.name}</td>
								<td>
									<img src={restaurant.image} alt={restaurant.name} />
								</td>
								<td>{restaurant.popularity}</td>
								<td>{restaurant.address}</td>
								<td>{restaurant.from}</td>
								<td>{restaurant.to}</td>
								<td>{restaurant.openingDate}</td>
								<td>{restaurant.averagePrice}</td>
								<td>{restaurant.chef.name}</td>
								<td>
									{restaurant.dishes.map((dish) => (
										<p key={dish.name}>{dish.name}</p>
									))}
								</td>
								<td>
									<button onClick={() => handleDeleteRestaurant(restaurant._id)}>Delete</button>
								</td>
								<td>
									<button onClick={() => handleUpdateRestaurant(restaurant._id)}>Update</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='restaurants-forms-row'>
				<RestaurantForm onRestaurantAdded={handleRestaurantAdded} mode='Add' />
				{updateFormVisible && (
					<RestaurantForm
						onRestaurantAdded={() => {
							handleUpdateFormClose();
							handleRestaurantAdded();
						}}
						restaurantId={selectedRestaurantId}
						mode='Update'
						// initialData={selectedRestaurant}
					/>
				)}
			</div>
		</div>
	);
}

export default Restaurants;
