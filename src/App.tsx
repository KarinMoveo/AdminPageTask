import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./modules/home/Home";
import Header from "./modules/header/Header";
import Restaurants from "./modules/restaurants/Restaurants";
import Dishes from "./modules/dishes/Dishes";
import Chefs from "./modules/chefs/Chefs";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000/";

function App() {
	const isConnected = localStorage.getItem("isConnected");

	return (
		<Router>
			{!!isConnected && <Header />}
			<Routes>
				<Route path='/' Component={Home} />
				<Route path='/restaurants' Component={Restaurants} />
				<Route path='/dishes' Component={Dishes} />
				<Route path='/chefs' Component={Chefs} />
			</Routes>
		</Router>
	);
}

export default App;
