import React from "react";
import "./about.css";

const aboutUs = () => {
  return (
    <>
      <div className="contain_center">
        <p className="inner_contain">
          <center>
            <h3>About Us</h3>
          </center>
          <p>
            Welcome to {window.location.hostname}, the official online platform
            of {process.env.REACT_APP_FAM}. Our company is dedicated to bringing
            you the finest products and services, built on a foundation of
            excellence and innovation. At {process.env.REACT_APP_FAM}, we
            believe in quality, integrity, and customer satisfaction.
          </p>
          <h3>Who We Are</h3>
          {process.env.REACT_APP_FAM} is a trusted name in the industry, known
          for our commitment to delivering exceptional value and top-notch
          products. With years of experience and a passion for excellence, we
          strive to exceed our customers' expectations in every way possible.
         <h3>Our Mission</h3> <br/> 
         
         Our mission is to provide high-quality products that
          enhance the lives of our customers. We are dedicated to continuous
          improvement and innovation, ensuring that we always stay ahead in a
          rapidly evolving market. At {process.env.REACT_APP_FAM}, we prioritize
          customer satisfaction and work tirelessly to maintain the trust and
          loyalty of our valued clients.
          
          <h3>What We Offer At</h3>
          {window.location.hostname}, you will find a wide range of products
          meticulously crafted to meet the highest standards of quality. Our
          extensive product line is designed to cater to diverse needs and
          preferences, ensuring that there is something for everyone. 
          
         <h3>Why Choose Us</h3>

         <h5>Quality Assurance:</h5> We are committed to delivering products that are
          not only superior in quality but also reliable and durable.
          
          <h5>Customer-Centric Approach: </h5>Our customers are at the heart of
          everything we do. We listen, understand, and respond to their needs
          with utmost care. 

          <h5>Innovation and Excellence: </h5>We continuously seek new
          ways to improve and innovate, staying ahead in the industry and
          setting new standards of excellence. Thank you for choosing{" "}
          {window.location.hostname} and {process.env.REACT_APP_FAM}. We look
          forward to serving you and providing you with the best products and
          services. Registered address as below.

          <p>{process.env.REACT_APP_FAM}</p>
          <p>{process.env.REACT_APP_ADDRESS}</p>
        </p>
      </div>
    </>
  );
};

export default aboutUs;
