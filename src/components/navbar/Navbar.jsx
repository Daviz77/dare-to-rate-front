import { Link, NavLink } from 'react-router-dom'

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

				<div className='navbar' id='navbarSupportedContent'>
					<ul className='navbar-links me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
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
								<NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/login'>
									Login
								</NavLink>
							)}
							{currentUser ? null : (
								<NavLink className='nav-link' to='/signup'>
									Signup
								</NavLink>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
