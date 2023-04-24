import React from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
	const navigate = useNavigate()
	const handleSearch = (event) => {
		event.preventDefault()
		navigate(`/films?title=${event.target.value}`)
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch(event)
		}
	}
	return (
		<div  style= {{marginTop: '24px', marginBottom: '24px'}} className='container'>
			<div className='row height d-flex justify-content-center align-items-center'>
				<div className='col-md-6'>
					<div className='text'>
						<input
							type='text'
							className='form-control'
							placeholder='Search movie...'
							onKeyDown={handleKeyPress}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchBar
