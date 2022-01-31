import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import WelcomePage from './components/WelcomePage';
import LoadingSpinner from './components/LoadingSpinner';
import AddMovie from './components/AddMovie';

function App() {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const fetchMoviesHandler = useCallback(async () => {
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
   }, []);

   useEffect(() => {
      fetchMoviesHandler();
   }, [fetchMoviesHandler]);
   

   const addMovieHandler = (movie) => {
      console.log(movie);
   };

   let content;

   if (movies.length > 0) {
      content = <MoviesList movies={movies} />;
   }

   if (error) {
      content = <p>{error}</p>;
   }

   if (isLoading) {
      content = <LoadingSpinner />;
   }

   return (
      <React.Fragment>
         <section>
            <WelcomePage />
            <button onClick={fetchMoviesHandler}>Fetch Movies</button>
         </section>
         <section>
            <AddMovie onAddMovie={addMovieHandler} />
         </section>
         <section>{content}</section>
      </React.Fragment>
   );
}

export default App;
