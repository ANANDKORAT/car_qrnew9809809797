import "./index.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const {
    whiteListProducts,
    handleSetWhiteListProducts,
    cartProducts,
    handleSetCartProducts,
  } = useAuth();

  const handleRedirect = (id) => {
    navigate(`/single-product/${id}`);
  };

  return (
    <Container>
      <Row xs={2} md={2} className="g-2 mt-2">
        {whiteListProducts?.length > 0 ? (
          whiteListProducts.map((item) => (
            <Col key={item._id}>
              <Card
                style={{ height: "100%" }}
                onClick={() => handleRedirect(item._id)}
              >
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={item.images[0]}
                    style={{ maxHeight: "250px" }}
                  />
                  <span className="rating_box">
                    {item.rating}{" "}
                    <i className="fa-solid fa-star" color="green"></i>
                  </span>
                  <div
                    className="product-delete-box"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetWhiteListProducts(item);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Subtitle
                      style={{ textAlign: "left" }}
                      className="mb-0"
                    >
                      {item.title}
                    </Card.Subtitle>
                  </div>
                  <Card.Text
                    style={{
                      textAlign: "left",
                      color: "#8d8d8d",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className="mb-0"
                  >
                    {item.description}
                  </Card.Text>
                  <Card.Text
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                    className="mb-0"
                  >
                    <span>
                      {" "}
                      ₹
                      {(
                        item.price -
                        (item.price / 100) * item.discount
                      ).toFixed(0)}{" "}
                    </span>{" "}
                    <span
                      style={{
                        color: "#8d8d8d",
                        marginLeft: "5px",
                        textDecoration: "line-through",
                      }}
                    >
                      {" "}
                      ₹{item.price}{" "}
                    </span>{" "}
                    <span
                      style={{ color: "#ff4e4e", marginLeft: "5px" }}
                    >{`(${item.discount})% OFF`}</span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetCartProducts([
                      ...cartProducts,
                      { ...item, quantity: 1, selectSize: "M" },
                    ]);
                    handleSetWhiteListProducts(item);
                  }}
                  style={{
                    background: "none",
                    padding: "12px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: "#ff3f6c",
                    borderTop: "1px dotted #d3d3d3",
                  }}
                >
                  <span>MOVE TO CART</span>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <div
            style={{
              boxShadow: "1px 1px 11px 1px #ddd",
              padding: "10px",
              borderRadius: "15px",
              width: "100%",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <i
                className="fas fa-heart-broken mb-3"
                style={{ fontSize: "60px", color: "#ed143d" }}
              ></i>
            </div>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Your Wishlist is empty !!
            </h2>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Wishlist;
