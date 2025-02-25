import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate('/homeNdaLanding');
    }, 2000);
    handleClose();
  };

  return (
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
  );
};

export default LogoutModal;
