import React, { useEffect, useState } from "react";
import "./index.css";
import { Col, Container, Row, Image, Card, Button } from "react-bootstrap";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import SkeletonLoader from "../SkeletonLoader";
import ProductCard from "../ProductCard";

const SingleProduct = () => {
  const { id } = useParams();
  const [selectSize, setSelectSize] = useState("M");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [pinCode, setPinCode] = useState("");
  const handlePinCodeChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPinCode(value);
    }
  };
  const isPinCodeValid = pinCode.length === 6;
  const {
    handleSetCartProducts,
    cartProducts,
    whiteListProducts,
    setSingleProduct,
    singleProduct,
  } = useAuth();

  // useEffect(() => {
  //   const selectProduct = singleData.find((o) => o._id == id);
  //   setSingleProduct(selectProduct);
  // }, [id]);

  const [singleData, setSingleData] = useState(singleProduct);

  const [reletedProduct, setReletedProduct] = useState([]);

  const handleRedirect = (id) => {
    navigate(`/single-product/${id}`);
  };

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    origin: "center",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 1,
    },
  });

  useEffect(() => {
    if (singleProduct._id !== id) {
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
      <Container>
        {isLoading ? (
          <Col className="d-flex justify-content-center">
            <SkeletonLoader isSinglePage />
          </Col>
        ) : (
          <Row>
            <div className="position-relative p-0 m-0  ">
              {singleData?.images && (
                <div ref={sliderRef} className="keen-slider mt-1">
                  {singleData?.images?.map((item) => (
                    <div className="keen-slider__slide number-slide1 center">
                      {process.env.REACT_APP_themssizetype === "Portrait" ? (
                        <img
                          src={item}
                          rounded
                          style={{
                            maxHeight: "600px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={item}
                          rounded
                          style={{
                            maxHeight: "300px",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
              {singleData?.rating && (
                <span className="signle_rating_box">
                  {singleData?.rating}{" "}
                  <i className="fa-solid fa-star" color="green"></i>
                </span>
              )}
              <div>
                <div className="dots" style={{ background: "unset" }}>
                  {[...Array(singleData?.images?.length).keys()].map((idx) => {
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
              </div>
            </div>
            <div className="pb-4">
              <p
                style={{
                  color: "#282c3f",
                  textAlign: "start",
                  fontWeight: 400,
                }}
                className="mb-0"
              >
                {singleData?.description}
              </p>
              {singleData?.price &&
                (singleData?.discount ? (
                  <p style={{ textAlign: "left" }} className="mb-0">
                    <span style={{ fontWeight: 700 }}>
                      {" "}
                      ₹{singleData.discount}
                    </span>
                    <span
                      style={{
                        color: "#94969f",
                        marginLeft: "5px",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      MRP{" "}
                    </span>
                    <span
                      style={{
                        color: "#94969f",
                        marginLeft: "5px",
                        textDecoration: "line-through",
                      }}
                    >
                      {" "}
                      ₹{singleData?.price}{" "}
                    </span>{" "}
                    <span
                      style={{
                        color: "#ff4e4e",
                        marginLeft: "5px",
                      }}
                    >{`(${(
                      ((singleData?.price - singleData.discount) /
                        singleData?.price) *
                      100
                    ).toFixed(0)})% OFF`}</span>
                  </p>
                ) : (
                  <p style={{ textAlign: "left" }} className="mb-0">
                    {singleData.price}
                  </p>
                ))}
            </div>
            <div className="cardification" />
            {singleData?.size?.length > 0 && (
              <div className="mt-4 pb-4" style={{ textAlign: "start" }}>
                <p style={{ fontWeight: 600 }}>Select Size</p>
                <div className="d-flex align-items-center">
                  {singleData?.size?.map((item) => (
                    <span
                      onClick={() => setSelectSize(item)}
                      style={{
                        height: "25px",
                        width: "25px",
                        borderRadius: "50%",
                        border: "1px solid black",
                        padding: "25px",
                        background: selectSize == item ? "#252525" : "#fff",
                        color: selectSize == item ? "#fff" : "#000",
                      }}
                      className="d-flex justify-content-center align-items-center mx-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="cardification" />
            <div className="mt-4 pb-4">
              <h6 className="card-title text-start fw-bold">
                CHECK DELIVERY &amp; SERVICES
              </h6>
              <div>
                <div className="address-box pincode-input my-3">
                  <input
                    type="number"
                    placeholder="Enter a PIN code"
                    value={pinCode}
                    onChange={handlePinCodeChange}
                  />

                  <button
                    type="submit"
                    className="address-button"
                    style={{
                      color: isPinCodeValid
                        ? "rgb(0, 179, 0)"
                        : "rgb(191, 192, 198)",
                    }}
                  >
                    {isPinCodeValid ? "available" : "CHECK"}
                  </button>
                </div>
              </div>
              <ul
                className="mt-2 text-start fs-6 list-unstyled"
                style={{ color: "#424553" }}
              >
                {isPinCodeValid ? (
                  <>
                    <li style={{ color: "rgb(0, 179, 0)", fontWeight: "bold" }}>
                      {" "}
                      2 Day Guaranteed Open Delivery available
                    </li>
                  </>
                ) : (
                  ""
                )}
                <br />
                <li>Pay on delivery might be available</li>
                <li>Easy 14 days returns and exchanges</li>
                <li>Try &amp; Buy might be available</li>
              </ul>
            </div>
            <div className="cardification" />
            {singleData.productDetails && (
              <div className="mt-4 pb-4">
                <h6 className="card-title text-start fw-bold mb-3">
                  Product Details
                </h6>
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleData.productDetails,
                  }}
                />
              </div>
            )}
            <div className="cardification" />
            <div className="mt-4 pb-4">
              <div className="image-banner-table">
                <div className="image-banner-item">
                  <svg viewBox="0 0 30 30" className="image-banner-image">
                    <defs>
                      <path
                        id="trust_original_svg__a"
                        d="M.535.099h23.547v23.33H.535z"
                      ></path>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(2.885 3.473)">
                        <path
                          fill="#3E4152"
                          d="M12.31 1.242c-1.406 0-2.813.281-4.146.842a10.495 10.495 0 00-5.696 5.74 10.36 10.36 0 00.071 8.049 10.501 10.501 0 005.795 5.64 10.643 10.643 0 008.126-.07c5.388-2.265 7.912-8.45 5.624-13.788a10.496 10.496 0 00-5.795-5.641 10.697 10.697 0 00-3.979-.772m.003 22.187a11.86 11.86 0 01-4.41-.856 11.645 11.645 0 01-6.426-6.254 11.48 11.48 0 01-.078-8.923 11.633 11.633 0 016.313-6.364 11.796 11.796 0 019.01-.078 11.642 11.642 0 016.425 6.254c2.535 5.918-.262 12.776-6.236 15.287a11.84 11.84 0 01-4.598.934"
                          mask="url(#trust_original_svg__b)"
                        ></path>
                      </g>
                      <path
                        fill="#3E4152"
                        d="M17.881 22.57a.569.569 0 01-.031-1.036c.187-.093.379-.18.573-.26a.579.579 0 01.752.314.568.568 0 01-.315.745 6.788 6.788 0 00-.492.222.583.583 0 01-.487.015zM11.533 9.194a.57.57 0 01-.032-1.036c.188-.093.38-.18.575-.259a.58.58 0 01.752.313.57.57 0 01-.317.745 7.29 7.29 0 00-.491.222.58.58 0 01-.487.015zm3.022-.752a.575.575 0 01-.574-.523.573.573 0 01.525-.618c.212-.018.422-.028.631-.029h.004c.317 0 .575.253.577.567a.574.574 0 01-.573.576 6.838 6.838 0 00-.59.027zM18 8.958a.578.578 0 01-.217-.042 7.18 7.18 0 00-.51-.182.57.57 0 01-.374-.717c.096-.3.42-.468.724-.372.2.063.399.134.593.212A.57.57 0 0118 8.958zm2.433 1.581a.578.578 0 01-.404-.164 6.582 6.582 0 00-.4-.36.567.567 0 01-.071-.805.58.58 0 01.813-.07c.16.134.316.274.467.42.227.222.23.583.006.809a.578.578 0 01-.41.17zm-10.947.507a.577.577 0 01-.371-.135.568.568 0 01-.07-.805c.136-.16.277-.313.425-.462a.58.58 0 01.816-.005.567.567 0 01.006.808 6.8 6.8 0 00-.364.396.58.58 0 01-.442.203zm12.582 1.879a.578.578 0 01-.53-.345c0-.003-.002-.006-.004-.01a6.664 6.664 0 00-.227-.479.57.57 0 01.246-.77.58.58 0 01.778.244 7.687 7.687 0 01.284.608.57.57 0 01-.547.752zm-13.984.647a.57.57 0 01-.55-.745c.064-.198.135-.394.214-.587a.578.578 0 01.75-.315.57.57 0 01.32.744 6.61 6.61 0 00-.184.504.578.578 0 01-.55.4zm14.577 2.175a.574.574 0 01-.577-.566 6.649 6.649 0 00-.026-.535.573.573 0 01.525-.619.567.567 0 01.625.52c.018.208.028.416.03.624a.574.574 0 01-.572.576h-.005zm-14.903.69a.574.574 0 01-.574-.524 7.788 7.788 0 01-.029-.624.575.575 0 01.574-.575h.003c.317 0 .575.254.577.568.001.179.01.357.024.535a.573.573 0 01-.575.62zm14.356 2.142a.57.57 0 01-.535-.786 6.61 6.61 0 00.184-.504.579.579 0 01.724-.372.57.57 0 01.376.718 8.492 8.492 0 01-.214.587.578.578 0 01-.535.357zm-13.545.627a.577.577 0 01-.513-.31 7.984 7.984 0 01-.26-.548.576.576 0 111.063-.445c.068.16.143.316.223.47a.568.568 0 01-.25.77.58.58 0 01-.263.063zm11.95 1.784a.576.576 0 01-.405-.164.568.568 0 01-.007-.808c.127-.127.248-.26.363-.396a.582.582 0 01.813-.07.568.568 0 01.072.804c-.136.16-.277.314-.425.463a.575.575 0 01-.412.171zm-10.135.47a.579.579 0 01-.372-.135 7.846 7.846 0 01-.465-.422.567.567 0 01-.006-.808.58.58 0 01.816-.005c.129.126.261.246.399.36a.568.568 0 01.07.806.58.58 0 01-.442.203zm2.55 1.391a.591.591 0 01-.177-.027 8.381 8.381 0 01-.592-.213.57.57 0 01-.317-.744.58.58 0 01.752-.314c.167.067.337.128.51.182a.57.57 0 01-.177 1.116zm2.307.35a.574.574 0 01-.577-.568.575.575 0 01.573-.575c.18 0 .36-.009.54-.024a.571.571 0 11.097 1.139c-.21.017-.42.027-.63.028h-.003z"
                      ></path>
                      <path
                        fill="#FFF"
                        stroke="#3E4152"
                        d="M0 17.61L26.618 6.42l-.38 4.174 3.296 2.63-26.618 11.19.452-4.205z"
                      ></path>
                      <path
                        fill="#FF3F6C"
                        d="M6.129 18.078c-.507.214-.635.754-.36 1.397.276.642.757.927 1.263.714.512-.215.64-.756.364-1.399-.274-.642-.761-.925-1.267-.712m1.1 2.58c-.842.354-1.65-.03-2.038-.936-.39-.91-.105-1.757.741-2.113.85-.357 1.65.03 2.038.936.389.905.11 1.756-.741 2.113m1.694-3.708l-.314.13.4.932.286-.12c.354-.148.501-.407.37-.713-.126-.293-.386-.38-.742-.23zm1.781 2.217l-1.267-.827-.24.1.48 1.124-.566.238-1.258-2.936.92-.386c.66-.278 1.193-.135 1.437.435.185.43.068.795-.247 1.078l1.297.815-.556.359zm.974-.445l-1.257-2.935.571-.24 1.257 2.935zm2.579-1.019c-.94.396-1.719 0-2.106-.906-.39-.91-.11-1.756.792-2.135a1.85 1.85 0 011.002-.146l.143.557a1.52 1.52 0 00-.935.067c-.58.244-.693.784-.424 1.41.269.629.748.92 1.345.668a1.07 1.07 0 00.447-.329l-.278-.65-.602.252-.261-.422 1.19-.5.6 1.4a2.098 2.098 0 01-.913.734m1.616-.744l-1.258-2.935.572-.24 1.257 2.935zm3.139-1.319l-2.262-1.434.866 2.02-.528.222-1.258-2.935.537-.226 2.155 1.364-.823-1.924.528-.221 1.257 2.934zm1.343-1.987l.806-.339-.885-.967.079 1.306zm-.619-1.797l.606-.255 2.319 2.419-.528.342-.615-.655-1.121.471.062.853-.572.24-.15-3.415zm3.358 2.067l-1.258-2.935.571-.24 1.043 2.433.988-.416.292.47z"
                      ></path>
                    </g>
                  </svg>
                  <div className="image-banner-text">Genuine Products</div>
                </div>
                <div className="image-banner-item">
                  <svg viewBox="0 0 30 30" className="image-banner-image">
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="#FF3F6C"
                        d="M14.853 15.402a4.114 4.114 0 01-4.109-4.109 4.114 4.114 0 014.11-4.108 4.114 4.114 0 014.108 4.108 4.114 4.114 0 01-4.109 4.11m0-9.318a5.215 5.215 0 00-5.209 5.208 5.215 5.215 0 005.21 5.21 5.215 5.215 0 005.208-5.21 5.215 5.215 0 00-5.209-5.208m1.819 3.117l-3.21 2.99-.813-.842a.55.55 0 10-.792.764l1.187 1.231a.546.546 0 00.77.021l3.607-3.36a.55.55 0 10-.75-.804"
                      ></path>
                      <path
                        fill="#3E4152"
                        d="M21.966 12.413a.929.929 0 00-.38 1.405c.287.387.315.903.07 1.315a1.295 1.295 0 01-1.221.608.944.944 0 00-.758.263.921.921 0 00-.275.761c.049.468-.175.896-.602 1.145-.355.208-.907.307-1.391-.035a.94.94 0 00-.789-.144.936.936 0 00-.617.516c-.238.522-.75.708-1.15.708h-.001c-.4 0-.911-.186-1.149-.709a.937.937 0 00-.859-.547.945.945 0 00-.546.174 1.31 1.31 0 01-1.376.07 1.212 1.212 0 01-.618-1.177.924.924 0 00-.274-.762.95.95 0 00-.757-.264c-.598.059-1.02-.296-1.22-.648a1.142 1.142 0 01.067-1.275.932.932 0 00-.38-1.404 1.177 1.177 0 01-.715-1.11c0-.5.267-.916.715-1.112a.928.928 0 00.38-1.405 1.141 1.141 0 01-.067-1.273c.2-.354.629-.707 1.219-.65a.94.94 0 00.758-.263.92.92 0 00.274-.761c-.05-.475.192-.938.618-1.178a1.31 1.31 0 011.377.07.947.947 0 001.405-.374c.237-.521.749-.707 1.148-.707.4 0 .913.185 1.151.708a.944.944 0 001.405.373c.485-.345 1.037-.245 1.392-.037.427.25.651.677.602 1.144-.03.283.07.56.276.763.2.196.473.29.755.263.487-.052.98.194 1.224.607a1.19 1.19 0 01-.071 1.316.931.931 0 00.38 1.404c.447.196.715.612.715 1.111 0 .5-.268.915-.715 1.111zm-1.143 10.932l-1.73-.546a.55.55 0 00-.645.256l-.84 1.5-1.854-4.67a2.277 2.277 0 001.167-1.017 2.387 2.387 0 002.162.128l1.74 4.35zm-8.757 1.21l-.84-1.5a.551.551 0 00-.645-.256l-1.73.546L10.589 19a2.395 2.395 0 002.196-.132c.256.462.658.81 1.14 1.007l-1.86 4.68zM23.78 11.302a2.28 2.28 0 00-1.196-2.032c.44-.718.453-1.624.02-2.358a2.365 2.365 0 00-2.097-1.154c.016-.822-.413-1.58-1.152-2.013a2.397 2.397 0 00-2.435-.009C16.511 3 15.735 2.55 14.852 2.55s-1.659.45-2.067 1.186a2.397 2.397 0 00-2.404-.033 2.314 2.314 0 00-1.183 2.055A2.409 2.409 0 007.096 6.97a2.242 2.242 0 00.025 2.302 2.278 2.278 0 00-1.196 2.031c0 .869.454 1.63 1.196 2.031a2.24 2.24 0 00-.024 2.303 2.39 2.39 0 002.1 1.21 2.3 2.3 0 00.488 1.454l-2.287 5.715a.549.549 0 00.676.73l2.41-.762L11.67 26.1a.55.55 0 00.48.281l.037-.001a.551.551 0 00.474-.346l2.176-5.479 2.176 5.48a.551.551 0 00.475.345l.036.001a.55.55 0 00.48-.281l1.185-2.118 2.41.761a.549.549 0 10.676-.729l-2.28-5.703c.337-.411.524-.924.513-1.465a2.389 2.389 0 002.096-1.154 2.286 2.286 0 00-.019-2.36 2.278 2.278 0 001.196-2.03z"
                      ></path>
                    </g>
                  </svg>
                  <div className="image-banner-text">7 Step Quality Check</div>
                </div>
                <div className="image-banner-item">
                  <svg viewBox="0 0 30 30" className="image-banner-image">
                    <defs>
                      <path
                        id="trust_secure_svg__a"
                        d="M0 .327h18.705V23H0z"
                      ></path>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(6 3)">
                        <path
                          fill="#3E4152"
                          d="M1.118 4.6c.026 5.218 1.258 9.559 3.664 12.91 1.2 1.67 2.736 3.104 4.571 4.27a16.585 16.585 0 004.572-4.273c2.405-3.32 3.636-7.661 3.662-12.907a23.754 23.754 0 01-3.857-1.07c-1.33-.488-2.802-1.163-4.377-2.006-1.561.835-3.037 1.51-4.39 2.006A23.732 23.732 0 011.118 4.6zM9.353 23a.555.555 0 01-.29-.081c-2.093-1.274-3.838-2.874-5.188-4.754C1.256 14.517-.047 9.793 0 4.122a.56.56 0 01.47-.549 21.956 21.956 0 004.11-1.096C5.959 1.97 7.475 1.269 9.087.394a.555.555 0 01.531 0c1.629.884 3.142 1.585 4.496 2.083 1.394.511 2.78.88 4.12 1.096a.56.56 0 01.47.549c.048 5.702-1.255 10.428-3.875 14.045-1.37 1.892-3.116 3.49-5.187 4.752a.554.554 0 01-.289.08z"
                          mask="url(#trust_secure_svg__b)"
                        ></path>
                      </g>
                      <path
                        fill="#FF3F6C"
                        d="M17.584 13h-.46a2.719 2.719 0 00-.384-1h.844c.23 0 .416-.224.416-.5s-.187-.5-.416-.5h-4.168c-.23 0-.416.224-.416.5s.187.5.416.5h1.668c.542 0 1 .42 1.173 1h-2.84c-.23 0-.417.224-.417.5s.187.5.416.5h2.84c-.172.581-.63 1-1.172 1h-1.668a.363.363 0 00-.159.038.47.47 0 00-.225.271.589.589 0 000 .382.48.48 0 00.091.163l3.332 4a.383.383 0 00.295.146.39.39 0 00.295-.146.575.575 0 000-.707L14.423 16h.66c1.007 0 1.848-.86 2.041-2h.46c.23 0 .416-.224.416-.5s-.187-.5-.416-.5"
                      ></path>
                    </g>
                  </svg>
                  <div className="image-banner-text">Secure Payments</div>
                </div>
              </div>
            </div>
            <div className="cardification" />
            <div className="pt-4 pb-4 position-sticky bottom-0 bg-white">
              <div className="d-flex justify-content-center align-items-center">
                {/* <Button
                  className="btn default d-flex justify-content-center align-items-center ripple"
                  variant="outline-dark"
                  style={{ width: "40%", padding: "10px" }}
                  onClick={() => navigate("/wishlist")}
                >
                  {whiteListProducts?.find((o) => o._id === singleData._id) ? (
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          fill="#ed143d"
                          transform="translate(1.000000, 2.000000)"
                        >
                          <path d="M11.02835,19.276575 L10.972,19.276575 C10.6304,19.276575 10.2965,19.137625 10.05605,18.895075 L2.71865,11.513925 C1.53495,10.323225 0.88325,8.735275 0.88325,7.042675 C0.88325,5.350075 1.53495,3.762475 2.71865,2.571775 C3.9034,1.379675 5.48435,0.723425 7.1703,0.723425 C8.5759,0.723425 9.90905,1.179825 11,2.022625 C12.0913,1.179825 13.4241,0.723425 14.8297,0.723425 C16.516,0.723425 18.09695,1.379675 19.2817,2.572125 C20.46505,3.762475 21.11675,5.350075 21.11675,7.042675 C21.11675,8.735625 20.46505,10.323225 19.2817,11.513925 L11.94325,18.895775 C11.6993,19.141475 11.3745,19.276575 11.02835,19.276575 L11.02835,19.276575 Z"></path>
                        </g>
                      </g>
                    </svg>
                  ) : (
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
                  )}
                  WISHLIST
                </Button> */}
                <Button
                  className="btn primary d-flex justify-content-between align-items-center ripple animated w-100"
                  style={{
                    padding: "10px 22px",
                    borderRadius: "15px",
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
                  <span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#94969f",
                      }}
                    >
                      Inclusive of all Taxes
                    </span>
                    {singleData?.price &&
                      (singleData?.discount ? (
                        <p style={{ textAlign: "left" }} className="mb-0">
                          <span style={{ fontWeight: 700 }}>
                            {" "}
                            ₹{singleData.discount.toFixed(0)}{" "}
                          </span>
                          <span
                            style={{
                              color: "#10c873",
                              marginLeft: "5px",
                            }}
                          >{`(${(
                            ((singleData?.price - singleData.discount) /
                              singleData?.price) *
                            100
                          ).toFixed(0)})% OFF`}</span>
                        </p>
                      ) : (
                        <p style={{ textAlign: "left" }} className="mb-0">
                          {singleData.price}
                        </p>
                      ))}
                  </span>
                  <span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="me-2"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path
                          fill="#ffffff"
                          d="M4.012 20.718L5.246 7.314H7.27v1.763a.733.733 0 101.466 0V7.314h6.528v1.763a.733.733 0 001.466 0V7.314h2.024l1.234 13.404H4.012zM12 3.282c1.56 0 2.865 1.1 3.187 2.565H8.813A3.268 3.268 0 0112 3.282zm8.15 3.228a.733.733 0 00-.73-.663h-2.747A4.734 4.734 0 0012 1.816a4.734 4.734 0 00-4.673 4.03H4.58a.733.733 0 00-.73.664L2.475 21.38a.734.734 0 00.73.804h17.59a.733.733 0 00.73-.803L20.15 6.51z"
                        ></path>
                        <path d="M0 0h24v24H0z" opacity="0.05"></path>
                      </g>
                    </svg>
                    {cartProducts?.find((o) => o._id == id)?._id
                      ? "GO TO BAG"
                      : "ADD TO BAG"}
                  </span>
                </Button>
              </div>
            </div>
            <div className="cardification" />
            <div className="mt-4 pb-4">
              <h6 className="card-title text-start fw-bold">
                Related Products
              </h6>
              <Row
                xs={2}
                md={2}
                className="g-3 mt-2 d-flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden category-box"
              >
                {reletedProduct.map(
                  (item) => item._id != id && <ProductCard item={item} />
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
