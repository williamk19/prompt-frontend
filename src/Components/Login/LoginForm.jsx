import { Button, TextField } from '@mui/material';
import React from 'react';

const LoginForm = ({ setUsername, setPassword, submitLoginHandler }) => {
  return (
    <>
      <TextField
        onChange={(e) => setUsername(e.target.value)}
        id="outlined-basic"
        label="Username"
        variant="outlined" />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined" />
      <Button
        onClick={submitLoginHandler}
        variant="contained">
        Login
      </Button>
    </>
  );
};

export default LoginForm;