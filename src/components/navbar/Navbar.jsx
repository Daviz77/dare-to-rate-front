import { Link, NavLink } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'

const Navbar = ({ currentUser }) => {
	return (
		<nav className='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
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
						<Link to='profile'>
							<img
								src={currentUser.img}
								alt='Profile'
								style={{
									maxWidth: '50px',
									maxHeight: '50px',
									objectFit: 'cover',
									borderRadius: '30%',
								}}
							/>
						</Link>
					) : (
						<div>
							<NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/login'>
								Login
							</NavLink>
							<NavLink className='nav-link' to='/signup'>
								Signup
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
