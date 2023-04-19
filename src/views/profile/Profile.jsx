import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import './Profile.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { logout } from '../../stores/AccessTokenStore'
import { getUserFollowers } from '../../services/UserService'

const Profile = () => {
	const { currentUser, getCurrentUser } = useContext(AuthContext)
	const [followers, setFollowers] = useState([])

	useEffect(() => {
		getUserFollowers(currentUser._id)
			.then((data) => setFollowers(data))
			.catch((error) => console.error(error))
	}, [currentUser])

	return (
		<div className='profile'>
			<div className='profile__header'>
				<img className='profile__img' src={currentUser.img} alt='Profile avatar' />
				<h1 className='profile__username'>{currentUser.username}</h1>
			</div>
			<div className='profile__content'>
				<p className='profile__email'>{currentUser.email}</p>
				<p className='profile__about'>{currentUser.about}</p>
				<div className='profile__stats'>
					<p className='profile__stat'>
						<span className='profile__stat-label'>Followers:</span>
						<span className='profile__stat-number'>{followers.length}</span>
					</p>
					<p className='profile__stat'>
						<span className='profile__stat-label'>Following:</span>
						<span className='profile__stat-number'>{currentUser.followings.length}</span>
					</p>
				</div>
			</div>
			<div className='button__container'>
				<div className='button__update__profile'>
					<Link to='/update-profile'>
						<Button variant='primary'>Update Profile</Button>
					</Link>
				</div>
				<div className='button__logout'>
					<Button onClick={logout}>Logout</Button>
				</div>
			</div>
		</div>
	)
}

export default Profile
