import { useEffect, useState } from "react";
import "./index.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import safetyImg from "../../assets/safety-image.jpg";

const Cart = () => {
  const {
    cartProducts,
    handleSetCartProducts,
    totalPrice,
    totalDiscount,
    totalMRP,
    selectedProduct,
    handleSelectProduct,
    setSelectedProduct,
    setStep,
    themColor,
    totalExtraDiscount
  } = useAuth();
  const [showOffCanvas, setShowOffCanvas] = useState({
    show: false,
    size: false,
    product: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (cartProducts?.length > 0) {
      setSelectedProduct(cartProducts);
    }
  }, [cartProducts]);

  return (
    <Container className="h-100 d-flex flex-column justify-content-between">
      <div>
        {cartProducts?.length === 0 && (
          <Row>
            <Col>
              <div
                style={{
                  boxShadow: "1px 1px 11px 1px #ddd",
                  padding: "10px",
                  marginTop: "20px",
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="50"
                    height="50"
                  >
                    <path d="M21,6H18A6,6,0,0,0,6,6H3A3,3,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A3,3,0,0,0,21,6ZM12,2a4,4,0,0,1,4,4H8A4,4,0,0,1,12,2ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A1,1,0,0,1,3,8H6v2a1,1,0,0,0,2,0V8h8v2a1,1,0,0,0,2,0V8h3a1,1,0,0,1,1,1Z" />
                  </svg>
                </div>
                <h2
                  className="mt-3"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  Your cart is empty
                </h2>
                <div className="Footer__Content Rte">Let's go Buy Somthing!</div>
                <Button
                  variant="dark"
                  className="btn my-3 primary d-flex justify-content-center align-items-center ripple animated"
                  style={{
                    padding: "10px 20px",
                    background: "var(--them-color)",
                    borderColor: "var(--them-color)"
                  }}
                  onClick={(e) => {
                    e?.target?.classList?.add("bounceIn");
                    navigate(`/`);
                    setTimeout(() => {
                      if (e?.target?.classList?.contains("bounceIn"))
                        e?.target?.classList?.remove("bounceIn");
                    }, 1000);
                  }}
                >
                  Shop Now
                </Button>
              </div>
            </Col>
          </Row>
        )}
        {cartProducts?.length > 0 && (
          <Row>
            <Col
              md={12}
              xs={12}
              style={{
                fontWeight: "bold",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              {" "}
              <span style={{ fontSize: "16px" }}>
                <Form.Check
                  className="custom-check-box d-flex"
                  type={"checkbox"}
                  checked={selectedProduct?.length > 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedProduct?.length > 0) {
                      setSelectedProduct([]);
                    } else {
                      setSelectedProduct(cartProducts);
                    }
                  }}
                />
              </span>
              <span className="ms-2">{`${selectedProduct?.length || 0}/${
                cartProducts?.length || 0
              } ITEMS SELECTED`}</span>
              <span
                style={{
                  color: "#ff4e4e",
                  marginLeft: "5px",
                }}
              >
                ₹{totalPrice}
              </span>
            </Col>
          </Row>
        )}
        <Row className="g-2">
          {cartProducts?.map((item) => (
            <Col key={item._id} xs={12} md={12}>
              <Card
                className="flex-row align-items-center position-relative"
                onClick={() => {
                  navigate(`/single-product/${item._id}`);
                }}
              >
                <div
                  className="product-select-box"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectProduct(item._id);
                  }}
                >
                  <Form.Check
                    className="custom-check-box d-flex"
                    type={"checkbox"}
                    checked={selectedProduct?.find((o) => o._id === item._id)}
                  />
                </div>
                <div
                  className="product-delete-box"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedProduct?.find((o) => o._id === item._id)) {
                      handleSelectProduct(item._id);
                    }
                    const selectedItem = cartProducts.filter(
                      (o) => o._id !== item._id
                    );
                    handleSetCartProducts(selectedItem);
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
                <div
                  style={{
                    width: "250px",
                    height: "196px",
                    padding: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item?.images?.[0]}
                    style={{
                      height: "100%",
                      minWidth: "100%",
                      borderRadius: "6px",
                      objectFit:"contain"
                    }}
                  />
                </div>
                <Card.Body style={{ textAlign: "start" }}>
                  <Card.Subtitle className="text-ellips">
                    {item.title}
                  </Card.Subtitle>
                  <Card.Text className="d-flex align-items-center mt-2 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#FF3F6C"
                        d="M7.998 4c-2.674 0-5.1 1.57-6.888 4.12a.625.625 0 000 .709c1.789 2.552 4.214 4.122 6.888 4.122 2.674 0 5.099-1.57 6.888-4.12a.629.629 0 000-.709C13.096 5.57 10.672 4 7.998 4zm.192 7.627c-1.775.12-3.241-1.45-3.13-3.357.092-1.573 1.28-2.848 2.746-2.946 1.775-.12 3.24 1.45 3.13 3.357-.095 1.57-1.283 2.845-2.746 2.946zm-.09-1.456c-.955.064-1.746-.78-1.683-1.806.05-.848.69-1.533 1.48-1.588.957-.065 1.747.78 1.684 1.806-.051.85-.693 1.536-1.48 1.588z"
                      ></path>
                    </svg>
                    <span
                      className=""
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        paddingLeft: "3px",
                        color: "#282c3f",
                      }}
                    >
                      {Math.floor(Math.random() * 31) + 50}
                    </span>
                    <span
                      className=""
                      style={{
                        color: "#94969f",
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    >
                      People viewing now
                    </span>
                  </Card.Text>
                  <Card.Text className="mt-1">
                    {item?.size?.length > 0 && (
                      <div
                        className="itemComponents-base-quantity me-2"
                        onClick={(e) => {
                          e?.stopPropagation();
                          setShowOffCanvas((prev) => ({
                            show: !prev.show,
                            size: true,
                            product: item,
                          }));
                        }}
                      >
                        <span className="">Size: {item.selectSize}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="3"
                          viewBox="0 0 6 3"
                          className="itemComponents-base-dropDown"
                        >
                          <path fillRule="evenodd" d="M0 0h6L3 3z"></path>
                        </svg>
                      </div>
                    )}
                    <div
                      className="itemComponents-base-quantity"
                      onClick={(e) => {
                        e?.stopPropagation();
                        setShowOffCanvas((prev) => ({
                          show: !prev.show,
                          size: false,
                          product: item,
                        }));
                      }}
                    >
                      <span>Qty: {item.quantity}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="3"
                        viewBox="0 0 6 3"
                        className="itemComponents-base-dropDown"
                      >
                        <path fillRule="evenodd" d="M0 0h6L3 3z"></path>
                      </svg>
                    </div>
                  </Card.Text>
                  {item?.price &&
                    (item?.discount ? (
                      <Card.Text style={{ textAlign: "left" }} className="mb-0">
                        <span style={{ fontWeight: 700 }}>
                          ₹{item?.discount}
                        </span>
                        <span
                          style={{
                            color: "#8d8d8d",
                            marginLeft: "5px",
                          }}
                        >
                          MRP
                        </span>
                        <span
                          style={{
                            color: "#8d8d8d",
                            marginLeft: "5px",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{item.price}
                        </span>
                        <span
                          style={{
                            color: "#ff4e4e",
                            marginLeft: "5px",
                          }}
                        >
                          {`(${(
                            ((item?.price - item.discount) / item?.price) *
                            100
                          ).toFixed(0)})% OFF`}
                        </span>
                      </Card.Text>
                    ) : (
                      <Card.Text style={{ textAlign: "left" }} className="mb-0">
                        {item.price}
                      </Card.Text>
                    ))}
                  <Card.Text
                    style={{ textAlign: "left" }}
                    className="mb-0 mt-2"
                  >
                    <span className="me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="#03a685"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.775.227A.716.716 0 0 0 8.716.24L3.373 6.015a.09.09 0 0 1-.133 0L1.278 3.91a.716.716 0 0 0-1.059-.001.834.834 0 0 0 0 1.127l2.565 2.742c.14.15.33.223.53.223h.004a.71.71 0 0 0 .53-.23l5.939-6.416A.833.833 0 0 0 9.775.227"
                        ></path>
                      </svg>
                    </span>
                    <span className="fs-6 me-1">Delivery between</span>
                    <span className="fs-6 fw-semibold">
                      {`${new Date(
                        Date.now() + 5 * 24 * 60 * 60 * 1000
                      ).getDate()} ${new Date(
                        Date.now() + 5 * 24 * 60 * 60 * 1000
                      ).toLocaleString("default", { month: "short" })}`}{" "}
                      -{" "}
                      {`${new Date(
                        Date.now() + 8 * 24 * 60 * 60 * 1000
                      ).getDate()} ${new Date(
                        Date.now() + 8 * 24 * 60 * 60 * 1000
                      ).toLocaleString("default", { month: "short" })}`}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {cartProducts?.length > 0 && (
          <div className="mt-4">
            <div>
              <h6 className="card-title text-start fw-bold border-bottom pb-2 pt-2">{`PRICE DETAILS (${
                selectedProduct?.length === 1
                  ? "1 Item"
                  : `${selectedProduct?.length} Items`
              })`}</h6>
              <div className="mt-3">
                <div className="d-flex flex-row justify-content-between align-items-center ">
                  <span>Total MRP</span>
                  <span className="ms-2">
                    <span>
                      <span className="">₹</span>
                      {totalMRP}
                    </span>
                  </span>
                </div>
                {totalDiscount ? (
                  <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                    <span>Discount on MRP</span>
                    <span className="ms-2 text-success">
                      <span>
                        - <span className="">₹</span>
                        {totalDiscount}
                      </span>
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {(totalExtraDiscount && process.env.REACT_APP_COUPON_APPLY == 'true') ? (
                    <>
                    <div className="d-flex flex-row justify-content-between align-items-center mt-2 border-top pt-2">
                    <span>Total Price</span>
                    <span className="ms-2">
                      <span>
                        <span className="">₹</span>
                        {totalMRP - totalDiscount}
                      </span>
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center mt-2 ">
                    <span>Coupon Applied (Buy 2 Get 1 free)</span>
                    <span className="ms-2 text-success">
                      <span>
                        -<span className="">₹</span>
                        {totalExtraDiscount}
                      </span>
                    </span>
                  </div>
                  </>
                  ) : ("")
                }
                <div className="d-flex flex-row justify-content-between align-items-center mt-2 fw-bold border-top pt-3">
                  <span>Total Amount</span>
                  <span className="ms-2">
                    <span>
                      <span className="">₹</span>
                      {totalPrice}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <Offcanvas
            show={showOffCanvas.show}
            onHide={(e) => {
              e?.stopPropagation();
              setShowOffCanvas((prev) => ({
                ...prev,
                show: !prev.show,
                product: {},
              }));
            }}
            placement={"bottom"}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                Select {showOffCanvas.size ? "Size" : "Quantity"}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex align-items-center">
                {showOffCanvas.size
                  ? showOffCanvas?.product?.size?.map((item) => (
                      <span
                        onClick={(e) => {
                          e?.stopPropagation();
                          setShowOffCanvas((prev) => ({
                            ...prev,
                            product: { ...prev.product, selectSize: item },
                          }));
                        }}
                        style={{
                          height: "25px",
                          width: "25px",
                          borderRadius: "50%",
                          border: "1px solid black",
                          padding: "25px",
                          background:
                            showOffCanvas?.product?.selectSize == item
                              ? themColor
                              : "#fff",
                          color:
                            showOffCanvas?.product?.selectSize == item
                              ? "#fff"
                              : "#000",
                        }}
                        className="d-flex justify-content-center align-items-center mx-2"
                      >
                        {item}
                      </span>
                    ))
                  : Array.from({ length: 5 }, (v, k) => k + 1)?.map((item) => (
                      <span
                        onClick={(e) => {
                          e?.stopPropagation();
                          setShowOffCanvas((prev) => ({
                            ...prev,
                            product: { ...prev.product, quantity: item },
                          }));
                        }}
                        style={{
                          height: "25px",
                          width: "25px",
                          borderRadius: "50%",
                          border: "1px solid black",
                          padding: "25px",
                          background:
                            showOffCanvas?.product?.quantity == item
                              ? themColor
                              : "#fff",
                          color:
                            showOffCanvas?.product?.quantity == item
                              ? "#fff"
                              : "#000",
                        }}
                        className="d-flex justify-content-center align-items-center mx-2"
                      >
                        {item}
                      </span>
                    ))}
              </div>
              <div className="mt-4 mb-3">
                {showOffCanvas?.product?.price &&
                  (showOffCanvas?.product?.discount ? (
                    <p style={{ textAlign: "left" }} className="mb-0">
                      <span style={{ fontWeight: 700 }}>
                        ₹{showOffCanvas?.product?.discount}{" "}
                      </span>
                      <span
                        style={{
                          color: "#8d8d8d",
                          marginLeft: "5px",
                        }}
                      >
                        MRP
                      </span>
                      <span
                        style={{
                          color: "#8d8d8d",
                          marginLeft: "5px",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{showOffCanvas?.product?.price}
                      </span>
                      <span
                        style={{
                          color: "#ff4e4e",
                          marginLeft: "5px",
                        }}
                      >{`(${(
                        ((showOffCanvas?.product?.price -
                          showOffCanvas?.product.discount) /
                          showOffCanvas?.product?.price) *
                        100
                      ).toFixed(0)})% OFF`}</span>
                    </p>
                  ) : (
                    <p style={{ textAlign: "left" }} className="mb-0">
                      {showOffCanvas?.product?.price}
                    </p>
                  ))}
              </div>
              <Button
                onClick={(e) => {
                  e?.stopPropagation();
                  const oldData = cartProducts.map((item) => {
                    if (item._id === showOffCanvas?.product?._id) {
                      return showOffCanvas?.product;
                    } else {
                      return item;
                    }
                  });
                  handleSetCartProducts(oldData);
                  setSelectedProduct(oldData);
                  setShowOffCanvas((prev) => ({
                    ...prev,
                    show: !prev.show,
                    product: {},
                  }));
                }}
                variant="dark"
                style={{
                  background: themColor,
                  borderColor: themColor,
                  width: "100%",
                  padding: "10px",
                }}
              >
                Done
              </Button>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
      {cartProducts?.length > 0 && (
        <div className="position-sticky bottom-0 pb-3 bg-white">
          <div
            className="mb-2"
            style={{
              backgroundColor: "#fff6f4",
              fontSize: "12px",
              padding: "4px 0 5px",
              textAlign: "center",
              fontWeight: 700,
              color: "#282c3f",
            }}
          >
            {selectedProduct?.length
              ? `${
                  selectedProduct?.length === 1
                    ? "1 Item"
                    : `${selectedProduct?.length} Items`
                } selected for order`
              : "No Item selected, select at least one item to place order."}
          </div>
          <Button
            className="d-flex justify-content-center align-items-center"
            variant="dark"
            style={{
              width: "100%",
              padding: "10px",
                background: "var(--them-color)",
                borderColor: "var(--them-color)",
            }}
            disabled={selectedProduct?.length === 0}
            onClick={(e) => {
              e?.stopPropagation();
              setStep(2);
              navigate("/checkout/address");
            }}
          >
            PLACE ORDER
          </Button>
        </div>
      )}
      <div className="mt-4">
        <img src={safetyImg} style={{ width: "100%" }} alt="" />
      </div>
    </Container>
  );
};

export default Cart;
