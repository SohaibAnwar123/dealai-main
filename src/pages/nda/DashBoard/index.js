import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../../components/SideBar';

function Dashboard() {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-content">
        <Outlet /> 
      </div>
    </div>
  );
}

export default Dashboard;