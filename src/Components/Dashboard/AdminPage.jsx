import { Container, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import useAuth from '../../hooks/useAuth';
import { getAllUser, changeUserRole } from '../../services/services';

const AdminPage = () => {
  const { authenticated, username } = useAuth();
  const [userData, setUserData] = useState([]);

  const selectList = ["ROLE_ADMIN", "ROLE_PM", "ROLE_EMPLOYEE"];
  const columns = [
    {
      accessorKey: 'username',
      header: 'Username',
      enableEditing: false,
    },
    {
      accessorKey: 'name',
      header: 'Nama Lengkap',
      enableEditing: false,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      enableEditing: false,
    },
    {
      accessorKey: 'roles.0.roleName',
      id: 'roleName',
      header: 'Role',
      muiTableBodyCellEditTextFieldProps: (d) => {
        if (d.row.original.username === username) {
          return d.table.setEditingRow(false);
        } else {
          return {
            children: selectList.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            )),
            select: true,
          };
        }
      }
    },
  ];

  const getUserData = async () => {
    const { res, err } = await getAllUser(authenticated);
    setUserData(res.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const saveRowHandler = async ({ row, values }) => {
    const { res, err } = await changeUserRole(
      row.original.id,
      values.roleName,
      authenticated
    );
    getUserData();
  };

  const closeRowHandler = () => {
    getUserData();
  };

  return (
    <Container maxWidth="lg" sx={{
      py: 6,
    }}>
      <MaterialReactTable

        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableHiding={false}
        columns={columns}
        editingMode="row"
        enableEditing
        data={userData}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10],
          showFirstButton: false,
          showLastButton: false,
        }}
        onEditingRowSave={saveRowHandler}
        onEditingRowCancel={closeRowHandler}
      />
    </Container>
  );
};

export default AdminPage;