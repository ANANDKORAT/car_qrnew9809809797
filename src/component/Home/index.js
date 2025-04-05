import { useEffect, useState, useRef } from "react";
import "./index.css";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import SkeletonLoader from "../SkeletonLoader";
import ProductCard from "../ProductCard";
import animaionImageHOme from "../../assets/2f53o.gif";
import Countdown from "react-countdown";
import OfferCountdown from "../Header/OfferCountdown";

const Home = () => {
  const { sliderImages } = useAuth();
  const navigate = useNavigate();
  const [categoryArray, setCategoryArray] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const ref = useRef(null);
  let location = useLocation();

  useEffect(() => {
    if (ref?.current) {
      if (["STOPPED", "COMPLETED"].includes(ref?.current?.state?.status)) {
        ref?.current?.start();
      }
    }
  }, [location, ref]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category/get`)
      .then(function (response) {
        // handle success
        if (response.data.data.length > 0 && response.data.statusCode === 1) {
          setCategoryArray(response.data.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log("---- error", error);
        setCategoryArray([]);
      });
  }, []);

  const handleProductData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/products/get`;
    axios
      .get(url)
      .then(function (response) {
        // handle success
        if (
          response?.data?.data?.length > 0 &&
          response?.data?.statusCode === 1
        ) {
          setProductsArray(response.data.data);
          setIsLoader(false);
        } else {
          setProductsArray([]);
          setIsLoader(false);
        }
      })
      .catch(function (error) {
        // handle error
        setProductsArray([]);
        setIsLoader(false);
      });
  };

  useEffect(() => {
    setIsLoader(true);
    handleProductData();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      slides: {
        perView: 1,
        spacing: 15,
      },
    },
    [
      (slider) => {
        let timeout;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="category_block">
      <Container>
        {categoryArray.length > 1 && (
          <Row className="d-flex align-items-center justify-content-around m-0 mb-2">
            {categoryArray.length === 6 ? (
              <>
                {/* First row with 3 images */}
                <Row className="d-flex justify-content-center">
                  {categoryArray.slice(0, 3).map((item) => (
                    <Col
                      key={item._id}
                      xs={4} // 3 columns in a row
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Image
                        onClick={() => navigate(`/category/${item._id}`)}
                        src={item?.image || ""}
                        alt={item?.name || "Category"}
                        rounded
                        style={{
                          width: "100%",
                          height: "auto",
                          border: "1px solid black",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
                {/* Second row with 3 images */}
                <Row className="d-flex justify-content-center mt-2">
                  {categoryArray.slice(3, 6).map((item) => (
                    <Col
                      key={item._id}
                      xs={4} // 3 columns in a row
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Image
                        onClick={() => navigate(`/category/${item._id}`)}
                        src={item?.image || ""}
                        alt={item?.name || "Category"}
                        rounded
                        style={{
                          width: "100%",
                          height: "auto",
                          border: "1px solid black",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              // For images less than 4, display them in one row without gaps
              <Row className="d-flex justify-content-center p-0">
                {categoryArray.map((item) => (
                  <Col
                    key={item._id}
                    xs={12 / categoryArray.length} // Dynamic width based on the number of images
                    className="d-flex align-items-center justify-content-center"
                    style={{ padding: "2px" }}
                  >
                    <Image
                      onClick={() => navigate(`/category/${item._id}`)}
                      src={item?.image || ""}
                      alt={item?.name || "Category"}
                      rounded
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "1px solid black",
                      }}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Row>
        )}

        <Row className="">
          <div>
            <img src={animaionImageHOme} className="w-100 mb-2" />
          </div>
        </Row>
        <Row>
          {sliderImages?.length > 0 && (
            <Col md={12} xs={12} className="position-relative">
              <div ref={sliderRef} className="keen-slider mt-1">
                {sliderImages?.map((item) => (
                  <div className="keen-slider__slide number-slide1">
                    <Image src={item} rounded style={{ width: "100%" }} />
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "12px",
                  right: "12px",
                }}
              ></div>
            </Col>
          )}
        </Row>

        <div
          className="menu mt-2 "
          style={{ backgroundColor: process.env.REACT_APP_THEAM_COLOR }}
        >
          <marquee
            width="100%"
            direction="left"
            height="30px"
            fontWeight="700"
            style={{ color: "white" }}
          >
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
            <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
            <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
            <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
            <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
          </marquee>
        </div>
        {/* <Image src="https://images.meesho.com/images/widgets/OY6J5/xwgyl_800.webp" style={{ width: "100%" }} /> */}

        <div className="main-time">
          <div className="inner-time">
            <div className="dod-div">
              
              <div
                className="container p-3"
                style={{ textAlign: "center", border: "none" }}
              >
                <span>
                  <Countdown
                    date={
                      Date.now() + parseInt(process.env.REACT_APP_OFFER_TIME)
                    }
                    ref={ref}
                    renderer={(e) => <OfferCountdown />}
                    intervalDelay={1000}
                  />
                </span>
              </div>
            </div>
            {/* <div className="sale_text">
                            <button className="btn-sale-is-live">SALE IS LIVE</button>
                        </div> */}
          </div>
        </div>

        {isLoader ? (
          <Row xs={2} md={2} className="g-0 mt-2">
            <Col>
              <SkeletonLoader />
            </Col>
            <Col>
              <SkeletonLoader />
            </Col>
            <Col>
              <SkeletonLoader />
            </Col>
            <Col>
              <SkeletonLoader />
            </Col>
          </Row>
        ) : (
          productsArray?.map((item) => {
            return (
              item?.products?.length > 0 && (
                <div>
                  <h4 className="card-title text-center fw-bold my-3">{`${item.categoryName} Collection`}</h4>
                  <Row xs={2} md={2} className="g-0 mt-2">
                    {item.products.map((product, index) => (
                      <ProductCard item={product} index={index} />
                    ))}
                  </Row>
                  <Button
                    className="btn my-3 d-flex justify-content-center align-items-center ripple animated"
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      margin: "auto",
                      borderWidth: "2px",
                      padding: "10px 20px",
                      borderColor: "var(--them-color)",
                      color: "var(--them-color)",
                      background: "#ffff",
                    }}
                    onClick={(e) => {
                      e?.target?.classList?.add("bounceIn");
                      navigate(`/category/${item._id}`);
                      setTimeout(() => {
                        if (e?.target?.classList?.contains("bounceIn"))
                          e?.target?.classList?.remove("bounceIn");
                      }, 1000);
                    }}
                  >
                    View More
                  </Button>
                </div>
              )
            );
          })
        )}
      </Container>
    </div>
  );
};

export default Home;
