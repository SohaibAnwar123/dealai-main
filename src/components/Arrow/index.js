import React, { useState, useEffect } from 'react';
import './index.css'; // Make sure your CSS file has the correct styles

import CreateAccount from '../../pages/nda/CreateAccount';
import ConfigureSetting from '../ConfigureSetting';
import { Typography } from '@mui/material';
import AddFirm from '../../pages/nda/AddFirmInfo';
import { useNavigate } from 'react-router-dom';

function Arrow() {
  // Check if user is logged in and adjust initial step accordingly
  const initialStep = localStorage.getItem('isLoggedIn') === '1' ? 1 : 0;
  const [activeStep, setActiveStep] = useState(initialStep);
  const navigate = useNavigate();  // Initialize navigate function

  const completeTaskAndAdvance = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setTimeout(() => {
      navigate('/Arrow'); // navigate to dashboard or appropriate route
  }, 2000);
  
  };
  const PreviousTaskAndAdvance = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = [
    { name: "Create Account", component: <CreateAccount onTaskComplete={completeTaskAndAdvance} /> },
    { name: "Configure Settings", component: <ConfigureSetting onTaskComplete={completeTaskAndAdvance}  PreviousTaskAndAdvance={PreviousTaskAndAdvance}/> },
    { name: "Add Firm Info", component: <AddFirm onTaskComplete={completeTaskAndAdvance}/> },
  ];

  const handleStepClick = (index) => {
    // Prevent going back to "Create Account" if logged in
    if (localStorage.getItem('isLoggedIn') === '1' && index === 0) {
      return; // Do nothing if user is logged in and tries to click on "Create Account"
    }
   return
  };

  return (
    <div className='main'>
      <div className='login-card-arrow'>
        <div className="progress-bar">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`step ${index === activeStep ? 'active' : ''} ${localStorage.getItem('isLoggedIn') === '1' && index === 0 ? 'inactive' : ''}`} 
              onClick={() => handleStepClick(index)}
            >
              <Typography fontSize={20} fontWeight={400}>{step.name}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className="step-content">
        {steps[activeStep].component}
      </div>
    </div>
  );
}

export default Arrow;
