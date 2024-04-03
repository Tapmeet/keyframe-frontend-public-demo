import React from "react";
import { Link } from "react-router-dom";
import TopSection from "./TopSection";
import InfoSection from "./InfoSection";
import FeaturedSection from "./FeaturedSection";
import FacebookShare from "./FacebookShare";
import TwitterShare from "./TwitterShare";
import InstagramShare from "./InstagramShare";
import YoutubeShare from "./YoutubeShare";
import EmailShare from "./EmailShare";
import SiteHeader from "../../Header/HeaderUser";
import Loader from "../../Utility/Loader/Loader";
import Footer from "../../Footer";
import axios from "axios";
import insta from "./../../Assets/images/social-media/instagram.png";
import Emailicon from "./../../Assets/images/social-media/email(3).png";
import youtubeicon from "./../../Assets/images/social-media/youtube.png";
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
  HatenaShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon,
} from "react-share";
import {
  apiGetTemplateCategories,
  apiGetTemplateCategory,
  apiPath,
} from "../../Utility/Utility";
import { useRouteMatch } from "react-router-dom";
import LinkedinShare from "./LinkedinShare";
const SharePage = () => {
  const [data, setData] = React.useState([]);
  const [processing, setProcessing] = React.useState(false);
  const [dataCategory, setDataCategory] = React.useState([]);
  const [categoyId, setCategoyId] = React.useState("");
  const [activeId, setActiveId] = React.useState(0);
  const match = useRouteMatch("/share/:videoId/");
  const {
    params: { videoId },
  } = match;
  React.useEffect(() => {
    axios.get(`${apiGetTemplateCategories}`, {}).then(function (response) {
      // console.log(response.data.templates);
      setData(response.data.templates);
    });
  }, []);
  const shareFb = () => {
    window.FB.ui(
      {
        display: "popup",
        method: "share",
        href: "https://reveo.io/play/?id=" + videoId,
      },
      function (response) { }
    );
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
              <h4>Social share</h4>
              <ul className="sidebar">
                <li>
                  <div className="edit" onClick={() => setActiveId(1)}>
                    {/* <FacebookShareButton
                      url={"https://reveo.io/play/" + videoId}
                      quote="Reveo "
                      subject="Sharing my intro video which I recorded in Celebfie."
                      type="video/mp4"
                      className="Demo__some-network__share-button"
                    >
                      <FacebookIcon size={32} round />
                      Facebook
                    </FacebookShareButton> */}
                    <svg viewBox="0 0 64 64" width="32" height="32">
                      <circle cx="32" cy="32" r="31" fill="#3b5998"></circle>
                      <path
                        d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
                        fill="white"
                      ></path>
                    </svg>
                    <span style={{ marginLeft: 10 }}>Facebook Share</span>
                  </div>
                </li>
                <li>
                  <div className="edit" onClick={() => setActiveId(2)}>
                    {/* <WhatsappShareButton
                      url={"https://reveo.io/play/" + videoId}
                      quote="Reveo "
                      subject="Sharing my intro video which I recorded in Celebfie."
                      type="video/mp4"
                      className="Demo__some-network__share-button"
                    >
                      <WhatsappIcon size={32} round />
                      Whatsapp
                    </WhatsappShareButton>{" "} */}
                    <img src={insta} alt="user" />
                    <span style={{ marginLeft: 10 }}>Instagram</span>
                  </div>
                  {/* <button onClick={shareFb}>share</button> */}
                </li>
                <li>
                  <div className="edit" onClick={() => setActiveId(3)}>
                    {/* <TwitterShareButton
                      url={"https://reveo.io/play/" + videoId}
                      quote="Reveo "
                      subject="Sharing my intro video which I recorded in Celebfie."
                      type="video/mp4"
                      className="Demo__some-network__share-button"
                    >
                      <TwitterIcon size={32} round />
                      Twitter
                    </TwitterShareButton>{" "} */}
                    <svg viewBox="0 0 64 64" width="32" height="32">
                      <circle cx="32" cy="32" r="31" fill="#00aced"></circle>
                      <path
                        d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"
                        fill="white"
                      ></path>
                    </svg>
                    <span style={{ marginLeft: 10 }}>Twitter</span>
                  </div>
                  {/* <button onClick={shareFb}>share</button> */}
                </li>
                <li>
                  <div className="edit" onClick={() => setActiveId(5)}>
                    <img src={youtubeicon} alt="user" />
                    <span style={{ marginLeft: 10 }}>Youtube</span>
                  </div>
                  {/* <button onClick={shareFb}>share</button> */}
                </li>

                {/* <li>
                  <div className="edit">
                    <PinterestShareButton
                      url={"https://reveo.io/play/" + videoId}
                      quote="Reveo "
                      subject="Sharing my intro video which I recorded in Celebfie."
                      type="video/mp4"
                      className="Demo__some-network__share-button"
                    >
                      <PinterestIcon size={32} round />
                      Pinterest
                    </PinterestShareButton>{" "}
                  </div>
                  <button onClick={shareFb}>share</button>
                </li> */}
                {/* <li>
                  <div className="edit" onClick={() => setActiveId(4)}>
                    <LinkedinIcon size={32} round />
                    <span style={{ marginLeft: 10 }}>Linkedin</span>
                  </div> */}
                {/* <button onClick={shareFb}>share</button> */}
                {/* </li> */}
                <li>
                  <div className="edit" onClick={() => setActiveId(6)}>
                    <img src={Emailicon} alt="user" />
                    <span style={{ marginLeft: 10 }}>Email</span>
                  </div>
                  {/* <button onClick={shareFb}>share</button> */}
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-9">
              <h2>Share Your Video</h2>
              {activeId == 0 ? <FeaturedSection /> : null}
              {activeId == 1 ? <FacebookShare /> : null}
              {activeId == 2 ? <InstagramShare /> : null}
              {activeId == 3 ? <TwitterShare /> : null}
              {/* {activeId == 4 ? <LinkedinShare /> : null} */}
              {activeId == 5 ? <YoutubeShare /> : null}
              {activeId == 6 ? <EmailShare /> : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default SharePage;
