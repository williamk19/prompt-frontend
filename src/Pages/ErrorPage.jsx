import { Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/prompt-black.png';
import { lightBlue } from '@mui/material/colors';

const ErrorPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: "100vh",
      }}
      maxWidth='sm'>
      <img width={200} src={logo} alt='logo' />
      <Typography
        mt={3}
        fontSize='20px'
        textAlign='center'
        fontWeight='600'
      >
        Halaman tidak ditemukan atau terjadi error
      </Typography>
      <Link to='/'>
        <Typography
          mt={2}
          fontSize='15px'
          textAlign='center'
          fontWeight='600'
          color={lightBlue[500]}
        >
          Kembali ke Login
        </Typography>
      </Link>
    </Container>
  );
};

export default ErrorPage;