import { useEffect, useState } from "react";
import { getRestaurantsFromAPI } from "./api";
import { restaurant } from "../../shared/types";
import "./Restaurants.scss";
import AddRestaurantForm from "./AddRestaurantForm";

function Restaurants() {
	const [restaurantsList, setRestaurantsList] = useState<restaurant[]>([]);

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
			console.log(result.data);
		} catch (error) {
			console.log(error);
		}
	};

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
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<AddRestaurantForm onRestaurantAdded={handleRestaurantAdded} />
		</div>
	);
}

export default Restaurants;
