import React from 'react'
import "./index.css"
import Button from '../../../components/Button'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import img from "../../../assets/images/mainLogo.svg"
import  sideImage from "../../../assets/images/A4_Flyer_Poster_in_Hands_Mockup_2 1.png"

const HomeNdaLanding = () => {
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    event.preventDefault();
    navigate('/createAccount');
  };

  const handleNavigationSignUp = (event) => {
    
    event.preventDefault();
    navigate('/signup');
  };

  return (
    <div className='container-home'>
   <div className='top-bar-button'>
   <header className="navWrap" data-aos="fade-down">
            <div className="navMain">
                <div className="container-home-nav">
                    <div className="navInner">
                        <div className="mainLogo">
                            <img src={img} alt="" />
                        </div>
                        <div className="btnzWrap">
                            <a  className="customBtn flex_align" onClick={handleNavigationSignUp}>Login</a>
                            <a  className="customBtn flex_align" onClick={handleNavigation}>SignUp</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
<div className='nda-container'>
<div className='mainContainerText'>
    <Typography fontWeight={600} fontSize={"70px"} sx={{color:"#0F46D2"}}>
    Turn NDAs in Seconds    </Typography>
  

    
</div>
<div className='justify-main'>

<div className='mainContainerDetail'>
<Typography fontWeight={500} fontSize={"26px"} fontColor={"#353535"}  >
Built by Private Equity Professionals for Private Equity Firms</Typography>
<Typography fontWeight={500} fontSize={"24px"} fontColor={"#353535"} >
Three Simple Steps:  </Typography>
<ol className='list'  style={{ listStyleType: 'none', paddingLeft: 0 }}>
    <li><Typography fontWeight={500} fontSize={"22px"} fontColor={"#353535"} lineHeight={"30px"}>1.</Typography><Typography fontWeight={500} fontSize={"22px"} fontColor={"#353535"} lineHeight={"30px"}>Configure Your Preferences</Typography></li>
    <li><Typography fontWeight={500} fontSize={"22px"} fontColor={"#353535"} lineHeight={"30px"}>2.</Typography><Typography fontWeight={500} fontSize={"22px"} fontColor={"#353535"} lineHeight={"30px"}>Upload the NDA</Typography></li>
    <li><Typography fontWeight={500} fontSize={"22px"} fontColor={"#353535"} lineHeight={"30px"}>3.</Typography><Typography fontWeight={500} fontSize={"25px"} fontColor={"#353535"} lineHeight={"30px"}> Receive a redline and executed version</Typography></li>
</ol>
<div  onClick={handleNavigationSignUp}>
  <Button text={"Try Now"} className={"button-components"}  onClick={handleNavigationSignUp}/>
    </div> 
</div>
<div className="main-image">
                            <img src={sideImage} alt="" />
                        </div>
</div>

</div>
   </div>
    </div>
  )
}

export default HomeNdaLanding
