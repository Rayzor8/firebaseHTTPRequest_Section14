import React, { useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import WelcomePage from './components/WelcomePage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const fetchMovieshandler = async () => {
      setIsLoading(true);
      setError(null); // reset state error to null
      try {
         const fetchData = fetch('https://swapi.dev/api/films');
         const response = await fetchData;

         if (!response.ok) {
            throw new Error('Something went wrong!');
         }

         const jsonData = await response.json();
         const newFormatMoviesData = jsonData.results.map((movie) => {
            return {
               id: movie.episode_id,
               title: movie.title,
               openingText: movie.opening_crawl,
               releaseDate: movie.release_date,
            };
         });
         setMovies(newFormatMoviesData);
      } catch (err) {
         setError(err.message);
      }

      setIsLoading(false);
   };

   let content = <WelcomePage />;

   if (isLoading) {
      content = <LoadingSpinner />;
   }

   if (error) {
      content = <p>{error}</p>;
   }

   if (movies.length > 0) {
      content = <MoviesList movies={movies} />;
   }

   return (
      <React.Fragment>
         <section>
            <button onClick={fetchMovieshandler}>Fetch Movies</button>
         </section>
         <section>{content}</section>
      </React.Fragment>
   );
}

export default App;
