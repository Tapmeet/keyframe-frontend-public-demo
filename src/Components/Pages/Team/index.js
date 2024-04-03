/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../Header/HeaderUser";
import { Redirect, Link } from "react-router-dom";
import Footer from "../../Footer";
import passicon from "./../../Assets/images/homeV3/lock.png";
import SideShape3 from "./../../Assets/images/homeV3/SideShape3.png";
import SideShape4 from "./../../Assets/images/homeV3/SideShape2inverse.png";
import Circle2 from "./../../Assets/images/homeV3/Circle2.png";
import HalfCircle from "./../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../Assets/images/homeV3/Triangle1.png";
import Circle1 from "./../../Assets/images/homeV3/Circle1.png";
import emailicon from "./../../Assets/images/homeV3/loupe.png";
import UserAvatar from "./../../Assets/images/User/Header/default.png";
import Loader from "./../../Utility/Loader/Loader";
import trash from "./../../Assets/images/templates/trash.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  apiPath,
  apigetTeamMember,
  apiaddTeamMember,
  apideleteTeamMember,
  apiSearchTeamMember,
  schema,
  apiInviteteamMember,
} from "./../../Utility/Utility";

const Team = (props) => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorMessage2, setErrorMessage2] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [userToken, setUserToken] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [showmembers, setShowmembers] = React.useState(false);
  const [showmembersList, setShowmembersList] = React.useState(false);
  const [searchEmail, setSearchEmail] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [memberList, setMemberList] = React.useState([]);
  const [blockToDelete, setblockToDelete] = React.useState("");
  const [successMessageInvite, setSuccessMessageInvite] = React.useState(false);
  const cookies = new Cookies();
  const { buttonLabel, className } = props;
  React.useEffect(() => {
    if (cookies.get("token")) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(token);
      console.log(decoded);
      setUserId(decoded._id);
      setUserName(decoded.firstName);
      setUserEmail(decoded.email);
      if (userId) {
        getMembers();
      }
    }
  }, [userId]);
  const getMembers = () => {
    setLoader(true);
    setErrorMessage2("");
    setSuccessMessage("");
    setErrorMessage("");
    axios
      .get(`${apigetTeamMember}` + "?adminId=" + userId, {})
      .then((response) => {
        console.log(response);
        if (response.data.members) {
          console.log(response.data.members);
          setLoader(false);
          setMemberList(response.data.members);
        } else {
          setErrorMessage(response.data.message);
          setLoader(false);
        }
      })
      .catch((error) => {
        setShowmembers(false);
        setLoader(false);
      });
  };
  const addMember = () => {
    setLoader(true);
    setShowmembers(false);
    setErrorMessage2("");
    setSuccessMessage("");
    setErrorMessage("");
    if (userId == searchResult[0]._id) {
      setErrorMessage2("You can't  add yourself.");
      setLoader(false);
      return false;
    }
    axios
      .post(apiaddTeamMember, {
        adminId: userId,
        memberId: searchResult[0]._id,
        memberName: searchResult[0].firstName,
        memberPhone: searchResult[0].phone,
        memberEmail: searchResult[0].email,
        memberProfilePic: searchResult[0].profileImage,
        approve: false,
      })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          setErrorMessage2(response.data.message);
          setLoader(false);
        } else {
          setSuccessMessage(response.data.message);
          getMembers();
          setLoader(false);
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setLoader(false);
      });
  };
  const searchMember = (email) => {
    setSuccessMessageInvite(false);
    setSearchResult([]);
    setSearchEmail(email);
    setErrorMessage2("");
    setSuccessMessage("");
    setErrorMessage("");
    setShowmembers(false);
    const resultEmail = schema.validate({ email: email });
    if (resultEmail.error) {
      return false;
    }
    setLoader(true);
    axios
      .get(`${apiSearchTeamMember}` + "?userEmail=" + email, {})
      .then((response) => {
        if (response.data.members) {
          console.log(response.data.members);
          setSuccessMessage(response.data.message);
          setLoader(false);
          setSearchResult(response.data.members);
          setShowmembers(true);
        } else {
          setErrorMessage(response.data.message);
          setLoader(false);
          //setSearchResult(response.data.members)
          setShowmembers(false);
        }
      })
      .catch((error) => {
        setShowmembers(false);
        setErrorMessage(error.response.data.message);
        setLoader(false);
      });
  };
  function confirmDelete(id) {
    setModal(!modal);
    setblockToDelete(id);
    console.log(id);
  }
  function deleteBlock() {
    setModal(!modal);
    setLoader(true);
    let blockId = blockToDelete;
    axios
      .delete(`${apideleteTeamMember}`, {
        params: {
          id: blockId,
        },
      })
      .then(function (response) {
        //console.log(response.data.message)
        if (response.data.message) {
          setLoader(false);
          getMembers();
        } else {
          setLoader(false);
        }
      });
  }
  const inviteMember = () => {
    setLoader(true);
    axios
      .post(apiInviteteamMember, {
        email: searchEmail,
        inviteEmail: userEmail,
        inviteName: userName,
      })
      .then((response) => {
        setLoader(false);
        console.log(response.data.message);
        if (response.data.message == "Invitation email sent") {
          setSuccessMessageInvite(true);
        } else {
          setSuccessMessageInvite(false);
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setLoader(false);
      });
  };
  return (
    <div>
      <SiteHeader nav="dark"></SiteHeader>
      <Loader open={loader} />
      <div className="profile-page section">
        <div className="container"> 
          <div className="row ">
            <div className="col-12 text-center">
              <h2>Team</h2>
            </div>
            <div className="form-section container-full ">
              <div className="team-member">
                <div className="row form-group">
                  <div className="col-12 col-sm-12">
                    <label>Search</label>
                    <img src={emailicon} alt="email" />
                    <input
                      type="text"
                      name="search"
                      value={searchEmail}
                      onChange={(e) => searchMember(e.currentTarget.value)}
                      className="form-control"
                      placeholder="Search User by Email"
                    />

                    {errorMessage2 != "" ? (
                      <div style={{ marginTop: "10px" }}>
                        <div
                          className="alert alert-danger text-center"
                          style={{ lineHeight: 1.6 }}
                          role="alert"
                        >
                          <p>
                            Error!
                            <br />
                            {errorMessage2}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {errorMessage != "" ? (
                      <div
                        className="alert alert-primary text-center"
                        style={{ lineHeight: 1.6 }}
                        role="alert"
                      >
                        <p>
                          No Members Found
                          <br />
                          Please check email address
                        </p>
                        <div>
                          <button
                            onClick={() => inviteMember()}
                            className="btn"
                          >
                            Invite
                          </button>
                        </div>
                      </div>
                    ) : null}
                    {successMessageInvite ? (
                      <div
                        className="alert alert-primary text-center"
                        style={{ lineHeight: 1.6, marginTop: "20px" }}
                        role="alert"
                      >
                        <p>
                          Success!
                          <br />
                          Invitation sent successfully
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                {memberList.length > 0 ? (
                  memberList.map((member, index) => {
                    console.log(member);
                    return (
                      <div
                        className="member-box profile-page memberlist"
                        key={index}
                      >
                        <div className="profile-box">
                          <div className="delete-icon">
                            <img
                              src={trash}
                              alt="Delete Section"
                              onClick={() => confirmDelete(member._id)}
                            />
                          </div>
                          <div className="userimg-section">
                            <div className="img">
                              {member.memberProfilePic == undefined ? (
                                <img src={UserAvatar} alt="user" />
                              ) : (
                                <img
                                  src={apiPath + member.memberProfilePic}
                                  alt="user"
                                />
                              )}
                            </div>
                          </div>
                          <div className="userinfo-section">
                            <h4>{member.memberName}</h4>
                            <ul>
                              <li>
                                <span className="agency">Email</span>
                                <label>{member.memberEmail}</label>
                              </li>
                              <li>
                                <span className="agency">Phone Number</span>
                                <label>{member.memberPhone} </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <div
                      className="alert alert-primary text-center"
                      style={{ lineHeight: 1.6 }}
                      role="alert"
                    >
                      <p>
                        No Members Yet
                        <br />
                        Please use the search box above to find team member.
                      </p>
                    </div>
                  </div>
                )}
                {showmembers ? (
                  <div className="member-box profile-page  search ">
                    <div className="profile-box">
                      <div className="userimg-section">
                        <div className="img">
                          {searchResult[0].profileImage == undefined ? (
                            <img src={UserAvatar} alt="user" />
                          ) : (
                            <img
                              src={apiPath + searchResult[0].profileImage}
                              alt="user"
                            />
                          )}
                        </div>
                      </div>
                      <div className="userinfo-section">
                        <h4>{searchResult[0].firstName}</h4>
                        <ul>
                          <li>
                            <span className="agency">Email</span>
                            <label>{searchResult[0].email}</label>
                          </li>
                          <li>
                            <span className="agency">Phone Number</span>
                            <label>{searchResult[0].phone} </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="button-member col-sm-5 col-12 ">
                        <button onClick={() => addMember()} className="btn">
                          Add Member
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {successMessage != "" ? (
                  <div>
                    <div
                      className="alert alert-success text-center"
                      style={{ lineHeight: 1.6 }}
                      role="alert"
                    >
                      <p>
                        Succesfull!
                        <br />
                        Member Succesfully added.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <img
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
        <img src={Circle1} alt="triangle" className="Circle1 profile-bg" />
      </div>
      <Footer></Footer>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className + " modal-custom"}
      >
        <ModalHeader toggle={toggle}>Delete Template</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this member?</p>
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
    </div>
  );
};
export default Team;
