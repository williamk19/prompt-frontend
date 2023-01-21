import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "../../hooks/useAuth";
import { getTaskByUsername } from "../../services/services";
import { useNavigate } from 'react-router-dom';

const EmployeePage = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const { authenticated, username } = useAuth();
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
  ];
  
  const getTaskByUsernameFunction = async () => {
    const { res } = await getTaskByUsername(authenticated, username);
    setTask(res.data);
  };

  useEffect(() => {
    getTaskByUsernameFunction();
  }, []);

  return (
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
        Hallo {username}
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
        muiTableBodyRowProps={({ row }) => ({
          onClick: (event) => {
            navigate(`/task/${row.original.id}`);
          },
          sx: {
            cursor: 'pointer',
          },
        })}
      />
    </Container>
  );
};

export default EmployeePage;