import React from "react";
import { Link } from "react-router-dom";
import TopSection from "./TopSection";
import InfoSection from "./InfoSection";
import SiteHeader from "../../Header/HeaderUser";
import Loader from "../../Utility/Loader/Loader";
import Footer from "../../Footer";
import axios from "axios";

import {
  apiGetTemplateCategories,
  apiGetTemplateCategory,
  apiPath,
} from "../../Utility/Utility";
import { useRouteMatch } from "react-router-dom";
const ThankyouPage = () => {
  return (
    <section className="home-wrapper">
      <SiteHeader />
      <div className="inner-box-area">
        <TopSection name="home" />
        <div className="container">
          <div className="row new-home-inner">
            <div className="col-12 col-sm-12">
              <h2 className="text-center">Success! Order successfully placed</h2>
              <InfoSection />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default ThankyouPage;
