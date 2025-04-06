// Import statements
import { useEffect, useState, useRef } from "react";
import "./index.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../contexts/AuthContext";
import SkeletonLoader from "../SkeletonLoader";
import ProductCard from "../ProductCard";
import Countdown from "react-countdown";
import OfferCountdown from "../Header/OfferCountdown";
import faAssuredPlus from "../../assets/plusassured.jpg";
import Offer from "../../assets/offer.jpg";
import faPlusAssured from "../../assets/plusassured.jpg";
import replacement from "../../assets/replacement.jpg";
import assured from "../../assets/assuredflipcart.jpg";

import noncod from "../../assets/non-cod.jpg";

/* Thumbnail Plugin Configuration */
function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

/* PromoBanner Component - Updated */
const PromoBanner = () => (
  <div style={{
    position: 'relative',
    width: '100%',
    height: 'auto',
    aspectRatio: '850/250', // Maintains image ratio
    overflow: 'hidden',
    margin: '15px 0',
    borderRadius: '8px'
  }}>
    <img
      src="https://rukminid2.flixcart.com/www/850/250/promos/19/08/2024/8600d4b9-d61a-4360-bd1f-8ac4a78fbb7c.png?q=20"
      alt="Promotional banner"
      loading="eager"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  </div>
);

/* Main Product Component */
const SingleProduct = () => {
  // State Management
  const { id } = useParams();
  const [selectSize, setSelectSize] = useState("M");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pinCode, setPinCode] = useState("");

  // Auth Context
  const {
    handleSetCartProducts,
    cartProducts,
    setSingleProduct,
    singleProduct,
  } = useAuth();

  // Initialize state with singleProduct
  const [singleData, setSingleData] = useState(singleProduct || {});
  const [reletedProduct, setReletedProduct] = useState([]);

  // Hooks and Utils
  const navigate = useNavigate();
  const ref = useRef(null);
  let location = useLocation();

  // Slider Configurations
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "snap",
      origin: "center",
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      slides: { perView: 1 },
    },
    []
  );

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  // Handlers
  const handlePinCodeChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPinCode(value);
    }
  };

  // Computed Values
  const isPinCodeValid = pinCode.length === 6;
  const discountPercentage = singleData?.discount
    ? Math.round(((singleData.price - singleData.discount) / singleData.price) * 100)
    : 0;

  // Effects
  useEffect(() => {
    if (ref?.current) {
      if (["STOPPED", "COMPLETED"].includes(ref?.current?.state?.status)) {
        ref?.current?.start();
      }
    }
  }, [location, ref]);

  useEffect(() => {
    if (!singleProduct || singleProduct._id !== id) {
      setIsLoading(true);
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
      .then((res) => {
        setSingleData(res?.data?.product);
        setSingleProduct(res?.data?.product);
        setReletedProduct(res?.data?.relatedProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="single_product_block">
      <Container fluid="xl">
        {isLoading ? (
          <Col className="d-flex justify-content-center">
            <SkeletonLoader isSinglePage />
          </Col>
        ) : (
          <Row>
            {/* Image Column - Full Width */}
            <Col xs={12} className="p-0">
              <div className="image-slider-container">
                {singleData?.images && (
                  <div ref={sliderRef} className="keen-slider mt-1">
                    {singleData?.images?.map((item, index) => (
                      <div key={`slide-${index}`} className="keen-slider__slide">
                        <img
                          src={item}
                          alt={`product-${index}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "600px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div ref={thumbnailRef} className="keen-slider thumbnail">
                  {singleData?.images?.map((img, index) => (
                    <div
                      key={`thumb-${index}`}
                      className={`keen-slider__slide number-slide${index + 1}`}
                      style={{ "--borderColor": "var(--them-color)" }}
                    >
                      <img
                        src={img}
                        alt={`thumbnail-${index}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            {/* Info Column - Full Width */}
            <Col xs={12} className="product-info-section">
              <div className="product-info-inner">
                <h1
                  style={{
                    color: "#282c3f",
                    fontSize: "18px", // Reduced by 25% from 24px
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {singleData?.description}
                </h1>

                {/* Rating Section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={`star-${i}`}
                        className={`${
                          i < Math.floor(singleData?.rating || 0) ? "fas" : "far"
                        } fa-star`}
                        style={{
                          color: "#4BB550",
                          fontSize: "14px",
                          marginRight: "2px",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#878787",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {singleData?.rating?.toFixed(1)} • 2,594 Ratings & 6,500 Reviews
                  </span>
                </div>

                {/* Flipkart Assured */}
                {process.env.REACT_APP_FLIPASSURED_IMAGE === "yes" && (
                  <img
                    src={assured}
                    height="17" // Reduced by 30% from 25px
                    alt="f-assured"
                    style={{ marginBottom: "16px" }}
                  />
                )}

                {/* Price Section */}
                <div className="price-section">
                  <div className="discount-percentage">
                    <svg width="24" height="24" viewBox="0 0 12 12" fill="#4BB550"> {/* Reduced by 25% from 32 */}
                      <path d="M6.73461 1V8.46236L9.5535 5.63352L10.5876 6.65767L5.99384 11.2415L1.41003 6.65767L2.42424 5.63352L5.25307 8.46236V1H6.73461Z" />
                    </svg>
                    <span style={{ fontSize: "24px" }}>{discountPercentage}% off</span> {/* Reduced by 25% from 32px */}
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="original-price" style={{ fontSize: "24px" }}> {/* Reduced by 25% from 32px */}
                      ₹{singleData.price}
                    </span>
                    <span className="discounted-price" style={{ fontSize: "24px" }}> {/* Reduced by 25% from 32px */}
                      ₹{singleData.discount}
                    </span>
                  </div>
                </div>

                {/* Size Selection - Redesigned */}
                {singleData?.size?.length > 0 && (
                  <div className="size-selection-container" style={{
                    padding: '11px 0',
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                      marginBottom: '9px'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#282c3f'
                      }}>
                        Select Size
                      </span>
                      <span style={{
                        fontSize: '11px',
                        color: '#ffc200',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}>
                        Size Chart ›
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {singleData?.size?.map((item) => (
                        <div
                          key={`size-${item}`}
                          onClick={() => setSelectSize(item)}
                          style={{
                            minWidth: '38px',
                            height: '38px',
                            border: selectSize === item ? '1px solid #ffc200' : '1px solid #bfc0c6',
                            borderRadius: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            background: selectSize === item ? '#fff' : '#fff',
                            position: 'relative',
                            padding: '0 12px'
                          }}
                        >
                          <span style={{
                            color: selectSize === item ? '#ffc200' : '#282c3f',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {item}
                          </span>
                          {selectSize === item && (
                            <div style={{
                              position: 'absolute',
                              bottom: '-5px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '9px',
                              height: '9px',
                              borderRadius: '50%',
                              background: '#ffc200'
                            }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Section - Redesigned */}
                <div className="delivery-section" style={{
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  marginBottom: '20px',
                }}>
                  <div className="pincode-input-wrapper" style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'flex-end',
                    gap: '10px',
                    marginBottom: '15px',
                    position: 'relative',
                    borderBottom: '2px solid #e0e0e0'
                  }}>
                    <input
                      type="number"
                      placeholder="Enter pincode for exact delivery dates"
                      value={pinCode}
                      onChange={handlePinCodeChange}
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '8px 0',
                        border: 'none',
                        outline: 'none',
                        fontSize: '16px',
                        color: '#282c3f',
                        background: 'transparent'
                      }}
                    />
                    {pinCode.length > 0 && !isPinCodeValid && (
                      <button
                        type="submit"
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: '#ffc200',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          padding: '0 0 8px 0'
                        }}
                      >
                        Check
                      </button>
                    )}
                    {isPinCodeValid && (
                      <span style={{
                        color: '#4BB550',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: '0 0 8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <i className="fas fa-check-circle"></i>
                        Available
                      </span>
                    )}
                  </div>

                  {isPinCodeValid && (
                    <div className="delivery-info" style={{
                      padding: '12px',
                      backgroundColor: '#f8fff9',
                      borderRadius: '4px',
                      marginBottom: '15px',
                      border: '1px solid #4BB550'
                    }}>
                      <div style={{
                        color: '#4BB550',
                        fontSize: '14px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <i className="fas fa-truck" style={{ color: '#4BB550' }}></i>
                        Delivery by 2-3 Business Days
                      </div>
                    </div>
                  )}

                  {/* Replace the boxed list with simple text lines */}
                  <ul style={{
                    margin: '15px 0 0 0',
                    padding: '0',
                    listStyle: 'none',
                    fontSize: '13px',
                    color: '#666',
                    display: 'grid',
                    gap: '12px'
                  }}>
                    <li style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px'
                    }}>
                      <i className="fas fa-check-circle" style={{ color: '#ffc200' }}></i>
                      <span>Pay on delivery available</span>
                    </li>
                    <li style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px'
                    }}>
                      <i className="fas fa-undo" style={{ color: '#ffc200' }}></i>
                      <span>Easy 7 days return & exchange</span>
                    </li>
                    <li style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px'
                    }}>
                      <i className="fas fa-box-open" style={{ color: '#ffc200' }}></i>
                      <span>Try & Buy might be available</span>
                    </li>
                  </ul>
                </div>

                {/* Add PromoBanner */}
                <PromoBanner />

                {/* Product Details */}
                {singleData.productDetails && (
                  <div>
                    <h6 className="card-title text-start fw-bold mb-3">
                      Product Details
                    </h6>
                    {singleData.product_video && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `
            <video
             width="100%"
              loop
              muted
              autoplay
              playsinline
              src="${singleData.product_video}"
              className="video-background"
            />,
          `,
                        }}
                      ></div>
                    )}
                    <div
                      className="disImage"
                      dangerouslySetInnerHTML={{
                        __html: singleData.productDetails,
                      }}
                    />
                  </div>
                )}

                {/* Trust Badges */}
                <div className="trust-badges mt-3 mb-3">
                  <div className="d-flex justify-content-around">
                    <div className="text-center">
                      <i
                        className="fas fa-check-circle mb-2"
                        style={{ color: "#4BB550", fontSize: "24px" }}
                      ></i>
                      <div>Genuine Product</div>
                    </div>
                    <div className="text-center">
                      <i
                        className="fas fa-shield-alt mb-2"
                        style={{ color: "#4BB550", fontSize: "24px" }}
                      ></i>
                      <div>Quality Checked</div>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="pt-2 pb-2 position-sticky bottom-0">
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      className="btn primary d-flex justify-content-between align-items-center ripple animated w-100"
                      style={{
                        padding: "12px 20px",
                        borderRadius: "15px",
                        background: process.env.REACT_APP_THEAM_COLOR,
                        borderColor: process.env.REACT_APP_THEAM_COLOR,
                      }}
                      variant="dark"
                      onClick={(e) => {
                        if (cartProducts?.find((o) => o._id == id)) {
                          navigate("/cart");
                        } else {
                          handleSetCartProducts([
                            ...cartProducts,
                            { ...singleData, quantity: 1, selectSize },
                          ]);
                          e?.target?.classList?.add("bounceIn");
                          setTimeout(() => {
                            if (e?.target?.classList?.contains("bounceIn"))
                              e?.target?.classList?.remove("bounceIn");
                          }, 1000);
                          navigate("/cart");
                        }
                      }}
                    >
                      {singleData?.price &&
                        (singleData?.discount ? (
                          <p style={{ textAlign: "center" }} className="mb-0">
                            <span
                              style={{
                                color: "white",
                              }}
                            >
                              {" "}
                              ₹
                              <span
                                style={{
                                  color: "white",
                                  textDecoration: "line-through",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                }}
                              >
                                {singleData?.price}
                              </span>
                            </span>
                            <span
                              style={{
                                fontWeight: 700,
                                color: "white",
                                fontSize: "15px",
                                marginLeft: "5px",
                              }}
                            >
                              ₹{" "}
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: "white",
                                  fontSize: "25px",
                                }}
                              >
                                {singleData.discount.toFixed(0)}
                              </span>{" "}
                            </span>
                            <span
                              style={{
                                color: "green",
                                marginLeft: "5px",
                                fontWeight: "bold",
                              }}
                            >{`${(
                              ((singleData?.price - singleData.discount) /
                                singleData?.price) *
                              100
                            ).toFixed(0)}% OFF`}</span>
                          </p>
                        ) : (
                          <p style={{ textAlign: "left" }} className="mb-0">
                            {singleData.price}
                          </p>
                        ))}
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="me-2"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path
                              fill="#ffffff"
                              stroke="#ffffff"
                              d="M4.012 20.718L5.246 7.314H7.27v1.763a.733.733 0 101.466 0V7.314h6.528v1.763a.733.733 0 001.466 0V7.314h2.024l1.234 13.404H4.012zM12 3.282c1.56 0 2.865 1.1 3.187 2.565H8.813A3.268 3.268 0 0112 3.282zm8.15 3.228a.733.733 0 00-.73-.663h-2.747A4.734 4.734 0 0012 1.816a4.734 4.734 0 00-4.673 4.03H4.58a.733.733 0 00-.73.664L2.475 21.38a.734.733 0 00.73.804h17.59a.733.733 0 00.73-.803L20.15 6.51z"
                            ></path>
                            <path d="M0 0h24v24H0z" opacity="0.05"></path>
                          </g>
                        </svg>
                        {cartProducts?.find((o) => o._id == id)?._id ? (
                          "GO TO CART"
                        ) : (
                          <span style={{ fontWeight: "bold" }}>ADD TO CART</span>
                        )}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>

            {/* Related Products Section */}
            <div className="mt-4 pb-4">
              <h6 className="card-title text-start fw-bold" style={{
                padding: '3px 0',
                fontSize: '16px'
              }}>
                Related Products
              </h6>
              <Row
                xs={2}
                md={2}
                className="g-0 mt-2 d-flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden"
                style={{
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                {reletedProduct.map(
                  (item) => item._id != id && <ProductCard key={item._id} item={item} />
                )}
              </Row>
            </div>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default SingleProduct;