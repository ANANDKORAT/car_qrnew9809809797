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
import { isAndroid, isIOS } from "react-device-detect";
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
  const [SelectedPaymentUpi, setSelectedPayment] = useState("Phone Pay");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  const [selectedPayment, setSelectedPayments] = useState(null);
  const gpayupi = process.env.REACT_APP_GPAY;
  const phonepayupi = process.env.REACT_APP_PHONE_PAY;
  const paytmupi = process.env.REACT_APP_PAYTM;

  const timeoutDuration = selectedPayment === "Google Pay" ? 0 : 10000;

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

  function paynoeLogic() {
    let redirect_url = "";
    let url = "";
    let orignal_name = window.location.hostname;
    let site_name = orignal_name.slice(0, 2);

    let baseUrl = window.location.origin + "";

    baseUrl = baseUrl.replace(/^https?:\/\//, "");

    switch (selectedPayment) {
      case "Google Pay":
        // redirect_url = `intent://h.razor-pay.com/pay/pay.php?pa=${gpayupi}&am=${totalPrice}#Intent;scheme=https;package=com.android.chrome;end`;
        redirect_url =
          `intent://` +
          baseUrl +
          `/?pa=${gpayupi}&am=${2}/#Intent;scheme=https;package=com.android.chrome;end`;
        console.log(url, "baseUrl");

        break;
      case "Phone Pay":
        redirect_url =
          "phonepe://upi//pay?pa=" +
          phonepayupi +
          "&pn==" +
          site_name +
          "&am=" +
          totalPrice +
          "&cu=INR";
        break;
      case "Paytm":
        redirect_url =
          "paytmmp://cash_wallet?pa=" +
          paytmupi +
          "&pn=" +
          site_name +
          "&am=" +
          totalPrice +
          "&tr=&mc=8999&cu=INR&tn=987986756875" +
          "&url=&mode=02&purpose=00&orgid=159002&sign=MEQCIDsRrRTBN5u+J9c16TUURJ4IMiPQQ/Sj1WXW7Ane85mYAiBuwEHt/lPXmMKRjFFnz6+jekgTsKWwyTx44qlCXFkfpQ==&featuretype=money_transfer";
        break;
      default:
        break;
    }
    if (SelectedPaymentUpi != "COD") {
      window.location.href = redirect_url;
      setIsLoading(true);
    } else if (process.env.REACT_APP_COD != "no") {
      navigate("/ThankYou");
    }
  }

  const payment_option = [
    isAndroid &&
      isChrome && {
        name: "Google Pay",
        icon: <GPayIcon />,
      },
    isIOS && {
      name: "Phone Pay",
      icon: <PhonePayIcon />,
    },
    isAndroid && {
      name: "Paytm",
      icon: <PaytmIcon />,
    },
    process.env.REACT_APP_COD === "yes" && {
      name: "COD",
      icon: <CodIcon />,
    },
  ];

  const payment_option_show = payment_option.filter(Boolean);

  const [showModal, setShowModal] = useState(false);
  const handleQrShow = () => setShowModal(true);
  const handleQrClose = () => setShowModal(false);
  const qrRef = useRef();

  const isMobileVerified = process.env.REACT_APP_MOBILE_VERIFIED === "yes";
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

  return isPaymentPageLoading && selectedPayment !== "Google Pay" ? (
    <Container
      className="p-0 pt-3 pb-3 flex-column position-relative d-flex justify-content-center align-items-center"
      style={{ background: "#f2f2f3", height: "250px" }}
    >
      <div>Please Wait...</div>
      <Spinner />
    </Container>
  ) : (
    <Container
      className="p-0 pt-3 pb-3 position-relative d-flex flex-column justify-content-between"
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
          <div className="mt-3 py-2 pt-3 pb-3" style={{ background: "#fff" }}>
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

            <div className="">
              <Row className="g-2 m-0 p-2" id="payment_options">
                {/* Filter options based on the platform */}
                {isAndroid
                  ? payment_option_show.map((item) => (
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
                            {isLoading &&
                              selectedPayment === item.name &&
                              selectedPayment !== "Google Pay" && (
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
                    ))
                  : payment_option_show
                      .filter((item) => item.name === "Phone Pay")
                      .map((item) => (
                        <Col md key={item.name}>
                          <div
                            className="fw-semibold"
                            style={{
                              cursor: "pointer",
                              border: `1px solid ${
                                selectedPayment === item.name
                                  ? "#ed143d"
                                  : "#ddd"
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
                                This Payment-Method is Not Allowed For This
                                Offer Products. Choose Other Products or Change
                                Payment Method.
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
        <div className="mt-3">
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
                {totalExtraDiscount &&
                process.env.REACT_APP_COUPON_APPLY == "true" ? (
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
                ) : (
                  ""
                )}
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
          )}
        </div>
      </div>
      <div
        className="position-sticky bottom-0 pb-3 bg-white px-4 mt-3 py-4 d-flex align-content-center justify-content-between"
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
            ₹{totalPrice}
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
            width: "60%",
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
            {(isAndroid || isIOS) && isMobileVerified && (
              <div className="p-3" ref={qrRef}>
                {qrcode ? (
                  <QRCodeCanvas value={upiURL} level={"H"} />
                ) : (
                  <p>No QR code available</p>
                )}
              </div>
            )}
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
