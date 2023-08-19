import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, auth, ...rest }) => {
  if (auth) {
    return <Navigate to="/home" />;
  }
  return <Route {...rest} element={<Element />} />;
};

const LoginRoute = ({ element: Element, auth, ...rest }) => {
    if (auth) {
      return <Navigate to="/home" />;
    }
    return <Route {...rest} element={<Element />} />;
  };

export {ProtectedRoute,LoginRoute};
