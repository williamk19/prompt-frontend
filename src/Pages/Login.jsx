import { Box, Typography, Alert, AlertTitle } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from '../Components/Login/LoginForm';
import { lightBlue } from '@mui/material/colors';
import useAuth from '../hooks/useAuth';
import { loginUser } from '../services/services';
import logo from '../assets/prompt-black.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage !== '') {
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  }, [errorMessage]);

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      const { res, err } = await loginUser(username, password);
      if (err) {
        setErrorMessage(err.message);
      } else if (res) {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('role', res.data.role);
        navigate('/dashboard');
      }
    }
  };

  return (
    <>
      {authenticated ? (
        <Navigate to='/dashboard' />
      ) : (
        <Box
          sx={{
            display: 'flex',
            paddingTop: '2rem',
          }}>
          <Container maxWidth='sm'>
            <Alert
              severity='info'
              sx={{
                marginBottom: '3rem',
              }}>
              <AlertTitle>
                <strong>Default Login Info</strong>
              </AlertTitle>
              <strong>username :</strong> superadmin
              <br />
              <strong>password :</strong> superadmin
            </Alert>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}>
                <img
                  sx={{
                    textShadow: '0px 0px 3px rgba(0,0,0,0.5)',
                    marginBottom: '24px',
                  }}
                  width={200}
                  src={logo}
                  alt='Logo'
                />
              </Box>
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
                  fontWeight: '600',
                }}>
                Belum memiliki akun?,
                <Link to={'/register'}>
                  <Typography
                    component={'span'}
                    sx={{
                      display: 'inline-block',
                      textDecoration: 'underline',
                      ml: 1,
                      color: lightBlue[500],
                      fontWeight: 'inherit',
                    }}>
                    Daftar Akun
                  </Typography>
                </Link>
              </Typography>
              {errorMessage && (
                <Typography
                  sx={{
                    color: 'red',
                    textAlign: 'center',
                  }}>
                  Error Ketika Login:
                  <br />
                  {errorMessage}
                </Typography>
              )}
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Login;
