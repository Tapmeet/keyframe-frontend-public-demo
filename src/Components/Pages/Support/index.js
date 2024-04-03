import React from 'react';
import Support from './Support';
import Header from "../../Header";
import Footer from "../../Footer"
const SupportPage = () => {
  return (
    <div >
      <Header hide="nav" />
      <Support />
      <Footer  hide="nav" />
    </div>
  )
}
export default SupportPage