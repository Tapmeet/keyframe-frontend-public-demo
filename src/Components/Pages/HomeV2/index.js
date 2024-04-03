import React from "react";
import { Link } from "react-router-dom";
import TopSection from "./TopSection";
import InfoSection from "./InfoSection";
import FeaturedSection from "./FeaturedSection";
import SiteHeader from "./../../Header/HeaderUser";
import Loader from "./.././../Utility/Loader/Loader";
import Footer from "../../Footer";

import axios from "axios";
import {
  apiGetTemplateCategories,
  apiGetTemplateCategory,
  apiPath,
  apiGetTemplates
} from "./.././../Utility/Utility";
const HomePageV2 = () => {
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [processing, setProcessing] = React.useState(false);
  const [dataCategory, setDataCategory] = React.useState([]);
  const [categoyId, setCategoyId] = React.useState("");
  const [categoyallActive, setCategoyallActive] = React.useState(false);
  React.useEffect(() => {
    axios.get(`${apiGetTemplateCategories}`, {}).then(function (response) {
      //  console.log(response.data.templates);
      setData(response.data.templates);
    });
    axios.get(`${apiGetTemplates}`, {}).then(function (response) {
      // console.log('response.data');
      //console.log(response.data.template);

      setData2(response.data.template);
    });
  }, []);
  const getcategory = (id) => {
    setCategoyallActive(false)
    setProcessing(true);
    setCategoyId(id);
    axios
      .get(`${apiGetTemplateCategory}?category=${id}`, {})
      .then(function (response) {
        setProcessing(false);
        setDataCategory(response.data.templates);
      });
  };
  const getAllTemplate = () => {
    setProcessing(true);
    setDataCategory([])
    setCategoyId('');
    setCategoyallActive(true)
    setProcessing(false);

  };
  return (
    <section className="home-wrapper">
      <SiteHeader />
      <div className="inner-box-area">
        <TopSection name="home" />
        <Loader open={processing} />
        <div className="container">
          <div className="row new-home-inner">
            <div className="col-12 col-sm-3">
              {/* <InfoSection /> */}
              <h4>Template Categories</h4>
              <ul className="sidebar">
                <li className={
                  categoyallActive ? "active" : 'edit'
                }>
                  <div
                    onClick={() => getAllTemplate()}

                  >
                    All
                  </div>
                </li>
                {data
                  ? data.map((template) => {
                    return (
                      <li
                        className={
                          categoyId == template._id ? "active" : null
                        }
                      >
                        {template.template.length > 0 ?
                          <div
                            onClick={() => getcategory(template._id)}
                            className="edit active"
                          >
                            {template.title}
                          </div>
                          :
                          <div
                            onClick={() => getcategory(template._id)}
                            className="edit gray "
                          >
                            {template.title}
                          </div>
                        }
                      </li>
                    );
                  })
                  : null}
              </ul>
            </div>
            <div className="col-12 col-sm-9">
              <h2>Choose a template</h2>
              {/* <ul className="filter-btn">
                <li className="active">All</li>
                <li>Popular</li>
                <li>New</li>
                <li>Recommended</li>
              </ul> */}
              {dataCategory.length > 0 ? (
                dataCategory.map((template) => {
                  return (
                    <FeaturedSection
                      key={template._id}
                      templatedata={template}
                      category={true}
                    />
                  );
                })
              ) : data2.length > 0 ? (
                <section className=" slider-section bg">
                  <div className="containers home-new hyereee">
                    <div className="row">
                      {/* {data2.map((template) => {
                        return ( */}
                      <FeaturedSection
                        templatedata={data2}
                        category={false}
                      />
                      {/* );
                      })} */}
                    </div>
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default HomePageV2;
