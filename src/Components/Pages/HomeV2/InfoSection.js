
import React from 'react';
import { Link } from 'react-router-dom';
const InfoSection = () => {
  return (
    <section className="section info-section bg">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4">
            <div className="info-box">
              <h4>Welcome to your Keyframe dashboard</h4>
              <p> Start fast by editing a video template below. Or hit “Start with an empty video” for a blank canvas.</p>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="info-box bg">
              <h4>How to make your first video amazing</h4>
              <p> Tutorial video</p>
              <div className="icon">

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default InfoSection