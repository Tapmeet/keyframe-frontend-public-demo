import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import person from "./../../Assets/images/homeV3/person.png";
const TestimonialsSection = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "350px",
    slidesToShow: 1,
    dots: true,
    // autoplay: true,
    // speed: 2000,
    // autoplaySpeed: 5000,
  };
  return (
    <section className="testimonials-wrapper section">
      <div className=" container text-center">
        <div className="row justify-content-center">
          <div className=" col-12">
            <h2 className="text-center">What our customers says </h2>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Slider {...settings}>
          <div>
            <img src={person} alt="person" className="img-fluid" />
            <p>
              Our Reveo video was a quick way for us to let our audience know
              about our event, and show them how simple it was to register or
              donate. <br />
              Plus, we can easily adjust our video so they work on all
              platforms. A true time-saver.
            </p>
            <label>LIE NORJUMAN</label>
          </div>
          <div>
            <img src={person} alt="person" className="img-fluid" />
            <p>
              Our Reveo video was a quick way for us to let our audience know
              about our event, and show them how simple it was to register or
              donate. <br />
              Plus, we can easily adjust our video so they work on all
              platforms. A true time-saver.
            </p>
            <label>Scott Martin</label>
          </div>
          <div>
            <img src={person} alt="person" className="img-fluid" />
            <p>
              Our Reveo video was a quick way for us to let our audience know
              about our event, and show them how simple it was to register or
              donate. <br />
              Plus, we can easily adjust our video so they work on all
              platforms. A true time-saver.
            </p>
            <label>John Dev</label>
          </div>
        </Slider>
      </div>
    </section>
  );
};
export default TestimonialsSection;
