import React, { useEffect, useState } from "react";
import "./index.css";
import { Container, InputGroup, Nav, Navbar, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Helmet } from "react-helmet";

const Header = () => {
  const [isCart, setIsCart] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isProductDetails, setIsProductDetails] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isWhishList, setIsWhishList] = useState(false);
  const [analyticsDesc, setAnalyticsDesc] = useState([]);
  let location = useLocation();
  const navigate = useNavigate();
  const { step, cartProducts, singleProduct, logo, category } = useAuth();

  useEffect(() => {
    setIsCart(location.pathname.indexOf("/cart") > -1);
    setIsCheckout(location.pathname.indexOf("/checkout/address") > -1);
    setIsPayment(location.pathname.indexOf("/checkout/payment") > -1);
    setIsProductDetails(location.pathname.indexOf("/single-product") > -1);
    setIsCategory(location.pathname.indexOf("/category") > -1);
    setIsWhishList(location.pathname.indexOf("/wishlist") > -1);
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
  return (
    <Navbar expand="lg" sticky="top" className="flex-column bg-white">
      {/* Google g4tag live tracker */}
      <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsDesc[0]?.g4tag}`}
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date())
            gtag('config', '${analyticsDesc[0]?.g4tag}');
          `}
        </script>
      </Helmet>

      {/* Google Globle live tracker */}
      <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsDesc[0]?.gtag}`}
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date())
            gtag('config', '${analyticsDesc[0]?.gtag}');
          `}
        </script>
      </Helmet>

      {/* Facebook Pixel  live tracker */}
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
fbq('init', '${analyticsDesc[0]?.fbpixelcode}');
fbq('track', 'PageView');
fbq('track', 'InitiateCheckout');

`}
        </script>
      </Helmet>

      <noscript>
        <img
          height="1"
          width="1"
          style="display:none"
          src={`https://www.facebook.com/tr?id=${analyticsDesc[0]?.fbpixelcode}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Container>
        {isCart ||
        isCheckout ||
        isPayment ||
        isProductDetails ||
        isCategory ||
        isWhishList ? (
          <Nav
            className={"d-flex flex-row align-items-center"}
            style={{ width: isProductDetails || isWhishList ? "40%" : "" }}
          >
            <div onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24}>
                <path
                  fill="#3E4152"
                  fillRule="evenodd"
                  d="M20.25 11.25H5.555l6.977-6.976a.748.748 0 000-1.056.749.749 0 00-1.056 0L3.262 11.43A.745.745 0 003 12a.745.745 0 00.262.57l8.214 8.212a.75.75 0 001.056 0 .748.748 0 000-1.056L5.555 12.75H20.25a.75.75 0 000-1.5"
                ></path>
              </svg>
            </div>
            <div style={{ width: isProductDetails ? "100%" : "" }}>
              <h6
                className="ms-2 mb-0"
                style={{
                  color: "#424553",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: isProductDetails ? "100%" : "195px",
                  fontWeight: 700,
                }}
              >
                {isWhishList
                  ? "WISH LIST"
                  : isPayment
                  ? "PAYMENT"
                  : isCheckout
                  ? "ADDRESS"
                  : isProductDetails
                  ? singleProduct?.title
                  : isCategory
                  ? category?.name
                  : "SHOPPING BAG"}
              </h6>
            </div>
          </Nav>
        ) : (
          <Nav className={"d-flex flex-row align-items-center"}>
            <Navbar.Brand href="/">
              <img src={logo} alt="logo" height={65} />
            </Navbar.Brand>
          </Nav>
        )}

        <Nav className={"d-flex flex-row align-items-center position-relative"}>
          {step && (isCart || isCheckout || isPayment) ? (
            <div className="step-number">STEP {step}/3</div>
          ) : (
            <>
              {isProductDetails || isWhishList ? (
                <Nav.Link className="nav-menu" style={{ marginRight: "18px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill={"#656464"}
                  >
                    <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
                  </svg>
                </Nav.Link>
              ) : (
                ""
              )}
              <Nav.Link
                onClick={() => navigate("/wishlist")}
                className="nav-menu"
                style={{ marginRight: "18px" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g fill="#3E4152">
                      <path d="M8.1703,4.473425 C6.9537,4.473425 5.8134,4.946625 4.95975,5.805525 C4.10435,6.666175 3.63325,7.815575 3.63325,9.042675 C3.63325,10.269775 4.10435,11.419525 4.95975,12.280175 L12,19.362425 L19.0406,12.279825 C19.89565,11.419525 20.36675,10.270125 20.36675,9.042675 C20.36675,7.815575 19.89565,6.665825 19.0406,5.805875 C19.0406,5.805875 19.0406,5.805525 19.04025,5.805525 C18.1866,4.946625 17.0463,4.473425 15.8297,4.473425 C14.6138,4.473425 13.4742,4.946275 12.62055,5.804475 C12.29225,6.134525 11.70845,6.134875 11.3798,5.804475 C10.5258,4.946275 9.3862,4.473425 8.1703,4.473425 L8.1703,4.473425 Z M12.02835,21.276575 L11.972,21.276575 C11.6304,21.276575 11.2965,21.137625 11.05605,20.895075 L3.71865,13.513925 C2.53495,12.323225 1.88325,10.735275 1.88325,9.042675 C1.88325,7.350075 2.53495,5.762475 3.71865,4.571775 C4.9034,3.379675 6.48435,2.723425 8.1703,2.723425 C9.5759,2.723425 10.90905,3.179825 12,4.022625 C13.0913,3.179825 14.4241,2.723425 15.8297,2.723425 C17.516,2.723425 19.09695,3.379675 20.2817,4.572125 C21.46505,5.762475 22.11675,7.350075 22.11675,9.042675 C22.11675,10.735625 21.46505,12.323225 20.2817,13.513925 L12.94325,20.895775 C12.6993,21.141475 12.3745,21.276575 12.02835,21.276575 L12.02835,21.276575 Z"></path>
                    </g>
                  </g>
                </svg>
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/cart")}
                className="nav-menu postion-relative"
              >
                {/* {cartProducts?.length > 0 ? ( */}
                <div
                  id="notificationCount"
                  className="animated"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "-12px",
                    opacity: cartProducts.length > 0 ? 1 : 0,
                    borderRadius: "50%",
                    background: "black",
                    color: "#fff",
                    fontWeight: "bold",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {cartProducts.length}
                </div>
                {/* ) : (
                  ""
                )} */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M21,6H18A6,6,0,0,0,6,6H3A3,3,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A3,3,0,0,0,21,6ZM12,2a4,4,0,0,1,4,4H8A4,4,0,0,1,12,2ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A1,1,0,0,1,3,8H6v2a1,1,0,0,0,2,0V8h8v2a1,1,0,0,0,2,0V8h3a1,1,0,0,1,1,1Z" />
                </svg>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
      <Helmet>
        <link rel="icon" href={logo} />
      </Helmet>
      <Container
        className={`${
          isCart ||
          isCheckout ||
          isPayment ||
          isProductDetails ||
          isCategory ||
          isWhishList
            ? "d-none"
            : ""
        }`}
      >
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" style={{ background: "unset" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill={"#656464"}
            >
              <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
            </svg>
          </InputGroup.Text>
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            style={{ borderLeft: "unset", padding: "10px" }}
          />
        </InputGroup>
      </Container>
    </Navbar>
  );
};

export default Header;
