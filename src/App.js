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
         const fetchData = fetch(
            `${process.env.REACT_APP_API_URL}/movies.json`
         );
         const response = await fetchData;

         if (!response.ok) {
            throw new Error('Something went wrong!');
         }

         const jsonData = await response.json();
         let loadedMovies = [];

         for (const key in jsonData) {
            loadedMovies.unshift({
               id: key,
               title: jsonData[key].title,
               openingText: jsonData[key].openingText,
               releaseDate: jsonData[key].releaseDate,
            });
         }
         setMovies(loadedMovies);
      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, []);

   useEffect(() => {
      fetchMoviesHandler();
   }, [fetchMoviesHandler]);

   const addMovieHandler = async (movie) => {
      const response = await fetch(
         `${process.env.REACT_APP_API_URL}/movies.json`,
         {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );
      const data = await response.json();
      console.log(data);
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
