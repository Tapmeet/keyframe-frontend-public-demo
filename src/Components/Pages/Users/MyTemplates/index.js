/* eslint-disable eqeqeq */
import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "./../../../Header/HeaderUser";
import Footer from "../../../Footer";
import TopSection from "./../../HomeV2/TopSection";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  apigetTemplate,
  apiPath,
  apideleteTemplate,
} from "./../../../Utility/Utility";
import Loader from "./../../../Utility/Loader/Loader";
const MyTemplates = (props) => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [media, setMedia] = React.useState("");
  const [dataTemplate, setData] = React.useState([]);
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [userId, setUserId] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const { buttonLabel, className } = props;
  const [blockToDelete, setblockToDelete] = React.useState("");
  const [processing, setProcessing] = React.useState(true);
  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      // console.log(decoded.id)
      setUserId(decoded.id);
    }
    if (userId) {
      axios
        .get(`${apigetTemplate}?userId=${userId}`, {})
        .then(function (response) {
          setProcessing(false);
          setData(response.data.data);
        });
    }
  }, [userId]);
  function confirmDelete(id) {
    setModal(!modal);
    setblockToDelete(id);
    console.log(id);
  }
  function deleteBlock() {
    setModal(!modal);
    setProcessing(true);
    let blockId = blockToDelete;
    axios
      .delete(`${apideleteTemplate}`, {
        params: {
          templateId: blockId,
        },
      })
      .then(function (response) {
        //console.log(response.data.message)
        if (response.data.message) {
          setProcessing(false);
        } else {
          setProcessing(false);
        }
        window.location.reload();
      });
  }
  return (
    <section className="home-wrapper">
      <Loader open={processing} />
      <SiteHeader />
      <div className="inner-box-area ">
        <TopSection name="myhome" />
        <div className=" container section my-template">
          <Loader open={loader} />
          {dataTemplate.length > 0 ? (
            <div className="row">
              {dataTemplate
                .sort((a, b) => a.order - b.order)
                .map((data, index) => {
                  const order = data.blocks.sort((a, b) => a.order - b.order);
                  return (
                    <div className="col-sm-4 col-12" key={index}>
                      <div key={data._id} className="box-template">
                        {/* <img
                          src={apiPath + data.templateImage}
                          alt="thumbnail"
                          className="img-fluid"
                        /> */}
                        <div
                          style={{
                            backgroundImage:
                              "url(" + apiPath + data.templateImage + ") ",
                            minHeight: "205px",
                          }}
                          className="bg img"
                        ></div>
                        <h4>{data.title} </h4>
                        <div className="d-flex">
                          <Link
                            class="linkTag btn"
                            to={`/template/${data._id}/${order[0].sceneId}/${order[0]._id}`}
                          >
                            Edit template
                          </Link>
                          <button className="btn" onClick={() => confirmDelete(data._id)}>
                            Delete Template
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            !processing ?
              <div className="col-12">
                <div className="alert alert-primary"> No Templates available</div>
              </div>
              : null
          )}
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className + " modal-custom"}
      >
        <ModalHeader toggle={toggle}>Delete Template</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this template?</p>
        </ModalBody>
        <ModalFooter>
          <div className="container">
            <div className="row modal-block">
              <div className="col-12 col-sm-6">
                <Button color="primary" onClick={deleteBlock}>
                  confirm
                </Button>
              </div>
              <div className="col-12 col-sm-6">
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </section>
  );
};
export default MyTemplates;
