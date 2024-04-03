
import React from 'react';
import Header from "./../../Header";
import Footer from "./../../Footer";
import BannerHome from "./Banner"
import FirstVideo from "./FirstVideo"
import SaleSection from "./SaleSection"
import LastSection from "./LastSection";
import BoxSection from "./BoxSection";
import TemplateSection from "./TemplateSection"
import TestimonialsSection from "./TestimonialsSection"
const HomePage = () => {
  return (
    <section className="home-wrapper new">
      <Header />
      <BannerHome/>
      <SaleSection/>
      <TemplateSection />
      <FirstVideo />
      <BoxSection />
      <TestimonialsSection />
      <LastSection/>
      <Footer />
    </section>
  );
}
export default  HomePage