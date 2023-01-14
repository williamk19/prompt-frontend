import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useNavigation } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';

const App = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('accessToken') || null);

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard", {
        replace: true,

      });
    } else if (authenticated === null) {
      navigate("/", {
        replace: true,
        relative: 'path'
      });
    }
  }, [authenticated]);

  return (
    <Routes>
      <Route path='/' element={<Login />} errorElement={<ErrorPage />} />
      <Route path='/register' element={<Register />} errorElement={<ErrorPage />} />
      <Route
        path='/dashboard'
        element={<Dashboard />}
        errorElement={<ErrorPage />} />
    </Routes>
  );
};

export default App;
