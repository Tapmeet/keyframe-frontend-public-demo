import React from "react";
import img1 from "./../../Assets/images/home/section1.png";
import img2 from "./../../Assets/images/home/section2.png";
import img3 from "./../../Assets/images/home/section3.png";
const WorkSection = () => {
  return (
    <section className="work-wrapper section">
      <div className="work-example container">
        <h2 className=" text-center">
          Join over 7 million people who
          <br /> love the Reveo video maker
        </h2>

        <div className="row align-center">
          <div className="col-12 col-sm-6">
            <img
              src={img1}
              alt="section1"
              className="img-responsive img-fluid"
            />
          </div>
          <div className="col-12 col-sm-6">
            <h4>
              <span>Built-in library</span>
              Never run out of footage and animation Go nuts with
            </h4>
            <p>
              800,000+ real-life stock footage clips, and gorgeous animations
              from the Reveo studio.
            </p>
          </div>
        </div>
        <div className="row align-center">
          <div className="col-12 col-sm-6">
            <h4>
              <span>Instant videos</span>
              Start fast with beautiful templates
            </h4>
            <p>
              Create your perfect video (in a flash) from the huge selection of
              surefire templates.
            </p>
          </div>
          <div className="col-12 col-sm-6">
            <img
              src={img2}
              alt="section1"
              className="img-responsive img-fluid"
            />
          </div>
        </div>
        <div className="row align-center">
          <div className="col-12 col-sm-6">
            <img
              src={img3}
              alt="section3"
              className="img-responsive img-fluid"
            />
          </div>
          <div className="col-12 col-sm-6">
            <h4>
              <span>Own your output</span>
              Share and download all your videos
            </h4>
            <p>
            Everything you make is yours to keep forever. Share it everywhere. Or download it for later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WorkSection;
