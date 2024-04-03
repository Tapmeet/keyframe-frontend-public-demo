import React from "react";
import { Link } from "react-router-dom";
const TopSection = (props) => {
  return (
    <section className="section top-section bg">
      <div className="container">
        <div className="row">
          <nav>
            <ul>
              <li>
                <Link
                  className=""
                  to="/home"
                >
                  Templates{" "}
                </Link>
              </li>
              <li>
                <Link
                  className={props.name == "myhome" ? "active" : ""}
                  to="/myhome"
                >
                   My Projects
                </Link>
              </li>
              <li>
                <Link
                  className="active"
                  to="/my-videos"
                >
                  Exported Videos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};
export default TopSection;
