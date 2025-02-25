// CustomStepper.js
import React from 'react'
import { Box } from '@chakra-ui/react'
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepNumber,
 
  StepSeparator,
  StepIcon,
  useSteps,
} from '@chakra-ui/stepper'
import { Typography } from '@mui/material'

const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
  ]

const CustomStepper = ({ initialStep = 0 }) => {
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
      })
    
      const activeStepText = steps[activeStep].description

  return (
    <div>
    <Stepper size='sm' index={activeStep} gap='0'>
      {steps.map((step, index) => (
        <Step key={index} gap='0'>
          <StepIndicator>
            <StepStatus complete={<StepIcon />} />
          </StepIndicator>
          <StepSeparator _horizontal={{ ml: '0' }} />
        </Step>
      ))}
    </Stepper>
    <Typography>
      Step {activeStep + 1}: <b>{activeStepText}</b>
    </Typography>
  </div>
  )
}

export default CustomStepper
