function FilmList({ movies }) {
	return (
		<ul>
			{movies.map((movie) => (
				<li key={movie.id}>{movie.title}</li>
			))}
		</ul>
	)
}

export default FilmList
