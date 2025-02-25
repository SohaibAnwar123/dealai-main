import React from 'react'
import { useNavigate } from 'react-router-dom';

const TrialSection = () => {
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    event.preventDefault();
    navigate('/createAccount');
  };

  return (
    <section className="trialWrap">
      <div className="container">
        <div className="d-flex justify-content-md-between justify-content-center flex-wrap gap-md-0 gap-4">
          <h2 className="fs40 fw700 secondFonts">Turn NDAs in Seconds</h2>
          <div>
            <a href="" className="flex_align customBtn" onClick={handleNavigation}>Start your Free Trial</a>
            <a href="mailto:ndaturner@mydealai.com" className="flex_align customBtn contactUs fs16">Contact us</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrialSection
