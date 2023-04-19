import React from 'react'
import { getFilmByTitle } from '../../services/FilmService'
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
	return <input type='text' placeholder='Search movie...' onKeyDown={handleKeyPress} />
}

export default SearchBar
