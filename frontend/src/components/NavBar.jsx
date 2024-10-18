import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { AccountCircle, Home, Search } from '@mui/icons-material';

const NavBar = () => {
  return (
    <AppBar position="static" className="bg-blue-600 shadow-md ">
      <Toolbar className="flex justify-between items-center">
        <Box className="flex items-center">
          <IconButton edge="start" color="inherit" aria-label="home" className="mr-2">
            <Home />
          </IconButton>
          <Typography variant="h6" className="text-white font-bold">
            InterviewMate
          </Typography>
        </Box>

        <Box className="flex space-x-4">
          <Button color="inherit" startIcon={<Search />}>
            Search
          </Button>
          <Button color="inherit" onClick={() => alert('Sign In')}>
            Sign In
          </Button>
          <Button color="inherit" onClick={() => alert('Sign Up')}>
            Sign Up
          </Button>
          <IconButton color="inherit" aria-label="profile">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
