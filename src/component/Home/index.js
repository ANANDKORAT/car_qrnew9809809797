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

/**
 * Home Component
 * Main landing page component that displays categories, products and promotional content
 */
const Home = () => {
  // Auth context for slider images
  const { sliderImages } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [categoryArray, setCategoryArray] = useState([]); // Stores category data
  const [productsArray, setProductsArray] = useState([]); // Stores product data
  const [isLoader, setIsLoader] = useState(true); // Loading state
  
  // Refs for countdown timer
  const ref = useRef(null);
  let location = useLocation();

  // Reset countdown timer when location changes
  useEffect(() => {
    if (ref?.current) {
      if (["STOPPED", "COMPLETED"].includes(ref?.current?.state?.status)) {
        ref?.current?.start();
      }
    }
  }, [location, ref]);

  // Fetch categories on component mount
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

  /**
   * Fetches product data from the API
   * Updates productsArray state and loading state
   */
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

  // Fetch products on component mount
  useEffect(() => {
    setIsLoader(true);
    handleProductData();
  }, []);

  // Configure image slider
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      // Slider configuration
      loop: true,
      mode: "free",
      slides: {
        perView: 1,
        spacing: 15,
      },
    },
    [
      // Auto-advance slider functionality
      (slider) => {
        let timeout;

        // Clear auto-advance timeout
        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        // Set timeout for auto-advancing slides
        function nextTimeout() {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            slider.next();
          }, 2000); // Advance every 2 seconds
        }

        // Initialize slider behaviors
        slider.on("created", () => {
          // Pause auto-advance on mouse hover
          slider.container.addEventListener("mouseover", () => {
            clearNextTimeout();
          });
          // Resume auto-advance when mouse leaves
          slider.container.addEventListener("mouseout", () => {
            nextTimeout();
          });
          nextTimeout();
        });

        // Event handlers for slider interactions
        slider.on("dragStarted", clearNextTimeout);  // Stop auto-advance during drag
        slider.on("animationEnded", nextTimeout);    // Resume after animation
        slider.on("updated", nextTimeout);           // Reset timer after update
      },
    ]
  );

  return (
    <div className="category_block">
      <Container style={{ padding: '1px' }}>
        {categoryArray.length > 1 && (
          <Row className="g-0 d-flex align-items-center justify-content-around" style={{ margin: '0', padding: '1px' }}>
            {categoryArray.length === 6 ? (
              <>
                {/* First row with 3 images */}
                <Row className="g-0 d-flex justify-content-center" style={{ margin: '0', padding: '1px' }}>
                  {categoryArray.slice(0, 3).map((item) => (
                    <Col
                      key={item._id}
                      xs={4} // 3 columns in a row
                      className="d-flex align-items-center justify-content-center"
                      style={{ paddingRight: 0, paddingLeft: 0 }}
                    >
                      <Image
                        onClick={() => navigate(`/category/${item._id}`)}
                        src={item?.image || ""}
                        alt={item?.name || "Category"}
                        rounded
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
                {/* Second row with 3 images */}
                <Row className="g-0 d-flex justify-content-center" style={{ margin: '0', padding: '1px' }}>
                  {categoryArray.slice(3, 6).map((item) => (
                    <Col
                      key={item._id}
                      xs={4} // 3 columns in a row
                      className="d-flex align-items-center justify-content-center"
                      style={{ padding: '2px', margin: '0', paddingRight: 0, paddingLeft: 0 }}
                    >
                      <Image
                        onClick={() => navigate(`/category/${item._id}`)}
                        src={item?.image || ""}
                        alt={item?.name || "Category"}
                        rounded
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              // For images less than 4, display them in one row without gaps
              <Row className="g-0 d-flex justify-content-center p-0" style={{ margin: '0', padding: '1px' }}>
                {categoryArray.map((item) => (
                  <Col
                    key={item._id}
                    xs={12 / categoryArray.length} // Dynamic width based on the number of images
                    className="d-flex align-items-center justify-content-center"
                    style={{ padding: '2px', margin: '0', paddingRight: 0, paddingLeft: 0 }}
                  >
                    <Image
                      onClick={() => navigate(`/category/${item._id}`)}
                      src={item?.image || ""}
                      alt={item?.name || "Category"}
                      rounded
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Row>
        )}

        <Row className="g-0" style={{ margin: '0', padding: '1px' }}>
          <Col className="p-0" style={{ paddingRight: 0, paddingLeft: 0 }}>
            <img src={animaionImageHOme} className="w-100" style={{ borderRadius: '8px', margin: '0' }} />
          </Col>
        </Row>
        <Row className="g-0" style={{ margin: '0', padding: '1px' }}>
          {sliderImages?.length > 0 && (
            <Col md={12} xs={12} className="position-relative p-0" style={{ paddingRight: 0, paddingLeft: 0 }}>
              <div ref={sliderRef} className="keen-slider" style={{ borderRadius: '8px', overflow: 'hidden', margin: '0' }}>
                {sliderImages?.map((item) => (
                  <div className="keen-slider__slide number-slide1">
                    <Image src={item} rounded style={{ width: "100%" }} />
                  </div>
                ))}
              </div>
            </Col>
          )}
        </Row>

        <div
          className="menu"
          style={{ 
            backgroundColor: process.env.REACT_APP_THEAM_COLOR,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            margin: '0',
            padding: '5px'
          }}
        >
          <marquee
            width="100%"
            direction="left"
            style={{ 
              color: "white",
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              fontSize: '14px',
              fontWeight: 'bold',
              gap: '1px'
            }}
          >
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
            <span style={{ margin: '0 1px' }}>•</span>
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
            <span style={{ margin: '0 1px' }}>•</span>
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
            <span style={{ margin: '0 1px' }}>•</span>
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
            <span style={{ margin: '0 1px' }}>•</span>
            <span>Buy 2 Get 1 Free (Add 3 item to cart)</span>
          </marquee>
        </div>

        <div className="main-time" syle={{ marginBottom: '1px' }}>
          <div className="inner-time" style={{ margin: '1px 0' }}>
            <div className="dod-div" style={{ marginBottom: '1px' }}>
              <div
                className="container p-0"
                style={{ 
                  textAlign: "center", 
                  border: "none",
                  margin: '1px 0'
                }}
              >
                <span style={{ margin: '1px 0', display: 'block' }}>
                  <Countdown
                    date={Date.now() + parseInt(process.env.REACT_APP_OFFER_TIME)}
                    ref={ref}
                    renderer={(e) => <OfferCountdown />}
                    intervalDelay={1000}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {isLoader ? (
          <Row xs={2} md={2} className="g-0" style={{ marginBottom: '1px' }}>
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
                <div style={{ marginBottom: '1px' }}>
                  <h4 className="card-title text-center fw-bold" style={{ margin: '5px 5px' }}>{`${item.categoryName} Collection`}</h4>
                  <Row xs={2} md={2} className="g-0" style={{ marginTop: '1px' }}>
                    {item.products.map((product, index) => (
                      <ProductCard key={product._id || index} item={product} index={index} />
                    ))}
                  </Row>
                  <Button
                    className="btn d-flex justify-content-center align-items-center ripple animated"
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      margin: '5px auto',
                      borderWidth: "2px",
                      padding: "5px 20px",
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
