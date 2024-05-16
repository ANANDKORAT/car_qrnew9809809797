import React, { useEffect, useState } from "react";
import "./index.css";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import SkeletonLoader from "../SkeletonLoader";
import ProductCard from "../ProductCard";
import animaionImageHOme from "../../assets/2f53o.gif";

const Home = () => {
  const { sliderImages } = useAuth();
  const navigate = useNavigate();
  const [categoryArray, setCategoryArray] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const initialTime = 300; // 5 minutes in seconds
  const [timer, setTimer] = useState(initialTime);
  const [timerString, setTimerString] = useState(formatTime(initialTime));

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timer === -1) {
      setTimer(initialTime);
    } else {
      setTimerString(formatTime(timer));
    }
  }, [timer, initialTime]);

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

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

  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
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
        <Row
          className={
            "d-flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden category-box"
          }
        >
          {categoryArray.length > 0 &&
            categoryArray?.map((item) => (
              <Col xs={3} md={3}>
                <Image
                  onClick={() => {
                    navigate(`/category/${item._id}`);
                  }}
                  src={item?.image || ""}
                  rounded
                  style={{ width: "64px", maxHeight: "64px" }}
                />
              </Col>
            ))}
        </Row>
        <Row>
          <div>
            <img src={animaionImageHOme} class="w-100 mb-2" />
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
              >
                {/* ....................slider dot code Start................ */}
                {/* {sliderImages?.length > 1 && (
                  <div className="dots">
                    {[...Array(sliderImages?.length).keys()].map((idx) => {
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            instanceRef?.current?.moveToIdx(idx);
                          }}
                          className={
                            "dot" + (currentSlide === idx ? " active" : "")
                          }
                        ></button>
                      );
                    })}
                  </div>
                )} */}
                {/* ....................slider dot code Close................ */}
              </div>
            </Col>
          )}
        </Row>

        <div className="menu mt-2 " style={{ backgroundColor: process.env.REACT_APP_THEAM_COLOR }}>
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
        <Image src="https://images.meesho.com/images/widgets/OY6J5/xwgyl_800.webp" style={{ width: "100%" }} />

        <div className="main-time">
          <div className="inner-time">
            <div className="dod-div">
              <div className="dod-label"> Deals of the Day </div>
              <div className="timer-logo">
                <div className="dod-timer">
                  <img className="img-timer" src="http://theskechhs.shop/assets/images/theme/clock.svg" />
                  <div id="test">{timerString}</div>
                </div>
              </div>
            </div>
            <div className="sale_text">
              <button className="btn-sale-is-live">SALE IS LIVE</button>
            </div>
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
              item.products.length > 0 && (
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
