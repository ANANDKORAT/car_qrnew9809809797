import React, { useEffect, useRef, useState } from "react"; // Import useRef
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import utr1 from "../../assets/UTR1.jpeg";
import utr2 from "../../assets/UTR2.jpeg";
import utr3 from "../../assets/UTR3.jpeg";
import axios from "axios";
import { ReactComponent as ClockIcon } from "../../assets/image/clock-icon.svg";
import { useAuth } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const [utrNumberState, setUtrNumberState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState(window.location.hostname);
  const { totalPrice } = useAuth();
  const [amount, setAmount] = useState(String(totalPrice));
  const [isRecheck, setIsRecheck] = useState(false);
  const [isPendingPolling, setIsPendingPolling] = useState(false);
  const pollingInterval = useRef(null);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [timer, setTimer] = useState(180);
  const [message, setMessage] = useState("");
  const abortControllerRef = useRef(null); // Ref for AbortController

  const generateOrderID = () => {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getOrderIDForUTR = (utr) => {
    const orderData = JSON.parse(localStorage.getItem("orderData")) || {};
    if (orderData[utr]) {
      return orderData[utr];
    } else {
      const newOrderId = generateOrderID();
      orderData[utr] = newOrderId;
      localStorage.setItem("orderData", JSON.stringify(orderData));
      return newOrderId;
    }
  };

  useEffect(() => {
    let countdownInterval;
    if (isCountdownActive && timer > 0) {
      countdownInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdownInterval);
      setIsCountdownActive(false);
      setIsLoading(false);
      setIsRecheck(true);
      setMessage("Payment is failed UTR is wrong.");
    }
    return () => clearInterval(countdownInterval);
  }, [isCountdownActive, timer]);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const imagesData = [
    { src: utr1, alt: "utr1" },
    { src: utr2, alt: "utr2" },
    { src: utr3, alt: "utr3" },
  ];

  const payoneLogic = async (
    utrNumber,
    domain,
    amount,
    setFieldError,
    signal
  ) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PAYMENT_API}/api/utrmessages/compare`,
        { utrNumber, domain, amount },
        { signal } // Pass the signal for request cancellation
      );

      const statusMessages = {
        1: () => {
          setIsRecheck(false);
          navigate(`/ThankYou?utrNumber=${utrNumber}`);
        },
        2: () => {
          setFieldError(
            "utrNumber",
            "UTR matched, but the amount does not match."
          );
          setIsRecheck(true);
          setIsCountdownActive(true);
          setTimer(180);
          setUtrNumberState("");
        },
        3: () => {
          setFieldError(
            "utrNumber",
            "Payment has already been completed for this UTR"
          );
          setIsRecheck(true);
          setIsCountdownActive(true);
          setTimer(180);
        },
        4: () => {
          setFieldError("utrNumber", "UTR does not match any record.");
        },
      };

      const handleStatus = statusMessages[data.statusCode];

      if (handleStatus) {
        handleStatus();
      } else {
        setFieldError(
          "utrNumber",
          "Please re-Check The UTR Number & try again"
        );
      }

      if (data.status === "pending") {
        setIsPendingPolling(true);
        setTimeout(() => {
          payoneLogic(utrNumber, domain, amount, setFieldError, signal);
        }, 20000);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        console.error("Error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort previous request if any
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const newOrderId = getOrderIDForUTR(values.utrNumber);
    setOrderId(newOrderId);
    localStorage.setItem("utrNumber", values.utrNumber);

    payoneLogic(
      values.utrNumber,
      domain,
      amount,
      setFieldError,
      abortController.signal
    ).finally(() => {
      setSubmitting(false);
      setIsCountdownActive(true);
    });
  };

  useEffect(() => {
    return () => {
      // Cleanup: Abort ongoing requests when component unmounts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <Container>
      {process.env.REACT_APP_AW && (
        <Helmet>
          <script>
            {`
                  gtag('event', 'conversion', {
            'send_to': '${process.env.REACT_APP_AW}/${
              process.env.REACT_APP_PURCHASETAGGOOGLE || ""
            }',
            'value': ${totalPrice},
            'currency': 'INR',
            'transaction_id': '${orderId}'
        });
                `}
          </script>
        </Helmet>
      )}
      <Row>
        <Col>
          <div className="text-center mt-5">
            <>
              <h1
                style={{ fontSize: "24px", fontWeight: 700, color: "#727272" }}
              >
                Your Order is Confirmed!
              </h1>
              <div className="mb-3">
                <ClockIcon />
              </div>
              <h3
                style={{ fontSize: "16px", fontWeight: 500, color: "#023FFF" }}
              >
                Payment confirmation is pending
              </h3>
              <h3
                style={{ fontSize: "16px", fontWeight: 500, color: "#727272" }}
              >
                We Will Notify You In Email Or Phone.
              </h3>
            </>
            <h3
              className="mt-4"
              style={{ fontSize: "18px", fontWeight: 700, color: "#727272" }}
            >
              {isLoading ? "Enter Your UTR Number" : "Track Your Order"}
            </h3>
            {message && <div className="alert alert-info">{message}</div>}

            <Formik
              initialValues={{
                utrNumber: "",
                domain: domain,
                amount: totalPrice,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.utrNumber) {
                  errors.utrNumber = "UTR number is required";
                } else if (values.utrNumber.length !== 12) {
                  errors.utrNumber = "UTR number must be 12 digits";
                }
                return errors;
              }}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                isValid,
                dirty,
                errors,
                touched,
                handleChange,
              }) => (
                <FormikForm className="my-3">
                  <Field
                    type="text"
                    name="utrNumber"
                    placeholder="Enter UTR number (12 digits)"
                    className="form-control d-block m-0"
                    maxLength="12"
                    onChange={(e) => {
                      handleChange(e);
                      setUtrNumberState(e.target.value);
                    }}
                  />
                  {errors.utrNumber && touched.utrNumber && (
                    <div
                      className="text-danger"
                      style={{
                        display: "flex",
                        marginTop: "5px",
                        fontWeight: "500",
                      }}
                    >
                      {errors.utrNumber}
                    </div>
                  )}
                  <div className="d-flex justify-content-center flex-row w-[100%] mt-3 gap-3">
                    <Button
                      type="button"
                      onClick={() => navigate(-1)}
                      variant="dark"
                      style={{
                        background: "var(--them-color)",
                        borderColor: "var(--them-color)",
                        border: "none",
                        width: "100px",
                      }}
                    >
                      Back
                    </Button>

                    {/* <Button
                      variant="dark"
                      type="submit"
                      disabled={
                        isSubmitting || (!isRecheck && !isValid) || !dirty
                      }
                      style={{
                        background: "var(--them-color)",
                        borderColor: "var(--them-color)",
                        border: "none",
                        width: "100px",
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="ms-2"
                          />{" "}
                        </>
                      ) : isPendingPolling ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="ms-2"
                        />
                      ) : isRecheck ? (
                        "Recheck UTR"
                      ) : (
                        "Submit"
                      )}{" "}
                      set time here
                    </Button> */}
                    <Button
                      variant="dark"
                      type="submit"
                      onClick={
                        process.env.REACT_APP_DONT_CHECK_UTR === "yes"
                          ? () => navigate("/ThankYou")
                          : undefined
                      }
                      disabled={
                        isSubmitting ||
                        (!isRecheck && !isValid) ||
                        !dirty ||
                        isCountdownActive // disable if countdown is active
                      }
                      style={{
                        background: "var(--them-color)",
                        borderColor: "var(--them-color)",
                        border: "none",
                        width: "150px",
                      }}
                    >
                      {isCountdownActive ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          {formatTime(timer)}
                        </>
                      ) : isLoading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : isRecheck ? (
                        "Recheck UTR"
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </FormikForm>
              )}
            </Formik>
          </div>
          <div className="utr-image d-flex justify-content-center">
            {imagesData.map((image, index) => (
              <img key={index} src={image.src} alt={image.alt} width="100%" />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderTracking;
