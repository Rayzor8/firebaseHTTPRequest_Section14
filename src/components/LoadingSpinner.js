import React from 'react';
import spinnerGIF from '../img/spinner.gif';

const LoadingSpinner = () => {
   return (
      <img src={spinnerGIF} alt="loading spinner" width="40" height="40"></img>
   );
};

export default LoadingSpinner;
