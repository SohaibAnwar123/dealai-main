import React from 'react'
import img from '../../assets/images/mainLogo.svg'
const Footer = () => {
  return (
    <footer className="footerWrap">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="mainLogo">
          <img src={img} alt=""/>
        </div>
        <p>© 2024 Deal AI. All rights reserved</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
