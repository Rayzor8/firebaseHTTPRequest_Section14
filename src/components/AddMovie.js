import React, { useRef, useState } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
   const titleRef = useRef('');
   const openingTextRef = useRef('');
   const releaseDateRef = useRef('');

   const [errorAlert, setErrorAlert] = useState(false);

   function submitHandler(event) {
      event.preventDefault();
      if (
         titleRef.current.value.trim() === '' ||
         openingTextRef.current.value.trim() === '' ||
         releaseDateRef.current.value.trim() === ''
      ) {
         setErrorAlert(true);
         return;
      }

      if (
         titleRef.current.value.trim() &&
         openingTextRef.current.value.trim() &&
         releaseDateRef.current.value.trim()
      ) {
         const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value,
         };
         props.onAddMovie(movie);
         titleRef.current.value = '';
         openingTextRef.current.value = '';
         releaseDateRef.current.value = '';
         setErrorAlert(false);
      }
   }

   return (
      <form onSubmit={submitHandler}>
         {errorAlert && <p>Please input all fields</p>}
         <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleRef} />
         </div>
         <div className={classes.control}>
            <label htmlFor="opening-text">Opening Text</label>
            <textarea
               rows="5"
               id="opening-text"
               ref={openingTextRef}
            ></textarea>
         </div>
         <div className={classes.control}>
            <label htmlFor="date">Release Date</label>
            <input type="date" id="date" ref={releaseDateRef} />
         </div>
         <button>Add Your Movie</button>
      </form>
   );
}

export default AddMovie;
