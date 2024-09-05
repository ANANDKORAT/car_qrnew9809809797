import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Card, Button, CardSubtitle } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import './index.css'
import assured from "../../assets/assuredflipcart.jpg";


const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { whiteListProducts, handleSetWhiteListProducts, setSingleProduct } = useAuth();
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [randomRatingCount, setRandomRatingCount] = useState(0);


  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageWidth(img.width);
      setImageHeight(img.height);
    };
    img.src = item?.images[0] ?? ""; // Update with your image URL
  }, [item?.images[0]]);

  const handleRedirect = (id) => {
    navigate(`/single-product/${id}`);
  };

  const imageStyle = {
    width: "100%",
  };

  useEffect(() => {
    const generateRandomRating = () => {
      const min = 100; 
      const max = 5000; 
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    setRandomRatingCount(generateRandomRating());
  }, []);

  if (imageWidth && imageHeight) {
    const aspectRatio = imageWidth / imageHeight;
    let splitValue = aspectRatio.toString().split('.');
    if (splitValue && splitValue.length > 0) {
      if (splitValue.length > 1) {
        splitValue = `${splitValue[0]}.${splitValue[1].charAt(0)}`
      } else {
        splitValue = splitValue[0]
      }
    }
    splitValue = +splitValue;

    if (splitValue > 1) { // Landscape image
      imageStyle.height = "auto"; // Maintain aspect ratio
    } else { // Portrait or square image
      if (splitValue <= 1 && splitValue >= 0.8 && window.innerWidth < 455) {
        imageStyle.height = 'auto';
        imageStyle.width = '100%';
      } else {
        imageStyle.height = '100%';
        imageStyle.width = 'auto';
      }
    }
  }


  return (
    <>
      <Col
        key={item._id}
        style={{ maxHeight: "400px" }}
      >
        <Card
          style={{ height: "100%", borderRadius: 2 }}
          onClick={() => {
            setSingleProduct(item);
            handleRedirect(item._id);
          }}
        >
          <div className="position-relative" style={{ height: 'calc(100% - 170px)', textAlign: 'center', display: 'flex',
            alignItems: 'center',
            justifyContent: 'center' }} ref={containerRef}>
            <Card.Img variant="top" src={item?.images[0] ?? ""} style={imageStyle} />
          </div>
          <Card.Body className="p-2 pb-0">
            <div className="d-flex justify-content-between align-items-center">
              <Card.Subtitle
                style={{
                  textAlign: "left",
                  color: "#262626",
                  fontWeight: "500",
                  fontSize: "14px"
                }}
                className="mb-0 text-ellips"
              >
                {item.title}
              </Card.Subtitle>
              <div
                className="ms-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSetWhiteListProducts(item);
                }}
              >
                {whiteListProducts?.find((o) => o._id === item._id) ? (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g fill="#ed143d" transform="translate(1.000000, 2.000000)">
                        <path d="M11.02835,19.276575 L10.972,19.276575 C10.6304,19.276575 10.2965,19.137625 10.05605,18.895075 L2.71865,11.513925 C1.53495,10.323225 0.88325,8.735275 0.88325,7.042675 C0.88325,5.350075 1.53495,3.762475 2.71865,2.571775 C3.9034,1.379675 5.48435,0.723425 7.1703,0.723425 C8.5759,0.723425 9.90905,1.179825 11,2.022625 C12.0913,1.179825 13.4241,0.723425 14.8297,0.723425 C16.516,0.723425 18.09695,1.379675 19.2817,2.572125 C20.46505,3.762475 21.11675,5.350075 21.11675,7.042675 C21.11675,8.735625 20.46505,10.323225 19.2817,11.513925 L11.94325,18.895775 C11.6993,19.141475 11.3745,19.276575 11.02835,19.276575 L11.02835,19.276575 Z"></path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24">
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
              </div>
            </div>
            <Card.Text className="mb-0" style={{ lineHeight: "18px" }}>
              <span style={{ color: "#388e3c", fontSize: "14px", fontWeight: "500", marginTop: "2px" }}>{`${(
                ((item?.price - item.discount) / item?.price) *
                100
              ).toFixed(0)}% OFF`}</span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#9A9A9A",
                  marginLeft: "5px",
                  textDecoration: "line-through",
                }}
              >
                ₹{item.price}
              </span>
            </Card.Text>
            <Card.Text
              style={{
                textAlign: "left",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#000"
              }}
              className="mb-0"
            >
              <span>₹{item.discount}</span>
              {(process.env.REACT_APP_FLIPASSURED_IMAGE === "yes") ? (<img src={assured} width="60" style={{ marginLeft: "10px" }} />) : ""}
              
            </Card.Text>
            <Card.Text className="mb-0">
              <span className="rating_box_des">
                {item.rating}
                <i className="fa-solid fa-star" color="red"></i>
              </span>
              <span className="rating_num">{randomRatingCount}  Ratings</span>
            </Card.Text>
            <Card.Text>
              <div className="delivery-txt">Limited time deal</div>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="px-2 py-0 bg-white border-0 pt-0">
            <Button
              className="w-100"
              variant="dark"
              style={{
                backgroundColor: "#fb641b",
                border: "none"
              }}
            >
              Add To Cart
            </Button>
          </Card.Footer>
          <Card.Text className="mt-0">
            <div className="free-delivery-txt">Free Delivery in Two Days</div>
          </Card.Text>
        </Card>
      </Col>
    </>
  );
};

export default ProductCard;
