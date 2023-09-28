import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./modules/home/Home";
import Header from "./modules/header/Header";
import Restaurants from "./modules/restaurants/Restaurants";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' Component={Home} />
				<Route path='/restaurants' Component={Restaurants} />
			</Routes>
		</Router>
	);
}

export default App;
