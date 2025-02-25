import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Modal, Box, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import "./index.css";
import Logo from '../../assets/svg/logo';
import Avatar from '../../assets/svg/avatar';
import { BASE_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem('userName'));
    };

    window.addEventListener('storage', handleStorageChange);

    // Fetch user name from the server on component mount

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  });

  // const fetchUserName = async () => {
  //   const userId = localStorage.getItem('userId'); // Ensure userId is stored in local storage
  //   if (!userId) {
  //     console.log('User ID is not available');  
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`${BASE_URL}/getUser?userId=${userId}`);
  //     if (response.data && response.data.name) {
  //       setUserName(response.data.name); // Update userName state if API call is successful
  //     } else {
  //       console.log('No user found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user name:', error);
  //   }
  // };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logout = () => {
    localStorage.clear();
    setUserName(null);
    setTimeout(() => {
      navigate('/homeNdaLanding');
      }, 2000);
    handleClose();
  };

  return (
    <div className='App-Bar'>
      <Logo />
      {userName && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconButton onClick={handleOpen}>
            <Avatar /> {/* Enhanced to be clickable for opening the modal */}
          </IconButton>
          <Typography fontSize={"14px"} fontWeight={600} color={"#FFFFFF"}>{userName}</Typography>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography id="logout-modal-title" variant="h6" component="h2">
            Ready to logout?
          </Typography>
          <Button
            startIcon={<LogoutIcon />}
            variant="outlined"
            color="error"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AppBar;
