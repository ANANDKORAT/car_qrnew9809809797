import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-full-width">
      <div className="footer-top-section">
        <div className="footer-icon-group" onClick={() => navigate("/profile")}>
          <div className="footer-icon-circle">
            <svg viewBox="0 0 1024 1024" className="footer-icon">
              <path d="M843.28 870.12c-8.44-140.52-104.3-257.42-233.91-297.15C687.88 536.27 742.4 456.53 742.4 364.09c0-127.24-103.16-230.4-230.4-230.4S281.6 236.85 281.6 364.09c0 92.44 54.52 172.18 133.12 208.88-129.61 39.73-225.47 156.63-233.91 297.15-0.66 10.9 7.96 20.2 18.96 20.2 9.96 0 18.3-7.77 18.96-17.73C227.75 718.51 355.65 596.39 512 596.39s284.25 122.12 293.36 276.2c0.57 9.95 8.91 17.73 18.96 17.73C835.32 890.31 843.95 881.02 843.28 870.12zM319.53 364.09c0-106.29 86.19-192.47 192.47-192.47s192.47 86.19 192.47 192.47c0 106.29-86.19 192.47-192.47 192.47S319.53 470.38 319.53 364.09z" />
            </svg>
          </div>
          <div className="footer-icon-text">
            <h6>My Account</h6>
            <p>Find all your details here</p>
          </div>
        </div>

        <div className="footer-icon-group">
          <div className="footer-icon-circle">
            <svg viewBox="0 0 1024 1024" className="footer-icon">
              <path d="M240.69 589.55a32 32 0 0 0-22.67 9.39l-113.12 113.12a64 64 0 0 0 0 90.66l113.12 113.01a32 32 0 0 0 45.28-45.28L150.19 757.33l113.12-113.12a32 32 0 0 0-22.62-54.66zM783.31 98.88a32 32 0 0 0-22.61 54.66L873.81 266.67l-113.12 113.12a32 32 0 1 0 45.28 45.28l113.12-113.12a64 64 0 0 0 0-90.66L805.97 108.27a32 32 0 0 0-22.66-9.39z" />
              <path d="M117.97 544a32 32 0 0 1-32-32V437.33a202.67 202.67 0 0 1 202.67-202.66h597.33a32 32 0 0 1 0 64h-597.33a138.67 138.67 0 0 0-138.67 138.66v74.67a32 32 0 0 1-32 32zM736.64 789.33h-602.67a32 32 0 0 1 0-64h602.67a138.67 138.67 0 0 0 138.67-138.66V512a32 32 0 0 1 64 0v74.67a202.67 202.67 0 0 1-202.67 202.66z" />
            </svg>
          </div>
          <div className="footer-icon-text">
            <h6>Return & Exchanges</h6>
            <p>Return & Exchanges on the full Site</p>
          </div>
        </div>

        <div className="footer-icon-group" onClick={() => navigate("/order-tracking")}>
          <div className="footer-icon-circle">
            <svg viewBox="0 0 108.97 122.88" className="footer-icon">
              <path d="M91.36 103.58l11.21 12.23-7.74 7.07-10.81-11.9c-4.11 2.73-9.06 4.34-14.37 4.34-7.16 0-13.64-2.9-18.32-7.58-4.7-4.7-7.58-11.18-7.58-18.32 0-7.16 2.9-13.64 7.58-18.32 4.7-4.7 11.18-7.58 18.32-7.58 7.16 0 13.64 2.9 18.32 7.58 4.7 4.7 7.58 11.18 7.58 18.32 0 5.23-1.55 10.11-4.22 14.2L91.36 103.58zM105.23 8.54c0.6-0.12 1.22 0 1.73 0.31 0.88 0.36 1.5 1.22 1.5 2.23l0.51 70.57c0.04 0.87-0.38 1.73-1.18 2.2l-3.05 1.82c-0.09-0.88-1.26-4.9-0.63-5.28l-0.47-65.32-23.7 14.94v25.3c-1.58-0.5-3.56-0.89-5.22-1.17V30.71l-31.54-4.07-1.05 30.49-11.2-7.63-11.2 6.33 2.31-31.88L5.34 22.46v66.13l28.03 3.04c0.11 1.65 0.33 3.51 0.65 5.09L2.31 93.2C1.02 93.13 0 92.07 0 90.76V18.99h0c-0.03-0.96 0.52-1.89 1.45-2.3L38.98 0.2l0 0c0.39-0.17 0.84-0.24 1.29-0.19L105.23 8.54zM70.02 8.82L46.97 21.7l30.6 3.91 20.98-13.05L70.02 8.82zM25.03 19.43L47.84 5.91l-7.52-0.99L11.3 17.68 25.03 19.43zM84.71 74.36c-3.85-3.85-9.16-6.23-15.03-6.23-5.88 0-11.19 2.38-15.03 6.23-3.85 3.85-6.23 9.16-6.23 15.03 0 5.88 2.38 11.19 6.23 15.03 3.85 3.85 9.16 6.23 15.03 6.23 5.88 0 11.19-2.38 15.03-6.23 3.85-3.85 6.23-9.16 6.23-15.03C90.94 83.51 88.55 78.2 84.71 74.36z" />
            </svg>
          </div>
          <div className="footer-icon-text">
            <h6>Order Tracking</h6>
            <p>We'll always keep you updated</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom-section">
        <div className="footer-link-group">
          <h6>CONTACT US</h6>
          <div className="footer-link" onClick={() => navigate("/contact-us")}>Mail Us</div>
        </div>

        <div className="footer-link-group">
          <h6>OUR POLICY</h6>
          <div className="footer-link" onClick={() => navigate("/refund-policy")}>Refund Policy</div>
          <div className="footer-link" onClick={() => navigate("/privacypolicy")}>Privacy policy</div>
          <div className="footer-link" onClick={() => navigate("/shippingpolicy")}>Shipping policy</div>
          <div className="footer-link" onClick={() => navigate("/termsofservice")}>Terms of service</div>
        </div>

        <div className="footer-link-group">
          <h6>QUICK LINKS</h6>
          <div className="footer-link" onClick={() => navigate("/about-us")}>About Us</div>
          <div className="footer-link" onClick={() => navigate("/order-tracking")}>Track Order</div>
          <div className="footer-link" onClick={() => navigate("/faqs")}>FAQ</div>
        </div>
      </div>

      <div className="footer-copyright">
        © {currentYear} Flipkart. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;