import React from 'react'
import img from "../../assets/images/mainLogo.svg"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleNavigationSignUp = (event) => {
        
        event.preventDefault();
        const signUp=localStorage.getItem("isLoggedIn")
        if(signUp==="1"){
          navigate("/homeNda")
        }else {
          navigate('/Signup');
          
        }
      };
      const handleNavigationTrial = () => {
        navigate('/createAccount');
      };
    return (
        <header className="navWrap" data-aos="fade-down">
            <div className="navMain">
                <div className="container">
                    <div className="navInner">
                        <div className="mainLogo">
                            <img src={img} alt="" />
                        </div>
                        <div className="btnzWrap">
                            <a  className="customBtn flex_align" onClick={handleNavigationSignUp}>Login</a>
                            <a  className="customBtn flex_align" onClick={handleNavigationTrial}>Free Trial - No CC Required</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
