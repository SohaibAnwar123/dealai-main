import React, { useState, useRef } from 'react';
import laptop from '../../../assets/images/laptopImg.png';
import playBtn from '../../../assets/images/playBtn.svg';
import videoSrc from '../../../assets/videos/heroVideo.mp4';

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!isPlaying) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="heroWrap">
      <div className="container">
        <div className="heroInner">
          <div className="heroContent" data-aos="fade-up">
            <h1 className="fs56" data-aos="fade-up">
              Simplify NDAs Fast-Track Your Agreements
            </h1>
            <p data-aos="fade-right">
              Save hours of manual work reviewing, redlining, and executing NDAs by utilizing our AI-driven NDA turning
              tool. Streamline agreement reviews and get to a CIM faster and cheaper than ever.
            </p>
            {/* <a href="#" className="customBtn flex_align" data-aos="fade-up">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.2455 9.76172L8.02676 5.37305C7.37871 5.01211 6.5625 5.47559 6.5625 6.23438V14.7656C6.5625 15.5203 7.37461 15.9879 8.02676 15.627L15.2455 11.4844C15.9182 11.1111 15.9182 10.1391 15.2455 9.76172ZM20.6719 10.5C20.6719 4.88086 16.1191 0.328125 10.5 0.328125C4.88086 0.328125 0.328125 4.88086 0.328125 10.5C0.328125 16.1191 4.88086 20.6719 10.5 20.6719C16.1191 20.6719 20.6719 16.1191 20.6719 10.5ZM2.29688 10.5C2.29688 5.96777 5.96777 2.29688 10.5 2.29688C15.0322 2.29688 18.7031 5.96777 18.7031 10.5C18.7031 15.0322 15.0322 18.7031 10.5 18.7031C5.96777 18.7031 2.29688 15.0322 2.29688 10.5Z"
                  fill="white" />
              </svg>
              Watch the Video
            </a> */}
          </div>
          <div className="laptopContainer" data-aos="fade-left">
            <img src={laptop} alt="Laptop" className="laptopImage" />
            {!isPlaying && (
              <a className="playBtn" onClick={toggleVideo}>
                <img src={playBtn} alt="Play Button" />
              </a>
            )}
            <video ref={videoRef} className="video" onClick={toggleVideo}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
