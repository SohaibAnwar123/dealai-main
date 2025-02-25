import React from 'react'
import GoogleIcon from '../../../assets/images/GoogleIcon'
import MicrosoftIcon from '../../../assets/images/MicrosoftIcon'
import MetaIcon from '../../../assets/images/MetaIcon'
import SamsungIcon from '../../../assets/images/SamsungIcon'

const PlatformsSection = () => {
  return (
    <section className="platformWrap">
    <div className="container">
      <h2 className="fs40 mb72" data-aos="fade-down">Engineered by Minds from World-Class Institutions</h2>
      <div className="d-flex justify-content-between flex-wrap align-items-center gap-lg-0 gap-4">
        <div className="platformBox flex_align" data-aos="fade-right">
          <GoogleIcon/>
        </div>
        <div className="platformBox flex_align" data-aos="fade-down">
          <MicrosoftIcon/>
        </div>
        <div className="platformBox flex_align" data-aos="fade-up">
        <MetaIcon/>
        </div>
        <div className="platformBox flex_align" data-aos="fade-left">
         <SamsungIcon/>
        </div>
      </div>
    </div>
  </section>
  )
}

export default PlatformsSection
