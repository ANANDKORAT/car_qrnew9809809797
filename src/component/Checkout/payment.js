import { useEffect, useRef, useState } from "react";
import "./index.css";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import payment_video_loop from "../../assets/cod_lat.gif";
import Countdown from "react-countdown";
import OfferCountdown from "../Header/OfferCountdown";
import { Modal } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { ReactComponent as CodIcon } from "../../assets/image/cod-icon.svg";
import { ReactComponent as PaytmIcon } from "../../assets/image/paytm-icon.svg";
import { ReactComponent as PhonePayIcon } from "../../assets/image/phonepay-icon.svg";
import { ReactComponent as GPayIcon } from "../../assets/image/gpay-icon.svg";
import { ReactComponent as QRIcon } from "../../assets/image/qr-icon.svg";
import { ReactComponent as SafePaymentIcon } from "../../assets/image/safe-payment-icon.svg";
import Bowser from "bowser";

const Payment = () => {
  const {
    selectedProduct,
    totalPrice,
    totalDiscount,
    totalMRP,
    totalExtraDiscount,
    isPaymentPageLoading,
    setIsPaymentPageLoading,
  } = useAuth();

  const [time, setTime] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  const [selectedPayment, setSelectedPayments] = useState(null);
  const gpayupi = process.env.REACT_APP_GPAY;
  const phonepayupi = process.env.REACT_APP_PHONE_PAY;
  const paytmupi = process.env.REACT_APP_PAYTM;

  const timeoutDuration = 10000;

  const browser = Bowser.getParser(window.navigator.userAgent);
  const isChrome = browser.getBrowser().name === "Chrome";

  useEffect(() => {
    let loadingTimeout = null;
    if (isLoading) {
      clearInterval(loadingTimeout);
      loadingTimeout = setTimeout(() => {
        setIsPaymentPageLoading(true);
      }, timeoutDuration);
    } else {
      clearInterval(loadingTimeout);
    }
    return () => {
      clearInterval(loadingTimeout);
    };
  }, [isLoading, selectedPayment]);

  useEffect(() => {
    let navigateTimeout = null;
    if (isPaymentPageLoading) {
      clearInterval(navigateTimeout);
      navigateTimeout = setTimeout(() => {
        setIsPaymentPageLoading(false);
        setIsLoading(false);
        navigate("/order-comfirmation");
      }, timeoutDuration);
    } else {
      setIsLoading(false);
      clearInterval(navigateTimeout);
    }
    return () => {
      setIsLoading(false);
      clearInterval(navigateTimeout);
    };
  }, [isPaymentPageLoading, selectedPayment]);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  const handleQrChange = () => {
    navigate("/order-comfirmation");
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const payment_options = document.querySelector("#payment_options");
      const payment_bottom_block = document.querySelector(
        "#payment_bottom_block"
      );
      if (
        !payment_options?.contains(e.target) &&
        !payment_bottom_block?.contains(e.target)
      ) {
        if (isLoading) {
          setIsLoading(false);
        }
      }
    });
  }, [isLoading]);

  const generateOrderID = () => {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function paynoeLogic() {
    let redirect_url = "";
    let original_name = window.location.hostname;
    let site_name = original_name.slice(0, 2);

    // Payment switch statement
    switch (selectedPayment) {
      case "Google Pay":
        // Construct Google Pay UPI URL
        // pa: UPI ID, pn: Payee name, am: Amount, tr: Transaction ref, mc: Merchant code
        redirect_url =
          "tez://upi/pay?pa=" +
          gpayupi +
          "&pn=" +
          site_name +
          "&am=" +
          totalPrice +
          "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" +
          site_name +
          "&sign=4875421245fgjdjjhcbdfg";
        break;
      case "Phone Pay":
        // Construct PhonePe UPI URL
        // ver: Version, mode: Payment mode, pa: UPI ID, pn: Payee name, tr: Transaction ref
        redirect_url =
          "phonepe://pay?ver=01&mode=19&pa=" +
          phonepayupi +
          "&pn=Paying_to_Flipkart&tr=RZPPRrfIBE5psFhwhqrv2&cu=INR&mc=7446&qrMedium=04&tn=Paying_to_Flipkart&am=" +
          totalPrice;
        break;
      case "Paytm":
        // Construct Paytm UPI URL
        // pa: UPI ID, pn: Payee name, am: Amount, cu: Currency, tn: Transaction note
        redirect_url =
          "paytmmp://pay?pa=" +
          paytmupi +
          "&pn=" +
          site_name +
          "&am=" +
          totalPrice +
          "&cu=INR&tn=" +
          site_name +
          "&sign=4875421245fgjdjjhcbdfg";
        break;
      case "COD":
        handleCOD(); // Call COD handling directly
        return; // Exit function to avoid navigating with redirect_url
      default:
        break;
    }

    // Redirect for non-COD cases
    window.location.href = redirect_url;
    setIsLoading(true);
  }

  // Define the function to handle COD
  const handleCOD = () => {
    const utr = generateOrderID();
    localStorage.setItem("utrNumber", utr);
    navigate("/ThankYou");
  };

  const payment_option = [
    process.env.REACT_APP_GPAY != "" &&
      process.env.REACT_APP_GPAY && {
        name: "Google Pay",
        icon: <GPayIcon />,
      },
    process.env.REACT_APP_PHONE_PAY != "" &&
      process.env.REACT_APP_PHONE_PAY && {
        name: "Phone Pay",
        icon: <PhonePayIcon />,
      },
    process.env.REACT_APP_PAYTM != "" &&
      process.env.REACT_APP_PAYTM && {
        name: "Paytm",
        icon: <PaytmIcon />,
      },
    process.env.REACT_APP_COD === "yes" && {
      name: "COD",
      icon: <CodIcon />,
    },
  ];

  const payment_option_show = payment_option.filter(Boolean);

  // Set the default selected payment method to the first available payment option
  useEffect(() => {
    if (payment_option_show.length > 0 && !selectedPayment) {
      setSelectedPayments(payment_option_show[0].name);
    }
  }, [payment_option_show]);

  const [showModal, setShowModal] = useState(false);
  const handleQrShow = () => setShowModal(true);
  const handleQrClose = () => setShowModal(false);
  const qrRef = useRef();
  const qrcode = process.env.REACT_APP_QR;

  const downloadQRCode = () => {
    const qrElement = qrRef.current;
    if (qrElement) {
      html2canvas(qrElement, { scale: 2 })
        .then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "qrcode.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error("Failed to capture QR code screenshot", err);
        });
    }
  };

  const upiURL = `upi://pay?pa=${qrcode}&pn=${"chirag"}&am=${totalPrice}&cu=INR`;

  const handleCopy = (text) => {
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Copied to clipboard!");
      } catch (err) {
        console.error("Could not copy text: ", err);
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text is Copied!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return isPaymentPageLoading ? (
    <Container
      className="p-0 pt-3 pb-3 flex-column position-relative d-flex justify-content-center align-items-center"
      style={{ background: "#f2f2f3", height: "250px" }}
    >
      <div>Please Wait...</div>
      <Spinner />
    </Container>
  ) : (
    <Container
      className="p-0 position-relative d-flex flex-column justify-content-between"
      style={{ background: "#f2f2f3" }}
    >
      <div>
        <div>
          <div className="line-draw"></div>
          <div
            style={{
              background: "white",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="p-3"
          >
            <h6
              className="card-title px-4 text-start fw-bold pt-1 text-uppercase"
              style={{ fontSize: "12px" }}
            >
              Recommended Payment Options
            </h6>
            <SafePaymentIcon />
          </div>
          <div className="line-draw"></div>
          <div className=" py-2 pt-3 pb-3" style={{ background: "#fff" }}>
            <div
              className="container p-3"
              style={{ textAlign: "center", border: "none" }}
            >
              <span>
                <Countdown
                  date={Date.now() + parseInt(process.env.REACT_APP_OFFER_TIME)}
                  ref={ref}
                  renderer={(e) => <OfferCountdown />}
                  intervalDelay={1000}
                />
              </span>
            </div>
            <div className="m-2">
              <div
                className="mt-2"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  backgroundColor: "rgb(231, 238, 255)",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                }}
              >
                <img src={payment_video_loop} style={{ width: "15%" }}></img>
                Pay online & get EXTRA ₹33 off
              </div>
            </div>

            <div data-testid="PAY ONLINE" className="text-pay">
              <span style={{ fontWeight: "600", fontSize: "12px" }}>
                PAY ONLINE
              </span>
              <div className="hr-line"></div>
            </div>

            <div>
              <Row className="g-2 m-0 p-2" id="payment_options">
                {/* Filter options based on the platform */}
                {payment_option_show.map((item) => (
                  <Col md key={item.name}>
                    <div
                      className="fw-semibold"
                      style={{
                        cursor: "pointer",
                        border: `1px solid ${
                          selectedPayment === item.name ? "#ed143d" : "#ddd"
                        }`,
                        borderRadius: "30px",
                        padding: "15px 40px",
                        color: "black",
                      }}
                      onClick={() => {
                        setSelectedPayments(item.name);
                      }}
                    >
                      <span className="d-flex align-items-center">
                        <span>{item?.icon}</span>
                        <span className="ms-4">{item.name}</span>
                        {isLoading && selectedPayment === item.name && (
                          <Spinner
                            variant="secondary"
                            className="ms-2"
                            size="sm"
                          />
                        )}
                      </span>
                      {process.env.REACT_APP_COD === "yes" && (
                        <div
                          className="text-danger"
                          style={{
                            fontSize: "13px",
                            textAlign: "center",
                          }}
                        >
                          This Payment-Method is Not Allowed For This Offer
                          Products. Choose Other Products or Change Payment
                          Method.
                        </div>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            <Row className="mt-1 g-2 m-0 p-2" id="payment_options">
              <div data-testid="PAY ONLINE" className="text-pay">
                <span style={{ fontWeight: "600", fontSize: "12px" }}>
                  PAY BY SCANNER
                </span>
                <div className="hr-line"></div>
              </div>
              <Col md>
                <div
                  className="fw-semibold"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px 30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "25px",
                  }}
                  onClick={handleQrShow}
                >
                  <p style={{ color: "#FF9F19", marginBottom: "0px" }}>
                    <QRIcon />
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "0px",
                    }}
                  >
                    Scan to Pay
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div>
          {selectedProduct?.length && (
            <div className="bg-white px-4 py-4">
              <h6
                id="product_details"
                className="card-title text-start fw-bold border-bottom pb-2"
              >{`PRICE DETAILS (${
                selectedProduct?.length === 1
                  ? "1 Item"
                  : `${selectedProduct?.length} Items`
              })`}</h6>
              <div className="mt-3">
                <div className="d-flex flex-row justify-content-between align-items-center ">
                  <span>Total MRP</span>
                  <span className="ms-2">
                    <span style={{ fontSize: "12px" }}>
                      ₹ <span style={{ fontSize: "20px" }}>{totalMRP}</span>
                    </span>
                  </span>
                </div>
                {totalDiscount ? (
                  <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                    <span>Discount on MRP</span>
                    <span className="ms-2 text-success">
                      <span style={{ fontSize: "12px" }}>
                        - ₹{" "}
                        <span style={{ fontSize: "20px" }}>
                          {totalDiscount}
                        </span>
                      </span>
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {totalExtraDiscount &&
                process.env.REACT_APP_COUPON_APPLY == "true" ? (
                  <>
                    <div className="d-flex flex-row justify-content-between align-items-center mt-2 border-top pt-2">
                      <span>Total Price</span>
                      <span className="ms-2">
                        <span style={{ fontSize: "12px" }}>
                          ₹{" "}
                          <span style={{ fontSize: "20px" }}>
                            {totalMRP - totalDiscount}
                          </span>
                        </span>
                      </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center mt-2 ">
                      <span>Coupon Applied (Buy 2 Get 1 free)</span>
                      <span className="ms-2 text-success">
                        <span style={{ fontSize: "12px" }}>
                          - ₹{" "}
                          <span style={{ fontSize: "20px" }}>
                            {totalExtraDiscount}
                          </span>
                        </span>
                      </span>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="d-flex flex-row justify-content-between align-items-center mt-2 fw-bold border-top pt-3">
                  <span>Total Amount</span>
                  <span className="ms-2">
                    <span style={{ fontSize: "12px" }}>
                      ₹ <span style={{ fontSize: "20px" }}>{totalPrice}</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="position-sticky bottom-0 pb-3 bg-white px-4 py-4 d-flex align-content-center justify-content-between"
        id="payment_bottom_block"
      >
        <div
          style={{
            display: "inline-block",
            fontSize: "16px",
            fontWeight: 700,
            color: "#282c3f",
            textAlign: "start",
          }}
        >
          <h6 className="mb-0" style={{ fontWeight: "bold", fontSize: "22px" }}>
            <span style={{ fontWeight: "bold", fontSize: "15px" }}>₹ </span>
            {totalPrice}
          </h6>
          <a
            href="#product_details"
            style={{
              fontSize: "12px",
              textDecoration: "none",
              color: "#ff3f6c",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            VIEW DETAILS
          </a>
        </div>
        <Button
          className="d-flex justify-content-center align-items-center"
          variant="dark"
          style={{
            width: "48%",
            padding: "10px",
            background: "var(--them-color)",
            borderColor: "var(--them-color)",
          }}
          onClick={() => paynoeLogic()}
        >
          PAY NOW
        </Button>
      </div>
      <Modal show={showModal} onHide={handleQrClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Scan to Pay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {
              <div className="p-3" ref={qrRef}>
                {qrcode ? (
                  <QRCodeCanvas value={upiURL} level={"H"} />
                ) : (
                  <p>No QR code available</p>
                )}
              </div>
            }
            <button
              style={{
                padding: "10px 12px",
                background: process.env.REACT_APP_THEAM_COLOR,
                borderColor: "var(--them-color)",
                border: "none",
                borderRadius: "5px",
                color: "#000",
                marginBottom: "10px",
              }}
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6
              className="mb-0"
              style={{ fontWeight: "600", fontSize: "14px" }}
            >
              <span style={{ fontWeight: "bold" }}>UPI ID :</span> {qrcode}
            </h6>
            <Button
              variant="outline-secondary"
              size="sm"
              style={{ background: "#044723", color: "white" }}
              className="btn_copy m-0"
              onClick={() => handleCopy(qrcode)}
            >
              Copy
            </Button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6
              className="mb-0"
              style={{ fontWeight: "600", fontSize: "14px" }}
            >
              <span style={{ fontWeight: "bold" }}>Amount :</span> {totalPrice}{" "}
              ₹
            </h6>
            <Button
              variant="outline-secondary"
              size="sm"
              style={{ background: "#044723", color: "white" }}
              className="btn_copy m-0"
              onClick={() => handleCopy(`₹${totalPrice}`)}
            >
              Copy
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            // onClick={() => paynoeLogic()}
            onClick={handleQrChange}
            style={{
              padding: "7px 30px",
              background: process.env.REACT_APP_THEAM_COLOR,
              borderColor: "var(--them-color)",
              border: "none",
              borderRadius: "5px",
              color: "#000",
              marginBottom: "10px",
            }}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Payment;
