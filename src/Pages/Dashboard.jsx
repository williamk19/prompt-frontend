import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    console.log(localStorage.getItem('accessToken'));
  }, [])

  return (
    <div>Dashboard</div>
  );
};

export default Dashboard;