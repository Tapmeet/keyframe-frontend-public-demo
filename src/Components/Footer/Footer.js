import * as React from "react";
import logo from "./../Assets/images/homeV3/FooterLogo.png";
import { Link } from "react-router-dom";
const SiteFooter = (props) => {
  return (
    <footer className="row-fluid fullwidth site-footer">
      <div id="footer" className="footer">
        <div className="container">
          <div className="row">
            <div className="bottom-section">
              {props.hide != "nav" ? (
                <div>
                  <img src={logo} alt="KeyFrame" />
                  <div className="bottom-section__links">
                    <Link to="/my-videos" className="">
                      Create Video
                    </Link>
                    <Link to="/pricing" className="">
                      Templates
                    </Link>
                    <Link to="/pricing" className="">
                      Pricing
                    </Link>
                    <Link to="/support" className="">
                      Support
                    </Link>
                  </div>
                  <div className="social-media">
                    <ul>
                      <li>
                      <i className="fab fa-instagram"></i>
                      </li>
                      <li>
                        <i className="fab fa-facebook-f"></i>
                      </li>
                      <li>
                        <i className="fab fa-linkedin"></i>
                      </li>
                      <li>
                        <i className="fab fa-twitter"></i>
                      </li>
                      <li>
                        <i className="fab fa-youtube"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null}
              <div className="bottom-section__copyright">Reveo, LLC © 2023</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default SiteFooter;
