import { Button, TextField } from '@mui/material';
import React from 'react';

const RegisterForm = ({
  setUsername,
  setPassword,
  setName,
  setEmail,
  submitRegisterHandler
}) => {
  return (
    <>
      <TextField
        required
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        id='username'
        type='text'
        variant="outlined" />
      <TextField
        required
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        id='password'
        type="password"
        variant="outlined" />
      <TextField
        onChange={(e) => setName(e.target.value)}
        label="Nama Lengkap"
        id='name'
        type='text'
        variant="outlined" />
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        label="Alamat Email"
        id='email'
        type='text'
        variant="outlined" />
      <Button
        onClick={submitRegisterHandler}
        variant="contained">
        Register
      </Button>
    </>
  );
};


export default RegisterForm;