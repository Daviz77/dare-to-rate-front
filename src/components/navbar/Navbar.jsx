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
					<Link className='navbar-img' to='home'>
						<LogoDr />
					</Link>
				) : (
					<Link className='navbar-img' to=''>
						<LogoDr />
					</Link>
				)}
				<SearchBar />
				<div className='navbar' id='navbarSupportedContent'>
					{currentUser ? (
						<>
							<span>Hello, <b>{currentUser.username}</b></span>
							<Link to='profile' className='no-decoration primary-color'>
								<img src={currentUser.img} className='navbar-profile-img' alt='Profile' />
							</Link>
						</>
					) : (
						<div className='d-flex'>
							{!hideNavLinks && (
								<>
									<NavLink
										className='link-color'
										to='/login'
										style={{ marginRight: '10px' }}
									>
										Login
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
