import { Box, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LoginForm from '../Components/Login/LoginForm';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/dashboard');
    }
  }, []);

  const submitLoginHandler = (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      axios.post('http://localhost:8080/auth/login', {
        username: username,
        password: password
      })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
          navigate('/dashboard');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: '5rem',
      }}
    >
      <Container maxWidth='sm'>
        <Stack spacing={2}>
          <Typography
            component={'span'}
            variant='h4'
            sx={{
              textAlign: 'center',
              marginBottom: '24px'
            }}
          >
            Project Management PT (PROMPT)
          </Typography>
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            submitLoginHandler={submitLoginHandler}
          />
          <Typography
            component={'span'}
            sx={{
              color: 'black',
              textAlign: 'right',
              fontWeight: '600'
            }}
          >
            Belum memiliki akun?,
            <Link to={'/register'}>
              <Typography
                component={'span'}
                sx={{
                  display: 'inline-block',
                  textDecoration: 'underline',
                  ml: 1,
                  color: 'blue',
                  fontWeight: 'inherit'
                }}>
                Daftar Akun
              </Typography>
            </Link>
          </Typography>
          {errorMessage && (
            <Typography
              sx={{
                color: 'red',
                textAlign: 'center'
              }}
            >
              Error Ketika Login:
              <br />
              {errorMessage}
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;