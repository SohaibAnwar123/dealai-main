import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAccount from '../../pages/nda/CreateAccount';
import ConfigureSetting from '../ConfigureSetting';
import AddFirm from '../../pages/nda/AddFirmInfo';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import "./index.css"
function SignUpAccount() {
  const initialStep = localStorage.getItem('isLoggedIn') === '1' ? 1 : 0;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const navigate = useNavigate();
  const isUpdate = localStorage.getItem('update') === '1';
  const isFrmInfo=localStorage.getItem('isFirmInfo') === '1';

  const PreviousTaskAndAdvance = () => {
    setCurrentStep((prevActiveStep) => prevActiveStep - 1);
  };
  const completeTaskAndAdvance = () => {
    
    setCurrentStep((prevStep) => prevStep + 1);
    // Navigate after last step, adjust based on your total steps
    if (currentStep >= steps.length - 1) {
      setTimeout(() => {
        navigate('/Arrow');
      }, 2000);
    }else if (isUpdate ){
      
      navigate('/HomeNda');

    }

  };

  const steps = [
    { name: 'Create Account', component: <CreateAccount onTaskComplete={completeTaskAndAdvance} /> },
    { name: 'Configure Settings', component: <ConfigureSetting onTaskComplete={completeTaskAndAdvance} /> },
    { name: 'Add Firm Info', component: <AddFirm onTaskComplete={completeTaskAndAdvance} PreviousTaskAndAdvance={PreviousTaskAndAdvance} /> },
    { name: 'Upload NDA', component: <AddFirm onTaskComplete={completeTaskAndAdvance} PreviousTaskAndAdvance={PreviousTaskAndAdvance} /> },
  ];

  return (
    <div className='main'>
      <div className="mainInner">
      <div className='login-card-arrow'>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={currentStep + 1} alternativeLabel>
            {steps.map((step) => (
              <Step key={step.name}>
                <StepLabel>{step.name}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="step-content">
        {steps[currentStep].component}
      </div>
      </div>
     
    </div>
  );
}

export default SignUpAccount;
