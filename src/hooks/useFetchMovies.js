import { useState, useEffect, useCallback } from 'react';

const useFetchMovies = () => {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const fetchMoviesHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null); // reset state error to null
      try {
         const fetchData = fetch(`${process.env.REACT_APP_API_URL}`);
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

   return { movies, isLoading, error, fetchMoviesHandler };
};

export default useFetchMovies;
