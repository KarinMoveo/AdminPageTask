import { useEffect, useState } from "react";
import { deleteChefFromAPI, getChefsFromAPI } from "./api";
import { chef } from "../../shared/types";
import ChefsForm from "./ChefsForm";
import "./Chefs.scss";

function Chefs() {
	const [chefsList, setChefsList] = useState<chef[]>([]);
	const [selectedChefId, setSelectedChefId] = useState<string | null>(null);

	useEffect(() => {
		async function getChefs() {
			try {
				const result = await getChefsFromAPI();
				setChefsList(result.data);
			} catch (error: unknown) {
				console.log(error);
			}
		}
		getChefs();
	}, []);

	const handleChefAdded = async () => {
		try {
			const result = await getChefsFromAPI();
			setChefsList(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteChef = async (chefId: string) => {
		try {
			await deleteChefFromAPI(chefId);
			setChefsList((prevList) => prevList.filter((c) => c._id !== chefId));
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateChef = async (chefId: string, chefRestaurantsIds: string[]) => {
		setSelectedChefId(chefId);
	};

	const handleUpdateFormClose = () => {
		setSelectedChefId(null);
	};

	const updateFormVisible = selectedChefId !== null;
	const selectedChef = chefsList.find((c) => c._id === selectedChefId);

	return (
		<div className='chefs-page-container'>
			<div className='chefs-table-container'>
				<table>
					<thead>
						<tr>
							<th>Chef Name</th>
							<th>Chef Image</th>
							<th>Chef Summary</th>
							<th>Chef Popularity</th>
							<th>Is Chef New</th>
							<th>Chef Restaurants</th>
						</tr>
					</thead>
					<tbody>
						{chefsList.map((chef) => (
							<tr key={chef._id}>
								<td>{chef.name}</td>
								<td>
									<img src={chef.image} alt={chef.name} className='chef-image' />
								</td>
								<td>{chef.summary}</td>
								<td>{chef.popularity}</td>
								<td>{String(chef.isNew)}</td>
								<td>
									{chef.restaurants.length > 0 ? (
										<p>
											{chef.restaurants.map((restaurant, index) => (
												<span key={restaurant.name}>
													{index > 0 && ", "}
													{restaurant.name}
												</span>
											))}
										</p>
									) : (
										<p>No restaurants available</p>
									)}
								</td>
								<td>
									<button onClick={() => handleDeleteChef(chef._id)}>Delete</button>
								</td>
								<td>
									<button
										onClick={() =>
											handleUpdateChef(
												chef._id,
												chef.restaurants.map((restaurant) => restaurant._id)
											)
										}
									>
										Update
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='restaurants-forms-row'>
				<ChefsForm onChefAdded={handleChefAdded} mode='Add' />
				{updateFormVisible && (
					<ChefsForm
						onChefAdded={() => {
							handleUpdateFormClose();
							handleChefAdded();
						}}
						mode='Update'
						initialData={selectedChef}
					/>
				)}
			</div>
		</div>
	);
}

export default Chefs;
