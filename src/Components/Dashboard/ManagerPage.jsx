import { Container, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "../../hooks/useAuth";
import { changeUserRole, getAllTask } from "../../services/services";

const ManagerPage = () => {
  const [task, setTask] = useState([]);
  const { authenticated, username } = useAuth();
  const selectList = ["ROLE_ADMIN", "ROLE_PM", "ROLE_EMPLOYEE"];
  const columns = [
    {
      accessorKey: "username",
      header: "Username",
      enableEditing: false,
    },
    {
      accessorKey: "name",
      header: "Nama Lengkap",
      enableEditing: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableEditing: false,
    },
  ];
  const getAllTaskFunction = async () => {
    const { res, err } = await getAllTask(authenticated);
    console.log(res);
    setTask(res.data);
  };

  useEffect(() => {
    getAllTaskFunction();
  }, []);

  useEffect(() => {
    console.log(task);
  }, [task]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
      }}
    >
      <MaterialReactTable
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableHiding={false}
        columns={columns}
        editingMode="row"
        enableEditing
        data={task}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10],
          showFirstButton: false,
          showLastButton: false,
        }}
      />
    </Container>
  );
};

export default ManagerPage;
