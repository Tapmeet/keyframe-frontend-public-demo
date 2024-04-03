import React from 'react';
import Privacy from './Privacy';
import Header from "../../Header";
import Footer from "../../Footer"
const PrivacyPage = () => {
  return (
    <div >
      <Header hide="nav" />
      <Privacy />
      <Footer  hide="nav" />
    </div>
  )
}
export default PrivacyPage