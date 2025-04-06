import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";
import assured from "../../assets/assuredflipcart.jpg";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { 
    whiteListProducts, 
    handleSetWhiteListProducts, 
    setSingleProduct
  } = useAuth();

  // Memoized calculations for performance
  const isWishlisted = useMemo(() => whiteListProducts?.some(p => p._id === item._id), [whiteListProducts, item._id]);
  const discountPercentage = useMemo(() => Math.round(((item.price - item.discount) / item.price) * 100), [item]);

  const handleRedirect = () => {
    setSingleProduct(item);
    navigate(`/single-product/${item._id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    handleSetWhiteListProducts(item);
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full-star">★</span>);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half-star">★</span>);
    }
    
    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty-star">★</span>);
    }
    
    return stars;
  };

  return (
    <Col xs={6} sm={6} md={6} lg={6} xl={6} className="mb-0 px-0.25">
      <Card className="h-100 product-card" onClick={handleRedirect}>
        {/* Image Container */}
        <div className="product-image-container">
          <Card.Img
            variant="top"
            src={item?.images?.[0] ?? ""}
            alt={item?.title}
            loading="lazy"
            className="product-image"
          />
          
          {/* Wishlist Button */}
          <button 
            className="wishlist-button"
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? (
              <HeartIcon filled />
            ) : (
              <HeartIcon />
            )}
          </button>
        </div>

         {/* Product Details */}
         <Card.Body className="p-2 d-flex flex-column">
          {/* Updated Product Title - shows full title in one line with ellipsis */}
          <div className="product-title">
            {item.title}
          </div>

          {/* Price Section - Flipkart Style */}
          <div className="price-section">
            <div className="discount-percentage">
              <svg width="14" height="14" viewBox="0 0 12 12" fill="#4BB550">
                <path d="M6.73461 1V8.46236L9.5535 5.63352L10.5876 6.65767L5.99384 11.2415L1.41003 6.65767L2.42424 5.63352L5.25307 8.46236V1H6.73461Z" />
              </svg>
              <span>{discountPercentage}% off</span>
            </div>
            <div className="d-flex align-items-center flex-wrap">
              <span className="original-price">₹{item.price}</span>
              <span className="discounted-price">₹{item.discount}</span>
            </div>
          </div>

          {/* Deal Tag */}
          {discountPercentage > 50 && (
            <div className="deal-tag">
              Hot Deal
            </div>
          )}

          {/* Rating Section and Flipkart Assured in one line */}
          <div className="d-flex align-items-center justify-content-between mt-1">
            <div className="rating-section">
              <div className="star-ratings">
                {renderStars(item.rating || 0)}
              </div>
              <span className="rating-count">
                ({Math.floor(Math.random() * 4901) + 100})
              </span>
            </div>
            
            {process.env.REACT_APP_FLIPASSURED_IMAGE !== 'no' && (
              <img 
                src={assured}
                alt="Flip Assured"
                className="assured-image"
                height="13"
              />
            )}
          </div>

          {/* Delivery Info */}
          <div className="delivery-info">
            Free delivery
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

// HeartIcon component
const HeartIcon = ({ filled = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#ed143d" : "#3E4152"}>
    <path d={
      filled 
        ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        : "M16.5,3c-1.74,0-3.41,0.81-4.5,2.09C10.91,3.81,9.24,3,7.5,3C4.42,3,2,5.42,2,8.5c0,3.78,3.4,6.86,8.55,11.54L12,21.35l1.45-1.32C18.6,15.36,22,12.28,22,8.5C22,5.42,19.58,3,16.5,3z"
    }/>
  </svg>
);

export default ProductCard;