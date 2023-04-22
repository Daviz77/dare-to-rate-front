import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'
import './Navbar.css'
import Logo from '../../assets/Logo/Logo.svg'

const Navbar = ({ currentUser }) => {
	const location = useLocation()
	const hideNavLinks = location.pathname === '/login' || location.pathname === '/signup'

	const LogoDr = () => {
		return <img src={Logo} alt='logo' className='logo-img' />
	}

	return (
		<nav className='navbar navbar-expand-lg navbar-light'>
			<div className='container-fluid'>
				{currentUser ? (
					<Link className='navbar-brand' to='home'>
						<LogoDr />
					</Link>
				) : (
					<Link className='navbar-brand' to=''>
						Dare2Rate
					</Link>
				)}
				<SearchBar />
				<div className='navbar' id='navbarSupportedContent'>
					{currentUser ? (
						<>
							<span>Hello, {currentUser.username}</span>
							<Link to='profile' className='no-decoration primary-color'>
								<img src={currentUser.img} className='profile-img' alt='Profile' />
							</Link>
						</>
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
