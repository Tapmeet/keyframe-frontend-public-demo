import React from "react";
import {
  apiPath,
  apiUpdateScene,
  apiupdateAdminTemplate,
  apiUpdateUser,
  apiCheckPlan
} from "./../../../Utility/Utility";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { useRouteMatch, Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import exportIcon from "./../../../Assets/images/templates/export.png";
import update from "./../../../Assets/images/templates/update.png";
import axios from "axios";
import moment from 'moment';
const TopSection = (props) => {
  //  console.log(props.undoData)
  const [templateId, setTemplateId] = React.useState(props.templateId);
  const [sceneId, setSceneId] = React.useState(props.id);
  const [templateTitle, setTemplateTitle] = React.useState(props.templateTitle);
  const [userToken, setUserToken] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [modal3, setModal3] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [planexpiryCheck, setpPlanexpiryCheck] = React.useState(true);
  const [userCreated, setUserCreated] = React.useState("");
  const [userVideos, setUserVideos] = React.useState("");
  const [userPlan, setUserPlan] = React.useState("");
  const { buttonLabel, className } = props;
  const toggle3 = () => {
    setModal3(!modal3);
  }
  React.useEffect(() => {

    const tokens = localStorage.getItem('token');
    setUserToken(tokens);
    const decoded = jwt_decode(tokens);
    setUserEmail(decoded.email);
    getPlan(decoded.email);

    axios
      .get(`${apiUpdateUser}` + "/" + decoded._id, {})
      .then(function (response) {
        //console.log(response.data.user)
        setUserData(response.data.user)
        var date2 = new Date();
        var startDate = moment(response.data.user.createdAt).format('YYYY-MM-DD');
        var endDate = moment(date2).format('YYYY-MM-DD');
        const returndate = moment(new Date(response.data.user.createdAt));
        const currentdate = moment(new Date());
        var days_diff = currentdate.diff(returndate, 'days');
        setUserCreated(days_diff)
        setUserVideos(response.data.user.video_count)
      })
  }, []);
  const getPlan = (email) => {
    axios
      .get(`${apiCheckPlan}` + "?email=" + email, {})
      .then(function (response) {
        // console.log(response);
        setUserPlan(response.data.user);
        if (response.data.user == 2 || response.data.user == 4) {
          var date = new Date(response.data.planDate);
          date.setDate(date.getDate() + 30);
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          date.setHours(0, 0, 0, 0);
          if (date >= today) {
            setpPlanexpiryCheck(false);
          } else {
            setpPlanexpiryCheck(true);
          }
        } else {
          var date = new Date(response.data.planDate);
          date.setDate(date.getDate() + 365);
          console.log(date);
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          date.setHours(0, 0, 0, 0);
          if (date >= today) {
            setpPlanexpiryCheck(false);
          } else {
            setpPlanexpiryCheck(true);
          }
        }
      });
  };
  function updateCategory(e) {
    setTemplateTitle(e);
    if (e != "") {
      if (props.template) {
        axios
          .put(`${apiupdateAdminTemplate}${templateId}`, {
            id: templateId,
            title: e,
          })
          .then(function (response) {
            console.log(response);
          });
      } else {
        axios
          .put(`${apiUpdateScene}${sceneId}`, {
            id: sceneId,
            sceneTitle: e,
          })
          .then(function (response) {
            console.log(response);
          });
      }
    }
  }
  return (
    <section className="template-new-wrapper-top">
      <div className="d-flex">
        <div className="name-section" data-tut="reactour__11">
          <input
            type="text"
            onChange={(e) => updateCategory(e.target.value)}
            value={templateTitle}
          />
        </div>
        <div className="name-section undosection" >
          <button
            data-tut="reactour__12"
            disabled={props.undoData.length > 0 ? false : true}
            onClick={props.undodata}
            className={props.undoData.length > 0 ? "btn" : "btn disable"}
          >
            Undo
          </button>
          <button
            data-tut="reactour__13"
            disabled={props.redoData.length > 0 ? false : true}
            onClick={props.redodata}
            className={props.redoData.length > 0 ? "btn" : "btn disable"}
          >
            Redo
          </button>
        </div>
        <nav>
          <ul>
            <li>
              {(userCreated >= 30 || userVideos > 2) && (userPlan == 1) ? (
                <button data-tut="reactour__14"
                  onClick={(e) => toggle3()}
                >
                  <span>Export</span>
                </button>

              ) : (
                <button data-tut="reactour__14">
                  <Link to={`/export-video/${templateId}/download/`}>
                    <img src={exportIcon} alt="Export" />
                    <span>Export</span>
                  </Link>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <Modal
                isOpen={modal3}
                toggle={toggle3}
                className={className + " modal-custom"}
              >
                <ModalHeader toggle={toggle3}>Free Plan Used </ModalHeader>
                <ModalBody>
                  <img src={update} alt="Upgrade" style={{ marginBottom: "10px" }} />
                  <p>
                    You are currenly have free plan. and you<br /> are only allowed to create 2 free videos
                    <br />
                    You can upgrade your plan to start using scenes. <br />
                    We  have <b>2 Premium plans</b> that fulfill your needs.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <div className="container">
                    <div className="row modal-block justify-content-center">
                      <div className="col-12 col-sm-6">
                        <Link className="btn" to="/pricing">
                          Upgrade
                        </Link>
                      </div>
                    </div>
                  </div>
                </ModalFooter>
              </Modal>
    </section>
  );
};
export default TopSection;
