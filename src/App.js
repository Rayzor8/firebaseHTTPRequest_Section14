import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
   const [movies, setMovies] = useState([]);

   const fetchMovieshandler = async () => {
      const fetchData = fetch('https://swapi.dev/api/films');
      const response = await fetchData;
      const jsonData = await response.json();
      const newFormatMoviesData = jsonData.results.map(movie => {
         return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date
         }
      })
      setMovies(newFormatMoviesData);
   };

  console.log(movies)



   return (
      <React.Fragment>
         <section>
            <button onClick={fetchMovieshandler}>Fetch Movies</button>
         </section>
         <section>
            <MoviesList movies={movies} />
         </section>
      </React.Fragment>
   );
}

export default App;
