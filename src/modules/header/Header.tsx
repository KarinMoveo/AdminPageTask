import { NavLink } from "react-router-dom";

import "./Header.scss";

const routes = [
	{ to: "/", text: "EPICURE" },
	{ to: "/restaurants", text: "Restaurants" },
	{ to: "/dishes", text: "Dishes" },
	{ to: "/chefs", text: "Chefs" },
];

function Header() {
	const isActiveClass = ({ isActive }: { isActive: boolean }) => {
		return isActive ? "selected-route" : "route-item";
	};

	return (
		<nav className='header-container'>
			{routes.map((route) => (
				<NavLink key={route.to} to={route.to} className={isActiveClass}>
					{route.text}
				</NavLink>
			))}
		</nav>
	);
}

export default Header;
