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
      {analyticsDesc[0]?.g4tag.length > 0 && (
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
      )}
      {/* Google Globle live tracker */}

      {analyticsDesc[0]?.gtag.length > 0 && (
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
      )}
      {/* Facebook Pixel  live tracker */}
      {analyticsDesc[0]?.fbpixelcode > 0 && (
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
${
  window.location.href.includes("/payment")
    ? 'fbq("track", "InitiateCheckout");'
    : ""
};

`}
          </script>
        </Helmet>
      )}
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
            <Nav className={"d-flex flex-row align-items-center"}>
            <Navbar.Brand href="/"> {/* dynamic logo use this code */}
             <img src={logo} alt="logo" height={65}  style={{marginLeft:"5px"}} /></Navbar.Brand>
            </Nav>
          </Nav>
        ) : (
          <Nav className={"d-flex flex-row align-items-center"}>
            <Navbar.Brand href="/">
            <svg viewBox="0 0 156 36" fill="none" xmlns="http://www.w3.org/2000/svg" height="25" width="90" iconsize="20" class="sc-gswNZR gNMKRJ">
                                                    <g clip-path="url(#meeshoLogo_svg__a)">
                                                        <path fill="#fff" d="M0 0h156v36H0z"></path>
                                                        <path d="M56.307 23.698c.38-.29.568-.707.568-1.253 0-1.731-.237-3.288-.707-4.675-.47-1.383-1.154-2.56-2.053-3.535a8.967 8.967 0 0 0-3.235-2.232c-1.262-.515-2.685-.774-4.264-.774-2.157 0-4.08.492-5.767 1.48-1.687.99-3.007 2.35-3.969 4.08-.957 1.732-1.436 3.755-1.436 6.063 0 2.372.492 4.42 1.481 6.157.989 1.731 2.394 3.069 4.22 4.013 1.825.944 3.995 1.414 6.518 1.414 1.186 0 2.47-.161 3.852-.479 1.383-.318 2.604-.814 3.669-1.48.546-.336.935-.73 1.163-1.186.228-.457.313-.904.25-1.347a2.007 2.007 0 0 0-.523-1.119c-.29-.304-.675-.478-1.163-.523-.488-.045-1.047.112-1.687.479a9.65 9.65 0 0 1-2.805 1.024c-.989.197-1.88.295-2.667.295-2.281 0-4.004-.613-5.176-1.847-.926-.976-1.481-2.358-1.673-4.125h13.78c.707 0 1.244-.144 1.624-.43Zm-12.72-7.705c.895-.595 1.982-.89 3.262-.89 1.154 0 2.12.25 2.894.752.774.5 1.37 1.226 1.777 2.165.34.783.532 1.732.59 2.828H40.93c.107-.864.304-1.655.603-2.349.475-1.078 1.16-1.915 2.054-2.505ZM81.13 23.698c.38-.29.568-.707.568-1.253 0-1.731-.237-3.288-.707-4.675-.47-1.383-1.154-2.56-2.054-3.535a8.966 8.966 0 0 0-3.234-2.232c-1.262-.515-2.685-.774-4.264-.774-2.157 0-4.08.492-5.767 1.48-1.687.99-3.007 2.35-3.969 4.08-.957 1.732-1.436 3.755-1.436 6.063 0 2.372.492 4.42 1.48 6.157.99 1.731 2.394 3.069 4.22 4.013 1.825.944 3.995 1.414 6.519 1.414 1.185 0 2.47-.161 3.852-.479 1.383-.318 2.604-.814 3.669-1.48.546-.336.935-.73 1.163-1.186.228-.457.313-.904.25-1.347a2.008 2.008 0 0 0-.523-1.119c-.29-.304-.675-.478-1.163-.523-.488-.045-1.047.112-1.687.479a9.65 9.65 0 0 1-2.805 1.024c-.989.197-1.88.295-2.667.295-2.282 0-4.004-.613-5.176-1.847-.931-.976-1.481-2.358-1.674-4.125h13.78c.703 0 1.245-.144 1.625-.43Zm-12.72-7.705c.895-.595 1.982-.89 3.261-.89 1.155 0 2.121.25 2.895.752.774.5 1.37 1.226 1.776 2.165.34.783.533 1.732.591 2.828h-11.18c.106-.864.303-1.655.603-2.349.47-1.078 1.154-1.915 2.054-2.505ZM97.993 21.394l-4.559-.868c-.881-.152-1.535-.438-1.96-.868-.425-.425-.64-.957-.64-1.597 0-.85.358-1.535 1.07-2.054.716-.514 1.816-.774 3.306-.774.792 0 1.62.108 2.483.318.868.215 1.772.564 2.712 1.047.514.241.98.326 1.391.25a1.71 1.71 0 0 0 1.025-.595 2.47 2.47 0 0 0 .546-1.096 1.975 1.975 0 0 0-.112-1.208c-.166-.394-.479-.716-.935-.957a13.835 13.835 0 0 0-3.396-1.347c-1.173-.29-2.425-.434-3.763-.434-1.852 0-3.494.29-4.926.868-1.427.577-2.546 1.4-3.351 2.46-.805 1.066-1.208 2.327-1.208 3.786 0 1.61.492 2.926 1.48 3.942.99 1.02 2.426 1.709 4.31 2.076l4.559.867c.94.184 1.646.466 2.12.842.47.38.707.921.707 1.62 0 .818-.358 1.48-1.07 1.981-.715.501-1.798.752-3.26.752-1.034 0-2.081-.112-3.146-.34-1.065-.228-2.206-.63-3.418-1.208-.488-.242-.936-.318-1.347-.228-.412.09-.747.29-1.002.59-.26.305-.412.662-.457 1.074a2.24 2.24 0 0 0 .228 1.23c.197.412.542.77 1.025 1.07 1.154.671 2.46 1.14 3.92 1.414 1.458.273 2.84.411 4.147.411 2.886 0 5.199-.63 6.93-1.892 1.732-1.262 2.6-3.002 2.6-5.222 0-1.642-.51-2.948-1.526-3.919-1.011-.957-2.51-1.624-4.483-1.99ZM125.603 12.32c-1.155-.666-2.631-1.002-4.421-1.002-1.794 0-3.396.416-4.81 1.253a7.254 7.254 0 0 0-2.483 2.443V4.437c0-.944-.25-1.656-.751-2.143-.501-.488-1.208-.73-2.121-.73s-1.611.242-2.099.73c-.487.487-.729 1.199-.729 2.143v27.082c0 .944.242 1.664.729 2.165.488.501 1.186.752 2.099.752 1.915 0 2.872-.97 2.872-2.917v-9.986c0-1.732.492-3.123 1.481-4.17.989-1.047 2.318-1.575 3.991-1.575 1.369 0 2.38.393 3.034 1.185.653.792.979 2.054.979 3.786v10.76c0 .944.251 1.664.752 2.165.501.501 1.208.752 2.121.752s1.611-.25 2.098-.752c.488-.5.729-1.221.729-2.165V20.486c0-2.067-.29-3.777-.867-5.128-.582-1.355-1.446-2.367-2.604-3.038ZM150.618 12.642c-1.7-.944-3.709-1.413-6.018-1.413-1.731 0-3.297.268-4.698.796-1.396.532-2.599 1.306-3.601 2.326-1.003 1.02-1.772 2.233-2.305 3.647-.532 1.414-.796 3.015-.796 4.81 0 2.37.47 4.429 1.414 6.178.939 1.75 2.264 3.092 3.968 4.036 1.701.944 3.709 1.414 6.018 1.414 1.732 0 3.297-.269 4.698-.797 1.396-.532 2.599-1.306 3.602-2.326 1.002-1.02 1.771-2.242 2.304-3.669.532-1.427.796-3.038.796-4.832 0-2.371-.47-4.42-1.414-6.156-.944-1.736-2.264-3.074-3.968-4.014Zm-1.07 14.201c-.469 1.079-1.132 1.893-1.982 2.439-.85.546-1.838.818-2.961.818-1.701 0-3.07-.613-4.103-1.847-1.034-1.23-1.548-3.047-1.548-5.45 0-1.61.237-2.957.707-4.036.469-1.078 1.132-1.883 1.982-2.416.85-.532 1.839-.796 2.962-.796 1.7 0 3.069.6 4.102 1.799 1.034 1.199 1.548 3.015 1.548 5.45 0 1.614-.237 2.961-.707 4.04ZM15.512 34.431c-1.387 0-2.555-1.167-2.555-2.554V20.18c.013-2.165-1.79-3.915-3.924-3.879-2.134-.036-3.932 1.718-3.924 3.88v11.695a2.557 2.557 0 0 1-2.554 2.554C1.18 34.431 0 33.246 0 31.877V20.22a8.993 8.993 0 0 1 2.649-6.389 8.998 8.998 0 0 1 6.384-2.648 9.012 9.012 0 0 1 6.483 2.742A8.997 8.997 0 0 1 22 11.184a8.982 8.982 0 0 1 6.385 2.648 9.008 9.008 0 0 1 2.649 6.39v11.654c0 1.37-1.181 2.555-2.555 2.555a2.557 2.557 0 0 1-2.555-2.554V20.18c.014-2.165-1.79-3.915-3.924-3.879-2.134-.036-3.932 1.718-3.923 3.88v11.695c-.01 1.387-1.177 2.554-2.564 2.554Z" fill="#570D48"></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="meeshoLogo_svg__a">
                                                            <rect width="100%" height="100%" fill="#fff"></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                
                {/* dynamic logo use this code */}
                {/* <img src={logo} alt="logo" height={65} /> */}
            
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
                    right: "-2px",
                    marginRight: "4px",
                    opacity: cartProducts.length > 0 ? 1 : 0,
                    borderRadius: "50%",
                    background: "black",
                    color: "#fff",
                    fontWeight: "bold",
                    width: "20px",
                    height: "20px",
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
                  style={{ marginRight: "8px" }}
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
        <InputGroup className="mb-3" style={{ margin: "0px 8px 0px 8px" }}>
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
            style={{
              borderLeft: "unset",
              padding: "10px",
            }}
          />
        </InputGroup>
      </Container>
    </Navbar>
  );
};

export default Header;
