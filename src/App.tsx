import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./modules/home/Home";
import Header from "./modules/header/Header";
import Restaurants from "./modules/restaurants/Restaurants";
import Dishes from "./modules/dishes/Dishes";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' Component={Home} />
				<Route path='/restaurants' Component={Restaurants} />
				<Route path='/dishes' Component={Dishes} />
			</Routes>
		</Router>
	);
}

export default App;
