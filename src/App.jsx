import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Login from './views/auth/Login'
import Profile from './views/profile/Profile'
import AuthContext from './contexts/AuthContext'
import Home from './views/home/Home'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import Signup from './views/auth/Signup'
import Landing from './views/home/Landing'
import ProfileUpdate from './views/profile/profileUpdate/ProfileUpdate'
import Film from './views/film/Film'
import User from './views/user/User'

function App() {
	const { isAuthLoaded, currentUser } = useContext(AuthContext)

	return (
		<div className='App'>
			<Navbar currentUser={currentUser} />

			<div className='container my-3'>
				{!isAuthLoaded ? (
					<p>Loading...</p>
				) : (
					<Routes>
						{currentUser ? <Route path='home' element={<Home />} /> : <Route path='/' element={<Landing />} />}
						<Route path='signup' element={<Signup />} />
						<Route path='login' element={<Login />} />
						<Route path='films' element={<Film />} />
						<Route path='users/:userId' element={<User />} />
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
