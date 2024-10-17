import React from "react";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Container className="pt-4">
      <Row>
        <Col
          md={4}
          xs={4}
          className="text-center"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <div>
            <svg
              className="svg-icon"
              style={{
                width: "25px",
                height: "25px",
                verticalAlign: "middle",
                fill: "currentColor",
                overflow: "hidden"
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
            </svg>
          </div>
          <div className="mt-2">
            <h6 className="fw-bold mb-0"> My Account </h6>
            <span style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}>
              Find all your details here
            </span>
          </div>
        </Col>
        <Col md={4} xs={4} className="text-center">
          <div>
            <svg
              className="svg-icon"
              style={{
                width: "25px",
                height: "25px",
                verticalAlign: "middle",
                fill: "currentColor",
                overflow: "hidden"
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M240.693333 589.546667a32 32 0 0 0-22.666666 9.386666l-113.12 113.12a64 64 0 0 0 0 90.666667l113.12 113.013333a32 32 0 0 0 45.28-45.28L150.186667 757.333333l113.12-113.12a32 32 0 0 0-22.613334-54.666666zM783.306667 98.88a32 32 0 0 0-22.613334 54.666667L873.813333 266.666667l-113.12 113.12a32 32 0 1 0 45.28 45.28l113.12-113.12a64 64 0 0 0 0-90.666667L805.973333 108.266667a32 32 0 0 0-22.666666-9.386667z"
                fill="#333333"
              />
              <path
                d="M117.973333 544a32 32 0 0 1-32-32V437.333333a202.666667 202.666667 0 0 1 202.666667-202.666666h597.333333a32 32 0 0 1 0 64h-597.333333a138.666667 138.666667 0 0 0-138.666667 138.666666v74.666667a32 32 0 0 1-32 32zM736.64 789.333333h-602.666667a32 32 0 0 1 0-64h602.666667a138.666667 138.666667 0 0 0 138.666667-138.666666V512a32 32 0 0 1 64 0v74.666667a202.666667 202.666667 0 0 1-202.666667 202.666666z"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="mt-2">
            <h6 className="fw-bold mb-0"> Return & Exchanges </h6>
            <span style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}>
              Return & Exchanges on the full Site
            </span>
          </div>
        </Col>
        <Col
          md={4}
          xs={4}
          className="text-center"
          onClick={() => {
            navigate("/order-tracking");
          }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              width={25}
              height={25}
              viewBox="0 0 108.97 122.88"
            >
              <g>
                <path d="M91.36,103.58l11.21,12.23l-7.74,7.07l-10.81-11.9c-4.11,2.73-9.06,4.34-14.37,4.34c-7.16,0-13.64-2.9-18.32-7.58 c-4.7-4.7-7.58-11.18-7.58-18.32c0-7.16,2.9-13.64,7.58-18.32c4.7-4.7,11.18-7.58,18.32-7.58c7.16,0,13.64,2.9,18.32,7.58 c4.7,4.7,7.58,11.18,7.58,18.32c0,5.23-1.55,10.11-4.22,14.2L91.36,103.58L91.36,103.58z M105.23,8.54c0.6-0.12,1.22,0,1.73,0.31 c0.88,0.36,1.5,1.22,1.5,2.23l0.51,70.57c0.04,0.87-0.38,1.73-1.18,2.2l-3.05,1.82c-0.09-0.88-1.26-4.9-0.63-5.28l-0.47-65.32 l-23.7,14.94v0v25.3c-1.58-0.5-3.56-0.89-5.22-1.17V30.71l-31.54-4.07l-1.05,30.49l-11.2-7.63l-11.2,6.33l2.31-31.88L5.34,22.46 v66.13l28.03,3.04c0.11,1.65,0.33,3.51,0.65,5.09L2.31,93.2C1.02,93.13,0,92.07,0,90.76V18.99h0c-0.03-0.96,0.52-1.89,1.45-2.3 L38.98,0.2l0,0c0.39-0.17,0.84-0.24,1.29-0.19L105.23,8.54L105.23,8.54L105.23,8.54z M70.02,8.82L46.97,21.7l30.6,3.91l20.98-13.05 L70.02,8.82L70.02,8.82L70.02,8.82z M25.03,19.43L47.84,5.91l-7.52-0.99L11.3,17.68L25.03,19.43L25.03,19.43z M84.71,74.36 c-3.85-3.85-9.16-6.23-15.03-6.23c-5.88,0-11.19,2.38-15.03,6.23c-3.85,3.85-6.23,9.16-6.23,15.03c0,5.88,2.38,11.19,6.23,15.03 c3.85,3.85,9.16,6.23,15.03,6.23c5.88,0,11.19-2.38,15.03-6.23c3.85-3.85,6.23-9.16,6.23-15.03C90.94,83.51,88.55,78.2,84.71,74.36 L84.71,74.36z" />
              </g>
            </svg>
          </div>
          <div className="mt-2">
            <h6 className="fw-bold mb-0"> Order Tracking </h6>
            <span style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}>
              We'll always keep you updated{" "}
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Accordion className="p-0 mt-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header
                className="contact-us-btn"
                onClick={() => navigate("/contact-us")}
              >
                <span>Contact Us</span>
              </Accordion.Header>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Our Policy</Accordion.Header>
              <Accordion.Body className="text-center">
                <div
                  style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}
                  className="my-3"
                  onClick={() => navigate("/refund-policy")}
                >
                  Refund Policy
                </div>
                <div
                  style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}
                  className="my-3"
                  onClick={() => navigate("/privacypolicy")}
                >
                  Privacy policy
                </div>
                <div
                  style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}
                  className="my-3"
                  onClick={() => navigate("/shippingpolicy")}
                >
                  Shipping policy
                </div>
                <div
                  style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}
                  className="my-3"
                  onClick={() => navigate("/termsofservice")}
                >
                  Terms of service
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>QUICK LINKS</Accordion.Header>
              <Accordion.Body className="text-center">
                <div
                  style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}
                  className="my-3"
                  onClick={() => navigate("/about-us")}
                >
                  About Us
                </div>
                <div
                  style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}
                  className="my-3"
                  onClick={() => navigate("/order-tracking")}
                >
                  Track Order
                </div>
                <div
                  style={{ color: "rgb(40, 44, 63)", fontSize: "13px" }}
                  className="my-3"
                  onClick={() => navigate("/faqs")}
                >
                  FAQ
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <div className="accordion-item pb-3">
              <div className="text-center py-3">Follow us</div>
              <div className="d-flex align-item-center justify-content-center mt-3">
                <div className="me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="40px"
                    height="40px"
                  >
                    {" "}<path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z" />
                  </svg>
                </div>
                <div className="mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="40px"
                    height="40px"
                  >
                    {" "}<path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z" />
                  </svg>
                </div>
                <div className="mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="40px"
                    height="40px"
                  >
                    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
                  </svg>
                </div>
                <div className="ms-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="40px"
                    height="40px"
                  >
                    {" "}<path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,14.598V9.402c0-0.385,0.417-0.625,0.75-0.433l4.5,2.598c0.333,0.192,0.333,0.674,0,0.866l-4.5,2.598 C10.417,15.224,10,14.983,10,14.598z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="accordion-item border-bottom-0 pb-5">
              <div className="text-center py-3">Experience Our App</div>
              <div className="app-button-wrapper d-flex justify-content-center">
                <a href="#" name="Play store" className="mx-1">
                  <div style={{ width: "165px" }}>
                    <img
                      alt=""
                      style={{ width: "100%" }}
                      src="//thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd.png?v=1644321768"
                      data-sizes="auto"
                      data-src="//thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd.png?v=1644321768"
                      className="Image--fadeIn lazyautosizes img_blur no_blur Image--lazyLoaded"
                      data-max-width="188"
                      data-max-height="55"
                      data-original-src="https://thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd.png?v=1644321768"
                      sizes="165px"
                      srcSet={`//thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd_360x.png?v=1644321768 360w,
              //thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd_480x.png?v=1644321768 480w,
              //thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd_765x.png?v=1644321768 765w,
              //thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd_900x.png?v=1644321768 900w,
              //thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd_1000x.png?v=1644321768 1000w,
              //thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd_1200x.png?v=1644321768 1200w,
              //thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd_1500x.png?v=1644321768 1500w,
              //thehouseofrare.com/cdn/shop/files/google-platstore_360x_68e23216-8ab7-4b33-b964-92fb5f849efd_1900x.png?v=1644321768 1900w`}
                    />
                  </div>
                </a>
                <a href="#" name="Apple store" className="mx-1">
                  <div style={{ width: "165px" }}>
                    <img
                      alt=""
                      style={{ width: "100%" }}
                      src="//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878.png?v=1644321812"
                      data-sizes="auto"
                      data-src="//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878.png?v=1644321812"
                      data-srcset="//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_360x.png?v=1644321812 360w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_480x.png?v=1644321812 480w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_765x.png?v=1644321812 765w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_900x.png?v=1644321812 900w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_1000x.png?v=1644321812 1000w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_1200x.png?v=1644321812 1200w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_1500x.png?v=1644321812 1500w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_1900x.png?v=1644321812 1900w,"
                      className="Image--fadeIn lazyautosizes img_blur no_blur Image--lazyLoaded"
                      data-max-width="188"
                      data-max-height="55"
                      data-original-src="https://thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878.png?v=1644321812"
                      sizes="165px"
                      srcSet="//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_360x.png?v=1644321812 360w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_480x.png?v=1644321812 480w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_765x.png?v=1644321812 765w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_900x.png?v=1644321812 900w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_1000x.png?v=1644321812 1000w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_1200x.png?v=1644321812 1200w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_1500x.png?v=1644321812 1500w,//thehouseofrare.com/cdn/shop/files/app-store_92af60bb-4952-4f7e-b7c0-7bb574b2d878_1900x.png?v=1644321812 1900w,"
                    />
                  </div>
                </a>
              </div>
            </div>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
