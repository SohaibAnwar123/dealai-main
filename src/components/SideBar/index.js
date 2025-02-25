import React, { useState } from 'react';
import "./index.css";
import AddNDAButton from '../AddDaalDoc';
import Preferences from '../../assets/svg/Preferences';
import PreviousNDA from '../../assets/svg/previousNDA';
import CounterParties from '../../assets/svg/CounterParties';
import HomeIcon from '../../assets/svg/homeIcon';
import { NavLink } from 'react-router-dom';
import { Typography, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutModal from '../LogoutModel';
import Logo from '../../assets/svg/logo';

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const handleModelOpen = () => setOpen(true);
  const handleModelClose = () => setOpen(false);

  return (
    <div className='sideBar'>
      <div className='sidebar-header'>
        <div className='sidebarLogo'>
          <Logo />
        </div>
        <AddNDAButton /> {/* Assuming AddNDAButton handles navigation internally */}
      </div>
      <div className='nav-list'>
        <NavLink to="/homeNda" className={({ isActive }) => isActive ? "active" : ""}>
          <div style={{ marginLeft: "46px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HomeIcon /><Typography fontSize={"18px"} fontWeight={400} color={"#fff"} sx={{ marginLeft: "2px" }}>Dashboard</Typography >
          </div>
        </NavLink>
        <NavLink to="/preferences" className={({ isActive }) => isActive ? "active" : ""}>
          <div style={{ marginLeft: "46px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Preferences /><Typography fontSize={"18px"} fontWeight={400} color={"#fff"}>Preferences</Typography >
          </div>
        </NavLink>
        <NavLink to="/previous-nda" className={({ isActive }) => isActive ? "active" : ""}>
          <div style={{ marginLeft: "46px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PreviousNDA /><Typography fontSize={"18px"} fontWeight={400} color={"#fff"}>Previous NDAs</Typography >
          </div>
        </NavLink>
        <NavLink to="/counterParties" className={({ isActive }) => isActive ? "active" : ""}>
          <div style={{ marginLeft: "46px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CounterParties /><Typography fontSize={"18px"} fontWeight={400} color={"#fff"}>Counterparties</Typography >
          </div>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
          <div style={{ marginLeft: "46px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SettingsIcon sx={{ opacity: "0.6", color: "#fff" }} /><Typography fontSize={"18px"} fontWeight={400} color={"#fff"}>Settings</Typography >
          </div>
        </NavLink>
        <div className='navLinkLogout' onClick={handleModelOpen} style={{ cursor: 'pointer' }}>
          <div style={{ marginLeft: "46px", marginTop: "auto", marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <LogoutIcon sx={{ opacity: "0.6", color: "#fff"}} /><Typography fontSize={"18px"} fontWeight={400} color={"#fff"}>Logout</Typography >
          </div>
        </div>
      </div>
      <LogoutModal open={open} handleClose={handleModelClose} />
    </div>
  )
}

export default SideBar;
