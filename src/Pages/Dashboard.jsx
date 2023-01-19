import { Box } from '@mui/system';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/Core/Navbar';
import AdminPage from '../Components/Dashboard/AdminPage';
import EmployeePage from '../Components/Dashboard/EmployeePage';
import ManagerPage from '../Components/Dashboard/ManagerPage';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { authenticated, username, role } = useAuth();

  const rolesPageView = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return <AdminPage />
      case 'ROLE_PM':
        return <ManagerPage />
      case 'ROLE_EMPLOYEE':
        return <EmployeePage />
      default:
        return <EmployeePage />
    }
  };

  return (
    <>
      {!authenticated ? (<Navigate to='/' />) : (
        <Box>
          <Navbar username={username} role={role} />
          {rolesPageView(role)}
        </Box>
      )}
    </>
  );
};

export default Dashboard;