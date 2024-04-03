import React from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../../Header/HeaderUser";
import Footer from "../../Footer";
import icongreen from "./../../Assets/images/pricing/checkedgreen.png";
import iconred from "./../../Assets/images/pricing/checkedred.png";
import iconblack from "./../../Assets/images/pricing/checkedblack.png";
import SideShape3 from "./../../Assets/images/homeV3/SideShape2inverse.png";
import SideShape4 from "./../../Assets/images/homeV3/SideShape.png";
import Circle2 from "./../../Assets/images/homeV3/Circle2.png";
import HalfCircle from "./../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../Assets/images/homeV3/Triangle1.png";
import Circle1 from "./../../Assets/images/homeV3/Circle1.png";
import Circle3 from "./../../Assets/images/homeV3/Check-Circle.png";
import Circle4 from "./../../Assets/images/homeV3/white_circle.png";
import passicon from "./../../Assets/images/homeV3/lock.png";
import emailicon from "./../../Assets/images/homeV3/email.png";
import { useRouteMatch } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { apigetVideo, apiPath, apiUpdateUser } from "./../../Utility/Utility";
import { Helmet } from "react-helmet";

const Video = () => {
  const match = useRouteMatch("/play/:videoId/");
  const {
    params: { videoId },
  } = match;
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoDate, setVideoDate] = React.useState("");
  const [videoTitle, setVideoTitle] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const [userId, setUserId] = React.useState("");
  React.useEffect(() => {
    axios
      .get(`${apigetVideo}` + "?videoId=" + videoId, {})
      .then(function (response) {
        console.log(response);
        setVideoUrl(response.data.data.path);
        setVideoDate(response.data.data.updatedAt);
        setVideoTitle(response.data.data.videoTitle);
        setUserId(response.data.data.userId);
        getuserData(response.data.data.userId);
      });
  }, []);

  const getuserData = (userid) => {
    axios
      .get(`${apiUpdateUser}` + userid, {})
      .then((response) => {
        console.log(response.data.user);
        setUserData(response.data.user);
      })
      .catch((error) => {});
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reveo Video</title>
        <meta
          name="description"
          content="Reveos video maker turns your photos and video clips into professional videos in minutes. Fast and shockingly simple - we make video creation easy."
        />
        <meta
          property="og:description"
          content="Reveos video maker turns your photos and video clips into professional videos in minutes. Fast and shockingly simple - we make video creation easy."
        />
        <meta property="og:site_name" content="Reveo" />
        <meta property="og:title" content="Reveo video" />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={"https://reveo.io/play/" + videoId} />
        <meta
          property="og:image"
          content="http://d2m23yiuv18ohn.cloudfront.net/Video/rhfHOHHTPpMZFDInfFD1fQ/cover_640x360.jpg"
        />
        <meta
          property="og:video"
          content="https://api.reveo.io/template/videos/5fb23662f0b30f2d6c9ff48c/template1/Property-Showcase1639985221892.mp4"
        />
        <meta
          property="og:video:secure_url"
          content="https://api.reveo.io/template/videos/5fb23662f0b30f2d6c9ff48c/template1/Property-Showcase1639985221892.mp4"
        />
        <meta property="og:video:type" content="video/mp4" />

        <meta property="og:video:width" content="640" />
        <meta property="og:video:height" content="360" />

        <meta
          name="twitter:app:id:googleplay"
          content="com.Reveo.android.videoslideshow"
        />
        <meta name="twitter:app:id:ipad" content="459248037" />
        <meta name="twitter:app:id:iphone" content="459248037" />
        <meta name="twitter:app:name:googleplay" content="Get the Reveo app" />
        <meta name="twitter:app:name:ipad" content="Get the Reveo app" />
        <meta name="twitter:app:url:ipad" content="Reveo://" />
        <meta name="twitter:app:name:iphone" content="Get the Reveo app" />
        <meta name="twitter:app:url:iphone" content="Reveo://" />
        <meta name="twitter:card" content="player" />
        <meta
          name="twitter:description"
          content="Reveo makes video creation easy! Reveo&#39;s video maker turns your photos and video clips into professional videos in minutes. Fast and shockingly simple!"
        />
        <meta
          name="twitter:image"
          content="http://d2m23yiuv18ohn.cloudfront.net/Video/rhfHOHHTPpMZFDInfFD1fQ/cover_640x360.jpg"
        />

        <meta name="twitter:site" content="@Reveo" />
        <meta name="twitter:title" content="Reveo video" />
        <meta
          name="twitter:url"
          content="https://Reveo.com/play/rhfHOHHTPpMZFDInfFD1fQ"
        />

        <meta
          name="twitter:player"
          content="https://s3.amazonaws.com/embed.Reveo.com/play.html?w=swf/production/vp1&amp;e=1640428169&amp;f=rhfHOHHTPpMZFDInfFD1fQ&amp;d=0&amp;m=p&amp;r=360p+480p+720p&amp;i=m&amp;asset_domain=s3-p.Reveo.com&amp;Reveo_domain=Reveo.com&amp;options="
        />
        <meta name="twitter:player:width" content="640" />
        <meta name="twitter:player:height" content="360" />

        <meta
          name="twitter:player:stream"
          content="https://d2m23yiuv18ohn.cloudfront.net/Video/rhfHOHHTPpMZFDInfFD1fQ/360p.mp4"
        />
        <meta name="twitter:player:stream:content_type" content="video/mp4" />
      </Helmet>
      <div className="profile-page section video-page">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center">
              <h2>Reveo Video</h2>
            </div>
          </div>
          <div className="row ">
            <div className="col-12  col-sm-8">
              <div className="form-section container-full ">
                <video
                  key={videoUrl}
                  className="video-container video-container-overlay"
                  autoPlay={true}
                  controls={true}
                  loop=""
                  muted={true}
                >
                  <source type="video/mp4" src={apiPath + videoUrl} />
                </video>
                <div className="seprator-section d-flex">
                  <div className="video-title">
                    <h4>{videoTitle}</h4>
                    {/* <span>
                      {moment(videoDate).format("dddd, MMMM Do YYYY")}
                    </span> */}
                  </div>
                  {/* <div className="toolbar-item small-toolbar-divider s-sharing-button ControlButton-module_wrap__3qoLv ControlButton-module_toolbar__1zm-G BaseControlButton-module_wrap__2n2U6">
                    <Link
                      to={"/share/" + videoId}
                      className="ControlButton-module_ button __1rkdm BaseControlButton-module_button__1w6h2"
                    >
                      <span className="Icon-module_defaultFill__3lKgW Icon-module_icon__3ohIJ Icon-module_small__8TUf2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                        >
                          <title>Share</title>
                          <path d="M14.7 2a2.3 2.3 0 11-1.597 3.955l-5.63 3.379a2.297 2.297 0 01.047 1.36l5.577 3.347a2.3 2.3 0 11-.549.836L7.052 11.58a2.3 2.3 0 11-.106-3.096l5.605-3.362A2.3 2.3 0 0114.7 2zm0 12.39a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6zm-9.4-5.6a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6zM14.7 3a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6z"></path>
                        </svg>
                      </span>
                      <span className="s-control-button-text ControlButton-module_string__33biH ControlButton-module_iconOnLeft__hCFAt BodySmall-module_bodySmall__P_dXD Typography-module_primary__38_yj">
                        Share
                      </span>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            {userData != "" ? (
              <div className="col-12 userBox col-sm-4">
                <div className="userBox-inner">
                  <h4>{userData.firstName}</h4>
                  <ul>
                    <li>
                      {" "}
                      <span>Phone: </span>
                      {userData.phone}
                    </li>
                    <li>
                      <span>Email: </span>
                      <a href={`mailto:${userData.email}`} > Click here</a> 
                    </li>
                    <li>
                      <span>Agency: </span>
                      {userData.agencyname}
                    </li>
                    <li>
                      <span>Website: </span>
                      {userData.website}
                    </li>
                    <li>
                    {userData.agencylogo ? (
                        <img
                          src={apiPath + userData.agencylogo}
                          className="img-fluid"
                          alt="agency logo"
                          style={{maxWidth:"70%", marginTop:"10px"}}
                        />
                      ) : null}
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* <img
          src={SideShape3}
          alt="triangle"
          className="SideShape3 profile-bg"
        />
        <img
          src={SideShape4}
          alt="triangle"
          className="SideShape4 profile-bg"
        />
        <img src={Circle2} alt="triangle" className="Circle2 profile-bg" />
        <img
          src={HalfCircle}
          alt="triangle"
          className="HalfCircle profile-bg"
        />
        <img src={Triangle1} alt="triangle" className="triangle1 profile-bg" />
        <img src={Triangle1} alt="triangle" className="triangle2 profile-bg" />
        <img src={Circle1} alt="triangle" className="Circle1 profile-bg" /> */}
      </div>
      <div className="pricing-page pricingpage videopage">
        <div className="section">
          <div className="container ">
            <div className="row pricing-wrapper">
              <div className="col-12 col-sm-6">
                <h5>Sharing </h5>
                <ul>
                  <li>
                    Allow sharing or uploading directly to
                    <ul>
                      <li>YouTube </li>
                      <li>Twitter </li>
                      <li> Email </li>
                      <li> Zillow</li>
                      <li> Instagram</li>
                      <li> Direct Download</li>
                      <li>Realtor.com </li>
                      <li> TikTok</li>
                      <li> Facebook </li>
                      <li> Embed </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-sm-6">
                <h5>Features </h5>
                <ul>
                  <li>
                    <p>
                      reveo allows real estate professionals to quickly and
                      easily create animated videos using existing footage and
                      photography. With a library of style-relevant, drag and
                      drop templates, users can build unique marketing tools to
                      use with their listing and on social media channels.
                    </p>
                  </li>
                  <li>
                    <p>
                      Customize the templates with your branding and personality
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Video;
