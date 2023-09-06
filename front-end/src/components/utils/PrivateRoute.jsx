import React, { useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if(token){
      return true
    }else{
      return false
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        const { location } = props;

        if (isAuthenticated()) {
          return children; // User is authenticated, render the protected component
        } else {
        //   return <Navigate to={{ pathname: '/login', state: { from: location } }} />;
            <Navigate to={"/login"} />
        }
      }}
    />
  );
};

export default PrivateRoute;
