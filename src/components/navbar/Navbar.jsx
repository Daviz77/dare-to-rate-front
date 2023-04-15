import { Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import { logout } from "../../stores/AccessTokenStore"
import { profileUpdate } from "../../services/UserService"

const Navbar = ({ currentUser }) => {
	return (
		<nav className='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					Dare2Rate
				</Link>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							{currentUser ? (
								<Button onClick={logout}>Logout</Button>,
								<Button href="update-profile">Update profile</Button>

							) : (
								<NavLink
									className={({ isActive }) =>
										`nav-link ${isActive ? "active" : ""}`
									}
									to='/login'
								>
									Login
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
