import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Login from "./views/auth/Login"
import Profile from "./views/profile/Profile"
import AuthContext from "./contexts/AuthContext"
import Home from "./views/home/Home"
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import Signup from "./views/auth/Signup"
import Landing from "./views/home/Landing"

function App() {
	const { isAuthLoaded, currentUser } = useContext(AuthContext)
	return (
		<div className='App'>
			<Navbar currentUser={currentUser}/>

			<div className='container my-3'>
				{!isAuthLoaded ? (
					<p>Loading...</p>
				) : (
					<Routes>
						{currentUser ? <Route path='/' element={<Home />} /> : <Route path='/' element={<Landing />} />}
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
