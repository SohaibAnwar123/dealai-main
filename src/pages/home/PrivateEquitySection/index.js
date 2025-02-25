import React from 'react'
import privateImg from '../../../assets/images/privateImg.png'
import { redirect, useNavigate } from 'react-router-dom';

const PrivateEquitySection = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/createAccount');
};
  return (
    <section className="privateWrap">
     <div className="container">
      <div className="d-flex justify-content-lg-between justify-content-center align-items-center flex-lg-nowrap flex-wrap gap-lg-0 gap-4">
        <div className="heroContent">
          <h2 className="fs48 fw700" data-aos="fade-right">
            Accelerating Private
            Equity Deals
          </h2>
          <p data-aos="fade-left">
            DealAI’s NDA Turner tool expedites NDA management, speeding
            up initial deal evaluations and ensuring compliance in private
            transactions.
          </p>
          <a className="customBtn flex_align" data-aos="fade-up" onClick={handleNavigation}>
            Start your Free Trial
          </a>
        </div>
        <div className="privateImg" data-aos="fade-left">
          <img src={privateImg} alt="" />
          {/* <video id="privateVideo" autoPlay loop muted>
            <source src={video} type="video/mp4"/>
          </video> */}
        </div>

      </div>
    </div>
  </section>
  )
}

export default PrivateEquitySection
