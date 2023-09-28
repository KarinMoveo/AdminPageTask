import { BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./modules/home/Home";
import Header from "./modules/header/Header";

function App() {
	return (
		<Router>
			<Header />
			<Home />
			<Routes></Routes>
		</Router>
	);
}

export default App;
