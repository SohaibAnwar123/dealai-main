import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthHandler() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkUserStatus();
  }, [location, navigate, userId]);

  const checkUserStatus = () => {
    const trialStart = localStorage.getItem('AccountDate');
    const isPaid = localStorage.getItem('isPaid');
    const isFirminfo = localStorage.getItem('isFirmInfo');


    const trialPeriod = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
    const trialEnd = new Date(trialStart).getTime() + trialPeriod;
    const currentDate = new Date().getTime();
  
    if (isPaid === "0" && currentDate > trialEnd) {
      navigate('/payment');
    } else if (isPaid === "1" || currentDate <= trialEnd) {
      if (userId &&  isFirminfo===1) {
        // You can check for additional conditions here and navigate accordingly
        const currentPath = window.location.pathname;
        console.log("currentPath",currentPath)
          if(currentPath==="preferences"){
            navigate('/preferences');
            
          }else if(currentPath==="previous-nda") {
            
            navigate('/previous-nda');
          }else if(currentPath==="counterParties"){
            navigate('/counterParties');

            }else {
              
              navigate('/homeNda');
          }
    
      }
      
    }
  };

  return null; // This component does not render anything
}

export default AuthHandler;
