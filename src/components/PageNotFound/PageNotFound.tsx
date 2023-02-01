import React from 'react';
import { NavLink } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ marginTop: '80px' }}>
        <h1>404: PAGE NOT FOUND</h1>
        <p>Unfortunately,</p>
        <p>the page you requested was not found.</p>
        <NavLink to='/'>HOME</NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;
