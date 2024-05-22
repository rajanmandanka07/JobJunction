import React from 'react';
import './Loader.css'; // Styles for the loader

const Loader = () => {
  return (
    <div className="loader-container bg-dark" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <div className="loader"></div>
  <div>
    <h1 className='text-white'>Request progressing..please wait !!</h1>
    <h1 className='text-white'>Do not refresh this page !!</h1>
  </div>
</div>


  );
};

export default Loader;
