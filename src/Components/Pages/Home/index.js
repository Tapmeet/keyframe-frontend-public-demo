
import React from 'react';
import BannerHome from './Banner';
import WorkSection from './WorkSection'; 
import LastSection from './LastSection'; 
import Header from "./../../Header";
import Footer from "./../../Footer";
const HomePage = () => {
  return (
    <section className="home-wrapper">
      <Header />
      <BannerHome/>
      <WorkSection />
      <LastSection />
      <Footer />
    </section>
  );
}
export default  HomePage