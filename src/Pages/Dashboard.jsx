import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/Core/Navbar';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const authenticated = useAuth();

  return (
    <>
      {!authenticated ? (<Navigate to='/' />) : (<Navbar />)}
    </>
  );
};

export default Dashboard;