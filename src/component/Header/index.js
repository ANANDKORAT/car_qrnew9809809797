import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import OfferSlider from "./OfferSlider";
import { useAuth } from "../../contexts/AuthContext";


const Header = () => {
  const [isCart, setIsCart] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isProductDetails, setIsProductDetails] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isWhishList, setIsWhishList] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [orderComfirm, setOrderComfirm] = useState(false);
  const [analyticsDesc, setAnalyticsDesc] = useState([]);
  let location = useLocation();
  const navigate = useNavigate();
  const { step, cartProducts, singleProduct, isPaymentPageLoading, setIsPaymentPageLoading } = useAuth();

  useEffect(() => {
    setIsCart(location.pathname.indexOf("/cart") > -1);
    setIsCheckout(location.pathname.indexOf("/checkout/address") > -1);
    setIsPayment(location.pathname.indexOf("/checkout/payment") > -1);
    setIsProductDetails(location.pathname.indexOf("/single-product") > -1);
    setIsCategory(location.pathname.indexOf("/category") > -1);
    setIsWhishList(location.pathname.indexOf("/wishlist") > -1);
    setThankYou(location.pathname.indexOf("/ThankYou") > -1);
    setOrderComfirm(location.pathname.indexOf("/order-comfirmation") > -1);

    handleProductData();
  }, [location]);



  useEffect(() => {
    if (cartProducts.length > 0) {
      let timecout = 0;
      let notification = document.getElementById("notificationCount");

      notification?.classList?.add("bounceNotification");
      timecout = setTimeout(() => {
        notification = document.getElementById("notificationCount");
        if (notification?.classList?.contains("bounceNotification")) {
          notification?.classList?.remove("bounceNotification");
          timecout = 0;
        }
      }, 5000);
    }
  }, [cartProducts]);

  // /api/analytic-code/get

  const handleProductData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/analytic-code/get`;
    axios
      .get(url)
      .then(function (response) {
        setAnalyticsDesc(response?.data?.data || null);
      })
      .catch(function (error) {
        // handle error
        console.log("---- error", error);
      });
  };
  let navThemeColor = process.env.REACT_APP_NAV_THEME_COLOR
  const logo = process.env.REACT_APP_LOGO;

  return (
    <>

      <Navbar expand="lg" sticky="top" className={`flex-column  custom-navbar bg-white ${isProductDetails &&
        process.env.REACT_APP_SHOW_OFFER_BANNER == "yes" &&
        singleProduct?._id ? 'pb-0' : ''}`} id="nav-look" style={{ '--nav-theme-color': navThemeColor }}>
        {/* Google g4tag live tracker */}
        {process.env.REACT_APP_G4 && (
          <Helmet>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_G4}`}
            ></script>
            <script>
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date())
            gtag('config', '${process.env.REACT_APP_G4}');
          `}
            </script>
          </Helmet>
        )}

        {/* Google Globle live tracker */}

        {process.env.REACT_APP_AW && (
          <Helmet>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_AW}`}
            ></script>
            <script>
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date())
            gtag('config', '${process.env.REACT_APP_AW}');
          `}
            </script>
          </Helmet>
        )}
        {/* Facebook Pixel  live tracker */}
        {process.env.REACT_APP_FBPIXEL && (
          <Helmet>
            <script>
              {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${process.env.REACT_APP_FBPIXEL}');
fbq('track', 'PageView');
${window.location.href.includes("/payment")
                  ? 'fbq("track", "InitiateCheckout");'
                  : ""
                };

`}
            </script>
          </Helmet>
        )}

        <Helmet>
          <link rel="icon" type="image/x-icon" href={logo} sizes="16x16" />
        </Helmet>
        {process.env.REACT_APP_FBPIXEL && (
          <noscript>
            <img
              height="1"
              width="1"
              style="display:none"
              src={`https://www.facebook.com/tr?id=${process.env.REACT_APP_FBPIXEL}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        {thankYou ? (
          <Container>
            {thankYou ? (
              <Nav className={"d-flex flex-row m-auto align-items-center"} >
                <Navbar.Brand href="/">
                  {/* dynamic logo use this code */}
                  <img
                    src={logo}
                    height={50}
                    width={90}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: "5px",
                      marginRight: "20px",
                    }}
                  />
                </Navbar.Brand>
              </Nav>
            ) : (
              <Nav
                className={"d-flex flex-row align-items-center"}
                style={{ width: isProductDetails || isWhishList ? "40%" : "" }}
              >
                <div onClick={() => {
                  if (isPaymentPageLoading && isPayment) {
                    setIsPaymentPageLoading(false)
                  } else {
                    navigate(-1)
                  }
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24}>
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M20.25 11.25H5.555l6.977-6.976a.748.748 0 000-1.056.749.749 0 00-1.056 0L3.262 11.43A.745.745 0 003 12a.745.745 0 00.262.57l8.214 8.212a.75.75 0 001.056 0 .748.748 0 000-1.056L5.555 12.75H20.25a.75.75 0 000-1.5"
                    ></path>
                  </svg>
                </div>

                <Nav className={"d-flex flex-row align-items-center"}>
                  <Navbar.Brand href="/">
                    {/* dynamic logo use this code */}
                    <img
                      src={logo}
                      height={35}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "5px",
                        marginRight: "20px",
                      }}
                    />
                  </Navbar.Brand>
                </Nav>
              </Nav>
            )}
          </Container>
        ) : (
          <Container>
            {isCart ||
              isCheckout ||
              isPayment ||
              isProductDetails ||
              isCategory ||
              orderComfirm ||
              isWhishList ? (
              <Nav
                className={"d-flex flex-row align-items-center"}
                style={{ width: isProductDetails || isWhishList ? "40%" : "" }}
              >
                <div onClick={() => {
                  if (isPaymentPageLoading && isPayment) {
                    setIsPaymentPageLoading(false)
                  } else {
                    navigate(-1)
                  }
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24}>
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M20.25 11.25H5.555l6.977-6.976a.748.748 0 000-1.056.749.749 0 00-1.056 0L3.262 11.43A.745.745 0 003 12a.745.745 0 00.262.57l8.214 8.212a.75.75 0 001.056 0 .748.748 0 000-1.056L5.555 12.75H20.25a.75.75 0 000-1.5"
                    ></path>
                  </svg>
                </div>

                <Nav className={"d-flex flex-row align-items-center"}>
                  <Navbar.Brand href="/">
                    {" "}
                    {/* dynamic logo use this code */}
                    <img
                      src={logo}
                      height={35}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "5px",
                        marginRight: "20px",
                      }}
                    />
                  </Navbar.Brand>
                </Nav>
              </Nav>
            ) : (
              <Nav className={"d-flex flex-row align-items-center"}>
                <Navbar.Brand href="/">
                  <i className="fa-solid fa-bars" style={{ color: "white" }}></i>
                  <img src={logo} height={35} style={{ marginLeft: "15%" }} />
                </Navbar.Brand>
              </Nav>
            )}
            <Nav
              className={"d-flex flex-row align-items-center position-relative"}
            >
              {step && (isCart || isCheckout || isPayment) ? (
                <>
                  {!orderComfirm && <Nav.Link
                    onClick={() => navigate("/wishlist")}
                    className="nav-menu"
                    style={{ marginRight: "30px" }}
                  >
                    <i className="fa-solid fa-square-plus" style={{ color: "#fff", }}></i>
                  </Nav.Link>}
                  {!orderComfirm && <Nav.Link
                    onClick={() => navigate("/cart")}
                    className="nav-menu postion-relative"
                  >
                    <div
                      id="notificationCount"
                      className="animated"
                      style={{
                        position: "absolute",
                        top: "0",
                        opacity: cartProducts.length > 0 ? 1 : 0,
                        borderRadius: "50%",
                        fontWeight: "bold",
                        width: "18px",
                        height: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "red",
                        marginLeft: "10px",
                        color: "#ffffff"
                      }}
                    >
                      {cartProducts.length}
                    </div>
                    <i className="fa-solid fa-cart-shopping" style={{ color: "#fff", marginRight: "30px" }}></i>
                  </Nav.Link>}
                </>
              ) : (
                <>
                  {isProductDetails || isWhishList ? (
                    <Nav.Link
                      className="nav-menu"
                      style={{ marginRight: "18px" }}
                    >
                      <i className="fa-solid fa-magnifying-glass" style={{ color: "#fff", marginRight: "20px" }}></i>
                    </Nav.Link>
                  ) : (
                    ""
                  )}
                  {!orderComfirm && <Nav.Link
                    onClick={() => navigate("/wishlist")}
                    className="nav-menu"
                    style={{ marginRight: "30px" }}
                  >
                    <i className="fa-solid fa-square-plus" style={{ color: "#fff", }}></i>
                  </Nav.Link>}
                  {!orderComfirm && <Nav.Link
                    onClick={() => navigate("/cart")}
                    className="nav-menu postion-relative"
                  >
                    <div
                      id="notificationCount"
                      className="animated"
                      style={{
                        position: "absolute",
                        top: "0",
                        opacity: cartProducts.length > 0 ? 1 : 0,
                        borderRadius: "50%",
                        fontWeight: "bold",
                        width: "18px",
                        height: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "red",
                        marginLeft: "10px",
                        color: "#ffffff"

                      }}
                    >
                      {cartProducts.length}
                    </div>
                    <i className="fa-solid fa-cart-shopping" style={{ color: "#fff", marginRight: "30px" }}></i>
                  </Nav.Link>}
                </>
              )}
            </Nav>
          </Container>

        )}
        <Helmet>
          <link rel="icon" href={logo} />
        </Helmet>
        <Container
          className={`${isCart ||
            isCheckout ||
            isPayment ||
            isProductDetails ||
            orderComfirm ||
            isCategory ||
            thankYou ||
            isWhishList
            ? "d-none"
            : ""
            }`}
        >
          <div className="form-group" style={{ marginTop: "8px" }}>
            <input type="text" className="form-control" placeholder="Search for Products, Brands and More" style={{ borderRadius: "3px" }} />
          </div>
        </Container>

        {isProductDetails &&
          process.env.REACT_APP_SHOW_OFFER_BANNER == "yes" &&
          singleProduct?._id && (
            <Container
              style={{
                background: "var(--them-color)",
                borderColor: "var(--them-color)",
                fontSize: 20,
                color: "#fff",
                padding: "8px 16px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              <div className="m-auto">
                <OfferSlider />
              </div>
            </Container>
          )}
      </Navbar>
      <div className="main-steps">
        {step && (isCart || isCheckout || isPayment) ? (
          <>
            <div className="step-container" />
            <div>
              <div
                className="step-number m-auto"
                style={
                  step > 1
                    ? { background: "white", border: "1px solid #2874F0" }
                    : { border: "1px solid #2874F0" }
                }
              >
                {step > 1 ? <i className="fa-solid fa-check"></i> : 1}
              </div>
              <p style={{ fontSize: "15px", fontWeight: "500" }}>Cart</p>
            </div>
            <div>
              <div
                className="step-number m-auto"
                style={
                  step > 2
                    ? { background: "white", border: "1px solid #2874F0 " }
                    : { border: "1px solid #2874F0 " }
                }
              >
                {step > 2 ? <i className="fa-solid fa-check"></i> : 2}
              </div>
              <p style={{ fontSize: "15px", fontWeight: "500" }}>Address</p>
            </div>
            <div>
              <div
                className="step-number m-auto"
                style={
                  step > 3
                    ? { background: "white", border: "1px solid #2874F0 " }
                    : { border: "1px solid #2874F0 " }
                }
              >
                {step > 3 ? <i className="fa-solid fa-check"></i> : 3}
              </div>
              <p style={{ fontSize: "15px", fontWeight: "500" }}>Payment</p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {/* {step && (isCart || isCheckout || isPayment) ? (
        <>
          <div style={{ borderTop: "1px solid rgb(206, 206, 222)" }}></div>
        </>

      ) : (
        <></>
      )} */}

    </>

  );
};

export default Header;
