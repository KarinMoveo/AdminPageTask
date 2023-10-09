import { ChangeEvent, useState, MouseEvent } from "react";
import { authenticateUserFromAPI } from "./api";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

function Home() {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const isFormValid = credentials.email && credentials.password;

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setCredentials((prev) => ({ ...prev, [name]: value }));
	};

	const handleAction = async (event: MouseEvent<HTMLButtonElement>, action: "login") => {
		event.preventDefault();
		try {
			const response = await authenticateUserFromAPI(credentials, action);
			console.log(response);
			if (response.isAdmin) {
				localStorage.setItem("isConnected", "true");
				navigate("restaurants");
				window.location.reload();
			} else {
				setError("An error occurred while making the request.");
			}
		} catch (error) {
			setError("An error occurred while making the request.");
		}
	};

	return (
		<div className='home-container'>
			<p className='sign-in-title'>Hello dear admin 👋🏼 Please login:</p>
			<form className='sign-in-form'>
				<div className='inputs-container'>
					<label className='sign-in-label'>Email address</label>
					<input
						className='sign-in-input'
						type='email'
						id='email'
						name='email'
						placeholder='Email address'
						onChange={handleInputChange}
						required
					/>
					<br />
					<label className='sign-in-label'>Password</label>
					<input
						className='sign-in-input'
						type='password'
						id='password'
						name='password'
						placeholder='Password'
						onChange={handleInputChange}
						required
					/>
				</div>

				<button
					disabled={!isFormValid}
					className='login-button'
					type='submit'
					onClick={(e) => handleAction(e, "login")}
				>
					LOGIN
				</button>
			</form>

			{error && <div className='error-message'>{error}</div>}
		</div>
	);
}

export default Home;
