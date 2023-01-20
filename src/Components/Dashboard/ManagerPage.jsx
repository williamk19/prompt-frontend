import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "../../hooks/useAuth";
import { getAllTask } from "../../services/services";
import { useNavigate } from 'react-router-dom';

const ManagerPage = () => {
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
    {
      accessorKey: "user.username",
      header: "Penerima Tugas",
    },
  ];
  
  const getAllTaskFunction = async () => {
    const { res, err } = await getAllTask(authenticated);
    setTask(res.data);
  };

  useEffect(() => {
    getAllTaskFunction();
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

export default ManagerPage;
