import React from "react";

import SiteHeader from "./../../Header/HeaderUser";
import Footer from "../../Footer";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { useRouteMatch, useHistory } from "react-router-dom";
import {
  apigetAdminTemplate,
  apiPath,
  apiaddAdminTemplate,
} from "./.././../Utility/Utility";
import Loader from "./../../Utility/Loader/Loader";
const CreateTemplate = () => {
  const [processing, setProcessing] = React.useState(false);
  const match = useRouteMatch("/create-template/:templateId/");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  let history = useHistory();
  const {
    params: { templateId },
  } = match;
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setProcessing(false);
    if (cookies.get("token")) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(token);
      var lastsceneexculde = false;
      if (templateId == '6399ad1570446a16f20033e6') {
        lastsceneexculde = true;
      }
      setUserId(decoded.id);
      axios
        .get(`${apigetAdminTemplate}` + "?templateId=" + templateId, {})
        .then(function (response) {
          console.log(response.data.data);
          // history.push("/home");
          axios
            .post(apiaddAdminTemplate, {
              userId: decoded.id,
              templateId: templateId,
              title: response.data.data[0].title,
              templateImage: response.data.data[0].templateImage,
              templatePreview: response.data.data[0].templatePreview,
              adminTemplate: false,
              sceneOrder: response.data.data[0].blocks,
              templateCategory: response.data.data[0].selectedCategory,
              lastSceneOption: lastsceneexculde
            })
            .then((response) => {
              //console.log(response)
              const order = response.data.blockData.sort((a, b) => a.order - b.order);
              setTimeout(function () {
                setProcessing(false);  

                history.push(
                  "/template/" +
                  order["0"].templateId +
                  "/" +
                  order["0"].sceneId +
                  "/" +
                  order["0"]._id
                );
                document.getElementById("lottie").style.display = "none";
              }, 3000);
              setSuccessMessage(response.data.message);
              setLoader(false);
            })
            .catch((error) => {
              console.log(error);
              setErrorMessage(error.response.data.message);
              setLoader(false);
            });
        });
    }
  }, []);
  return (
    <section className="home-wrapper">
      <SiteHeader />
      <Loader open={processing} />
      <div className="inner-box-area">
        {/*<div class="geeks">
          <span>C</span>
          <span>R</span>
          <span>E</span>
          <span>A</span>
          <span>T</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span></span>
          <span>T</span>
          <span>E</span>
          <span>M</span>
          <span>P</span>
          <span>A</span>
          <span>T</span>
          <span>E</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        */}
        {/* <div id="lottie"></div> */}
      </div>



      <Footer />
    </section>
  );
};
export default CreateTemplate;
