
import React from 'react';
import { Link } from 'react-router-dom';
const InfoSection = () => {
  return (
    <section className="section info-section bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-4">
            <div className="info-box" style={{backgroundColor:"#eee"}}>
              <h4>Welcome to the Reveo</h4>
              <p> Start fast by editing a video templates. Or hit “Templates tab” above and start editing your video</p>
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