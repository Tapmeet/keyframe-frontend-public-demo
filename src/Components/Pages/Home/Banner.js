
import React from 'react';
import play from './../../Assets/images/home/home-play-video.svg'; 
import arrow from './../../Assets/images/home/double-down-arrow.svg';
const BannerHome = () => {
  return (
    <section className="section banner-section bg">
      <div className="container">
        <div className="home-video">
          <div className="home-video__section">
            <div className="play-video">
              <img src={play} alt="banner-img" />
            </div>
            <a href="/register" className="sign-up">Sign UP NOW. YOUR FIRST DOWNLOAD IS FREE</a>
            <div className="small-title"></div>
            <div className="big-title"></div></div>
          <div className="scroll-down">
            <img src={arrow} alt="bcak-btn"/>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BannerHome