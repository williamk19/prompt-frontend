import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/Core/Navbar';
import useAuth from '../hooks/useAuth';
import MaterialReactTable from "material-react-table";
import { getAllTask } from '../services/services';

const Project = () => {
  const { authenticated, username, role } = useAuth();
  const [task, setTask] = useState([]);

  const getAllTaskFunction = async () => {
    const { res, err } = await getAllTask(authenticated);
    setTask(res.data);
  };

  useEffect(() => {
    getAllTaskFunction();
  }, []);

  const columns = [
    {
      accessorKey: "titleTask",
      header: "Judul Tugas",
    },
    {
      accessorKey: "descTask",
      header: "Deskripsi Tugas",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "user.username",
      header: "Penerima Tugas",
    },
  ];

  return (
    <>
      {(!authenticated || role !== 'ROLE_ADMIN') ? (<Navigate to='/' />) : (
        <Box>
          <Navbar username={username} role={role} />
          <Container
            maxWidth="lg"
            sx={{
              py: 6,
            }}
          >
            <Typography sx={{
              textShadow: '0px 0px 3px rgba(0,0,0,0.25)',
              fontWeight: "700"
            }} mb={3} variant="h5">
              Tugas Pekerjaan
            </Typography>
            <MaterialReactTable
              enableFullScreenToggle={false}
              enableDensityToggle={false}
              enableHiding={false}
              columns={columns}
              data={task}
              muiTablePaginationProps={{
                rowsPerPageOptions: [5, 10],
                showFirstButton: false,
                showLastButton: false,
              }}
            />
          </Container>
        </Box>
      )}
    </>
  );
};

export default Project;