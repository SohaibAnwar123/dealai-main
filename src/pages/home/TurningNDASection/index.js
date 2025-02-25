import React from 'react'
import dottedLine from '../../../assets/images/arrowDottedLine.png'
import icon1 from '../../../assets/images/settingIcon.png'
import icon11 from '../../../assets/images/editIcon.gif'
import icon2 from '../../../assets/images/uploadIcon.svg'
import icon22 from '../../../assets/images/uploadIcon.gif'
import icon3 from '../../../assets/images/editIcon.svg'
import icon33 from '../../../assets/images/rocket.gif'

const TurningNDASection = () => {
  return (
    <section className="turningNDA">
   <div className="container">
      <h2 className="fs40" data-aos="fade-up">We made turning NDA's easy</h2>
      <div className="turningInner">
        <div className="dottedLine"><img src={dottedLine} alt=""/></div>
        <div className="turningBox" data-aos="fade-down">
          <div className="turningContent flex_align">
            <div className="number flex_align">1</div>
            <img src={icon1} alt="" className="initialIcon"/>
            <img src={icon11} alt="" className="secondIcon"/>
          </div>
          <p className="fs21 fw500">Set your NDA
            Preferences</p>
        </div>
        <div className="turningBox" data-aos="fade-down">
          <div className="turningContent flex_align">
            <div className="number flex_align">2</div>
            <img src={icon2} alt="" className="initialIcon"/>
            <img src={icon22} alt="" className="secondIcon"/>
          </div>
          <p className="fs21 fw500">Upload NDA from
            Banker/Broker</p>
        </div>
        <div className="turningBox" data-aos="fade-down">
          <div className="turningContent flex_align">
            <div className="number flex_align">3</div>
            <img src={icon3} alt="" className="initialIcon"/>
            <img src={icon33} alt="" className="secondIcon"/>
          </div>
          <p className="fs21 fw500">Redlined & Executed NDA
            Instantly Delivered</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default TurningNDASection