import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Login from "./views/auth/Login"
import Profile from "./views/Profile"
import AuthContext from "./contexts/AuthContext"
import Home from "./views/Home"
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import Signup from "./views/auth/Signup"

function App() {
	const { isAuthLoaded } = useContext(AuthContext)
	return (
		<div className='App'>
			<Navbar />

			<div className='container my-3'>
				{!isAuthLoaded ? (
					<p>Loading...</p>
				) : (
					<Routes>
						<Route path='/' element={<Home />} />
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
					</Routes>
				)}
			</div>
		</div>
	)
}

export default App
