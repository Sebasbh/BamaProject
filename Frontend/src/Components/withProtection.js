import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const withProtection = (Component) => {
  return (props) => {
    const token = localStorage.getItem('jwt');
    const location = useLocation();

    if (!token) {
      return (
        <Navigate 
          to="/" 
          replace 
          state={{ from: location }}
        />
      )
    }

    return <Component {...props} />
  };
};

export default withProtection;
