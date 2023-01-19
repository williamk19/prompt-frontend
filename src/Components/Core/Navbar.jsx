import {
  AppBar,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  MenuItem
} from '@mui/material';
import logo from '../../assets/prompt-white.png';
import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ username, role }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const pagesByRole = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return [
          { name: 'User', url: '/dashboard' },
          { name: 'Project', url: '/project' },
          { name: 'Create', url: '/create' }
        ];
      case "ROLE_PM":
        return [
          { name: 'Project', url: '/project' },
          { name: 'Create', url: '/create' }
        ];
      case "ROLE_EMPLOYEE":
        return [
          { name: 'Project', url: '/project' },
          { name: 'Create', url: '/create' }
        ];
      default:
        return [
          { name: 'Project', url: '/project' },
          { name: 'Create', url: '/create' }
        ];
    }
  };
  const pages = pagesByRole(role);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img width={100} src={logo} alt="Logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, idx) => (
                <Link key={idx} to={page.url}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img width={100} src={logo} alt="Logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, idx) => (
              <Button
                key={idx}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Typography mx={2}>{username}</Typography>
          <Box sx={{ flexGrow: 0 }}>
            <MenuItem onClick={logoutHandler}>
              <Typography textAlign="center">LOGOUT</Typography>
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;