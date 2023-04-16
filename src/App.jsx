import { useContext } from "react"
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Login from "./views/auth/Login"
import Profile from "./views/profile/Profile"
import AuthContext from "./contexts/AuthContext"
import Home from "./views/home/Home"
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import Signup from "./views/auth/Signup"
import Landing from "./views/home/Landing"
import SearchBar from "./components/searchBar/SearchBar"
import FilmList from "./components/FilmsList/FilmList"
import ProfileUpdate from "./views/profile/profileUpdate/ProfileUpdate"
// import { searchMovies } from "./services/FilmService"

function App() {
	const { isAuthLoaded, currentUser } = useContext(AuthContext)
	const [movies, setMovies] = useState([])

	/* 	const handleSearch = (query) => {
		searchMovies(query)
			.then((results) => {
				setMovies(results)
			})
			.catch((error) => {
				console.error(error)
			})
	} */

	return (
		<div className='App'>
			<Navbar currentUser={currentUser} />
			{/* 
			<div>
				<SearchBar onSearch={handleSearch} />
				<FilmList movies={movies} />
			</div> */}

			<div className='container my-3'>
				{!isAuthLoaded ? (
					<p>Loading...</p>
				) : (
					<Routes>
						{currentUser ? (
							<Route path='home' element={<Home />} />
						) : (
							<Route path='/' element={<Landing />} />
						)}
						<Route path='signup' element={<Signup />} />
						<Route path='login' element={<Login />} />
						<Route
							path='profile'
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route
							path='update-profile'
							element={
								<ProtectedRoute>
									<ProfileUpdate />
								</ProtectedRoute>
							}
						/>
					</Routes>
				)}
			</div>
		</div>
	)
}

export default App
