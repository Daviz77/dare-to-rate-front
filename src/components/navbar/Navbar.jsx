import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'
import './Navbar.css'

const Navbar = ({ currentUser }) => {
	const location = useLocation()
	const hideNavLinks = location.pathname === '/login' || location.pathname === '/signup'

	return (
		<nav className='navbar navbar-expand-lg navbar-light'>
			<div className='container-fluid'>
				{currentUser ? (
					<Link className='navbar-brand' to='home'>
						Dare2Rate
					</Link>
				) : (
					<Link className='navbar-brand' to=''>
						Dare2Rate
					</Link>
				)}
				<SearchBar />
				<div className='navbar' id='navbarSupportedContent'>
					{currentUser ? (
						<Link to='profile' className='no-decoration primary-color'>
							Hello, {currentUser.username}{' '}
							<img src={currentUser.img} alt='Profile' />
						</Link>
					) : (
						<div className='d-flex'>
							{!hideNavLinks && (
								<>
									<NavLink
										className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
										to='/login'
										style={{ marginRight: '10px' }}
									>
										Login
									</NavLink>
									<NavLink className='nav-link' to='/signup'>
										Signup
									</NavLink>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
