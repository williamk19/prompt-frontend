import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const TaskFormComponent = ({
  userData,
  taskTitle,
  taskDesc,
  setTaskTitle,
  setTaskDesc,
  taskAssignee,
  setTaskAssignee,
  status,
  handleChange,
  isEdit,
  onDeleteHandler,
  onSubmitHandler,
  role
}) => {
  const [inputValue, setInputValue] = React.useState('');
  return (
    <Stack spacing={3}>
      <TextField
        disabled={role === 'ROLE_EMPLOYEE' && true}
        fullWidth
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        id="title-task"
        label="Judul Tugas"
        variant="outlined" />
      <TextField
        disabled={role === 'ROLE_EMPLOYEE' && true}
        fullWidth
        multiline
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
        rows={4}
        id="desc-task"
        label="Deskripsi Tugas"
        variant="outlined" />
      <FormControl>
        <InputLabel id="status-task-label">
          Status Pekerjaan
        </InputLabel>
        <Select
          labelId="status-task-label"
          id="status-task"
          value={status}
          label="Status Pekerjaan"
          onChange={handleChange}
        >
          <MenuItem value={'TODO'}>TODO</MenuItem>
          <MenuItem value={'PROGRESS'}>PROGRESS</MenuItem>
          <MenuItem value={'DONE'}>DONE</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        disabled={role === 'ROLE_EMPLOYEE' && true}
        value={taskAssignee || null}
        onChange={(event, newValue) => {
          setTaskAssignee(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        fullWidth
        disablePortal
        id="user-autocomplete"
        options={userData}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="User" />}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: isEdit ? 'space-between' : 'end'
        }}
      >
        {(isEdit && role !== 'ROLE_EMPLOYEE' ) && (
          <Button
            onClick={onDeleteHandler}
            sx={{
              width: '10rem'
            }}
            color="error"
            variant="contained">
            HAPUS
          </Button>
        )}
        <Button
          onClick={onSubmitHandler}
          sx={{
            width: '10rem'
          }}
          variant="contained">
          SUBMIT
        </Button>
      </Box>
    </Stack>
  );
};

export default TaskFormComponent;