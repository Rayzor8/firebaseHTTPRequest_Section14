import React from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import WelcomePage from './components/WelcomePage';
import LoadingSpinner from './components/LoadingSpinner';
import AddMovie from './components/AddMovie';
import useFetchMovies from './hooks/useFetchMovies';

function App() {
   const { movies, isLoading, error, fetchMoviesHandler } = useFetchMovies();

   const addMovieHandler = async (movie) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
         method: 'POST',
         body: JSON.stringify(movie),
         headers: {
            'Content-Type': 'application/json',
         },
      });
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
