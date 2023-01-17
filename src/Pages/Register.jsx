import { Box, Container, Stack, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import RegisterForm from '../Components/Register/RegisterForm';
import useAuth from '../hooks/useAuth';
import { registerUser } from '../services/services';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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

  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      const { res, err } = await registerUser(username, password, name, email);
      if (err) {
        setErrorMessage(err.message);
      } else if (res) {
        navigate('/');
      }
    }
  };

  return (
    <>
      {authenticated ? (<Navigate to='/dashboard' />) : (<Box
        sx={{
          display: 'flex',
          paddingTop: '5rem',
        }}
      >
        <Container maxWidth='sm'>
          <Stack spacing={2}>
            <Typography
              variant='h4'
              sx={{
                textShadow: '0px 0px 3px rgba(0,0,0,0.5)',
                textAlign: 'center',
                marginBottom: '24px'
              }}
            >
              Project Management PT (PROMPT)
            </Typography>
            <RegisterForm
              setUsername={setUsername}
              setPassword={setPassword}
              setName={setName}
              setEmail={setEmail}
              submitRegisterHandler={submitRegisterHandler}
            />
            <Typography
              component={'span'}
              sx={{
                color: 'black',
                textAlign: 'right',
                fontWeight: '600'
              }}
            >
              Telah memiliki akun?,
              <Link to={'/'}>
                <Typography
                  component={'span'}
                  sx={{
                    display: 'inline-block',
                    textDecoration: 'underline',
                    ml: 1,
                    color: lightBlue[500],
                    fontWeight: 'inherit'
                  }}>
                  Login
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
                Error Ketika Registrasi:
                <br />
                {errorMessage}
              </Typography>
            )}
          </Stack>
        </Container>
      </Box>)}
    </>
  );
};

export default Register;