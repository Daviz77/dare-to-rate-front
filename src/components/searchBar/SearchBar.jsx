import React, { useState } from 'react';
import { filterFilmById, filterFilmByTitle } from '../../services/FilmService';

function SearchBar({ filterFilmByTitle }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searchMovies(query).then((movies) => setMovies(movies));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={handleInputChange} />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
