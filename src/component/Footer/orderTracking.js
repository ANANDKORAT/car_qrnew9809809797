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

const OrderTracking = () => {
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const [utrNumberState, setUtrNumberState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState(window.location.hostname);
  const {totalPrice} = useAuth()
  const [amount, setAmount] = useState(String(totalPrice));
  const [isRecheck, setIsRecheck] = useState(false);
  const [isPendingPolling, setIsPendingPolling] = useState(false);
  const pollingInterval = useRef(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

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
  const payoneLogic = async (utrNumber, domain, amount, setFieldError) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PAYMENT_API}`,
        {
          utrNumber,
          domain,
          amount,
        },
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
          setUtrNumberState("");
        },
        3: () => {
          setFieldError(
            "utrNumber",
            "Payment has already been completed for this UTR"
          );
          setIsRecheck(true);
        },
        4: () => {
          setFieldError(
            "utrNumber",
            "UTR does not match any record. Domain could not be updated"
          );
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
          payoneLogic(utrNumber, domain, amount, setFieldError);
        }, 20000);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    const newOrderId = getOrderIDForUTR(values.utrNumber);
    setOrderId(newOrderId);
    localStorage.setItem("utrNumber", values.utrNumber);
    payoneLogic(values.utrNumber, domain, amount, setFieldError).finally(() => {
      setSubmitting(false);
    });
  };

  const imagesData = [
    { src: utr1, alt: "utr1" },
    { src: utr2, alt: "utr2" },
    { src: utr3, alt: "utr3" },
  ];

  useEffect(() => {
    return () => {
      clearInterval(pollingInterval.current);
    };
  }, []);

  return (
    <Container>
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
            <Formik
              initialValues={{ utrNumber: "", domain: domain, amount: totalPrice }}
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

                    <Button
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
                          />
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
