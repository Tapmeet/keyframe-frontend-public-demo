import React from 'react';
import SiteHeader from "./../../Header/HeaderUser";
import UserIcon from './../../Assets/images/User/Home/pick-template.svg';
import Scene from './../../Assets/images/User/Home/scene1.png';
import editIcon from './../../Assets/images/User/Home/edit-template.svg';
import previewIcon from './../../Assets/images/User/Home/preview-template.svg';
import { Link } from 'react-router-dom';
const UserHome = () => {
  return (
    <div >
      <SiteHeader />
      <div className="container-fluid user-home">
        <div className="row first-row ">
          <div className="col-sm-6 col-12">
            <img src={UserIcon} />
          </div>
          <div className="col-sm-6 col-12">
            <h2>My First Template</h2>
          </div>
        </div>
        <div className="second-row row">
          <div className="col-12">
            <div className="inner-box">
              <h3> Modern </h3>
              <div className="row">
                <div className="col-12 col-sm-3">
                  <div className="template-box">
                    <div className="img-bg bg" style={{ 'backgroundImage': 'url('+Scene+') '}}>
                      <div className="overlay">
                     <Link to='/edit-template/1'><img src={editIcon} /></Link> 
                      <img src={previewIcon} />
                      </div>
                    </div>
                    <h5><Link to='/edit-template/1'>Template1</Link> </h5>
                  </div>
                </div>
                <div className="col-12  col-sm-3"></div>
                <div className="col-12  col-sm-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserHome