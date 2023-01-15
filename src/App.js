import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Login />}
        errorElement={<ErrorPage />} />
      <Route
        path='/register'
        element={<Register />}
        errorElement={<ErrorPage />} />
      <Route
        path='/dashboard'
        element={<Dashboard />}
        errorElement={<ErrorPage />} />
    </Routes>
  );
};

export default App;
