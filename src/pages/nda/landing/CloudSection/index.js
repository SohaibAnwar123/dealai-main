import React from 'react'
import cloud1 from "../../../assets/images/cloudIcon.svg"
import cloud2 from "../../../assets/images/optimiseIcon.svg"
import cloud3 from "../../../assets/images/AiIcon.svg"
const CloudSection = () => {
  return (
    <section className="cloudWrap">
    <div className="container">
      <h2 className="fs40 mb72 fw700" data-aos="fade-down">
        DealAI Secure Cloud
      </h2>
      <div className="d-flex justify-content-between flex-wrap gap-lg-0 gap-4">
        <div className="cloudBox" data-aos="fade-right">
          <img src={cloud1} alt=""/>
          <h6 className="fs18">DealAI Cloud Security</h6>
          <p>
            Confidently secure your data with DealAI,
            leveraging advanced encryption and compliance
            measures to protect your sensitive information
            throughout the deal-making process.
          </p>
        </div>
        <div className="cloudBox" data-aos="fade-down">
          <img src={cloud2} alt=""/>
          <h6 className="fs18">DealAI Data Optimization</h6>
          <p>
            At the core of DealAI’s strength is our superior data architecture which ensures that every piece of data
            handled by our platform is optimized for accuracy and speed, enhancing your decision-making capabilities.
          </p>
        </div>
        <div className="cloudBox" data-aos="fade-left">
          <img src={cloud3} alt=""/>
          <h6 className="fs18">DealAI’s Advanced AI</h6>
          <p>
            Our cutting-edge AI technology is specifically tailored to transform the private equity sector by automating
            complex NDA processes and data analysis, ensuring you make faster, more informed decisions.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default CloudSection
