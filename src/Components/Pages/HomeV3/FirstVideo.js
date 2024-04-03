import React from "react";
import img1 from "./../../Assets/images/home/section1.png";
const FirstVideo = () => {
  return (
    <section className="firstVideo-wrapper section">
      <div className=" container text-center">
        <div className="row justify-content-center">
          <div className="col-sm-7 col-12">
            <h2>Make your first video today </h2>
            <p>
              Create videos for free or upgrade to unlock more customization
            </p>
            <div className="d-flex">
              <div>
                <a href="/login" className=" btn-new">
                  GET STARTED NOW
                </a>
              </div>
              <div>
                <a href="/pricing" className=" btn-new btn-white">
                SEE OUR PRICING 
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FirstVideo;
