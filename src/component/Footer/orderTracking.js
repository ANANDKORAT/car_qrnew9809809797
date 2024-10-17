import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import utr1 from "../../assets/UTR1.jpeg";
import utr2 from "../../assets/UTR2.jpeg";
import utr3 from "../../assets/UTR3.jpeg";
import axios from "axios";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const [utrNumberState, setUtrNumberState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState(`${window.location.hostname}`);
  const [amount, setAmount] = useState("10");
  const [isRecheck, setIsRecheck] = useState(false);
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
      const { data } = await axios.post(`${process.env.REACT_APP_PAYMENT_API}`, {
        utrNumber,
        domain,
        amount,
      });
  
      const statusMessages = {
        1: () => {
          setIsRecheck(false);
          navigate(`/ThankYou?utrNumber=${utrNumber}&domain=${domain}&amount=${amount}`);
        },
        2: () => {
          setFieldError("utrNumber", "UTR matched, but the amount does not match.");
          setIsRecheck(true);
          setUtrNumberState("");
        },
        3: () => {
          setFieldError("utrNumber", "Payment has already been completed for this UTR");
        },
        4: () => {
          setFieldError("utrNumber", "UTR does not match any record. Domain could not be updated");
        },
      };
  
      const handleStatus = statusMessages[data.statusCode];
  
      if (handleStatus) {
        handleStatus();
      } else {
        setFieldError("utrNumber", "Please re-Check The UTR Number & try again");
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
    payoneLogic(values.utrNumber, domain, amount, setFieldError)
      .finally(() => {
        setSubmitting(false); 
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="text-center mt-5">
            <>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#727272",
                }}
              >
                Your Order is Confirmed!
              </h1>
              <div className="mb-3">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 80 80" width={44} height={44}>
                  <path d="M 40 7 C 21.785156 7 7 21.785156 7 40 C 7 58.214844 21.785156 73 40 73 C 58.214844 73 73 58.214844 73 40 C 73 21.785156 58.214844 7 40 7 Z M 40 9 C 57.132813 9 71 22.867188 71 40 C 71 57.132813 57.132813 71 40 71 C 22.867188 71 9 57.132813 9 40 C 9 22.867188 22.867188 9 40 9 Z M 40 11 C 38.894531 11 38 11.894531 38 13 C 38 14.105469 38.894531 15 40 15 C 41.105469 15 42 14.105469 42 13 C 42 11.894531 41.105469 11 40 11 Z M 33.019531 12.921875 C 32.996094 12.917969 32.972656 12.921875 32.953125 12.921875 C 32.882813 12.925781 32.820313 12.9375 32.753906 12.953125 C 32.21875 13.097656 31.902344 13.644531 32.046875 14.179688 C 32.191406 14.714844 32.738281 15.03125 33.269531 14.886719 C 33.804688 14.742188 34.121094 14.195313 33.980469 13.660156 C 33.863281 13.226563 33.472656 12.925781 33.019531 12.921875 Z M 46.980469 12.921875 C 46.53125 12.925781 46.140625 13.230469 46.023438 13.664063 C 45.878906 14.199219 46.195313 14.746094 46.730469 14.890625 C 47.265625 15.03125 47.8125 14.714844 47.953125 14.183594 C 48.023438 13.925781 47.988281 13.652344 47.855469 13.421875 C 47.722656 13.191406 47.503906 13.023438 47.25 12.953125 C 47.160156 12.933594 47.070313 12.921875 46.980469 12.921875 Z M 26.476563 15.617188 C 26.308594 15.621094 26.144531 15.667969 26 15.75 C 25.769531 15.882813 25.601563 16.101563 25.53125 16.359375 C 25.464844 16.613281 25.5 16.886719 25.632813 17.117188 C 25.765625 17.347656 25.984375 17.515625 26.242188 17.582031 C 26.496094 17.652344 26.769531 17.617188 27 17.484375 C 27.476563 17.207031 27.640625 16.59375 27.363281 16.117188 C 27.183594 15.800781 26.84375 15.609375 26.476563 15.617188 Z M 53.453125 15.621094 C 53.113281 15.636719 52.804688 15.824219 52.632813 16.121094 C 52.355469 16.597656 52.523438 17.207031 53 17.484375 C 53.476563 17.761719 54.089844 17.597656 54.363281 17.121094 C 54.5 16.890625 54.535156 16.617188 54.464844 16.359375 C 54.398438 16.101563 54.230469 15.882813 54 15.75 C 53.835938 15.65625 53.644531 15.609375 53.453125 15.621094 Z M 40 17 C 39.449219 17 39 17.449219 39 18 C 39 18.550781 39.449219 19 40 19 C 40.550781 19 41 18.550781 41 18 C 41 17.449219 40.550781 17 40 17 Z M 20.921875 19.90625 C 20.652344 19.90625 20.390625 20.011719 20.203125 20.203125 C 19.8125 20.589844 19.8125 21.226563 20.203125 21.613281 C 20.589844 22.003906 21.226563 22.003906 21.613281 21.613281 C 22.003906 21.226563 22.003906 20.589844 21.613281 20.203125 C 21.429688 20.015625 21.183594 19.910156 20.921875 19.90625 Z M 59.105469 19.90625 C 58.835938 19.90625 58.574219 20.011719 58.386719 20.203125 C 57.996094 20.589844 57.996094 21.226563 58.386719 21.613281 C 58.773438 22.003906 59.410156 22.003906 59.796875 21.613281 C 60.1875 21.226563 60.1875 20.589844 59.796875 20.203125 C 59.613281 20.015625 59.367188 19.910156 59.105469 19.90625 Z M 40 21 C 39.449219 21 39 21.449219 39 22 C 39 22.550781 39.449219 23 40 23 C 40.550781 23 41 22.550781 41 22 C 41 21.449219 40.550781 21 40 21 Z M 47.191406 21.3125 L 40.652344 36.066406 C 40.4375 36.03125 40.222656 36 40 36 C 37.800781 36 36 37.800781 36 40 C 36 42.199219 37.800781 44 40 44 C 40.738281 44 41.421875 43.785156 42.015625 43.433594 L 50.4375 51.847656 L 51.847656 50.4375 L 43.433594 42.015625 C 43.785156 41.421875 44 40.738281 44 40 C 44 38.738281 43.394531 37.621094 42.472656 36.886719 L 49.019531 22.121094 Z M 63.359375 25.5 C 63.191406 25.503906 63.027344 25.550781 62.878906 25.632813 C 62.402344 25.910156 62.238281 26.519531 62.515625 27 C 62.792969 27.476563 63.402344 27.640625 63.878906 27.363281 C 64.109375 27.234375 64.277344 27.015625 64.347656 26.757813 C 64.417969 26.5 64.382813 26.226563 64.25 26 C 64.066406 25.683594 63.722656 25.492188 63.359375 25.5 Z M 16.570313 25.5 C 16.230469 25.515625 15.921875 25.703125 15.75 26 C 15.472656 26.476563 15.640625 27.089844 16.117188 27.363281 C 16.59375 27.640625 17.207031 27.476563 17.484375 27 C 17.757813 26.523438 17.59375 25.910156 17.117188 25.636719 C 16.953125 25.539063 16.761719 25.492188 16.570313 25.5 Z M 13.910156 32.015625 C 13.460938 32.015625 13.070313 32.320313 12.953125 32.753906 C 12.808594 33.289063 13.125 33.835938 13.660156 33.980469 C 14.195313 34.121094 14.742188 33.804688 14.886719 33.269531 C 15.027344 32.738281 14.710938 32.191406 14.175781 32.046875 C 14.089844 32.023438 14 32.011719 13.910156 32.015625 Z M 66.117188 32.015625 C 66.015625 32.011719 65.917969 32.019531 65.820313 32.046875 C 65.285156 32.191406 64.96875 32.738281 65.113281 33.269531 C 65.257813 33.804688 65.804688 34.121094 66.339844 33.980469 C 66.871094 33.835938 67.1875 33.289063 67.046875 32.753906 C 66.929688 32.332031 66.554688 32.03125 66.117188 32.015625 Z M 13 38 C 11.894531 38 11 38.894531 11 40 C 11 41.105469 11.894531 42 13 42 C 14.105469 42 15 41.105469 15 40 C 15 38.894531 14.105469 38 13 38 Z M 40 38 C 41.117188 38 42 38.882813 42 40 C 42 41.117188 41.117188 42 40 42 C 38.882813 42 38 41.117188 38 40 C 38 38.882813 38.882813 38 40 38 Z M 67 38 C 65.894531 38 65 38.894531 65 40 C 65 41.105469 65.894531 42 67 42 C 68.105469 42 69 41.105469 69 40 C 69 38.894531 68.105469 38 67 38 Z M 18 39 C 17.449219 39 17 39.449219 17 40 C 17 40.550781 17.449219 41 18 41 C 18.550781 41 19 40.550781 19 40 C 19 39.449219 18.550781 39 18 39 Z M 22 39 C 21.449219 39 21 39.449219 21 40 C 21 40.550781 21.449219 41 22 41 C 22.550781 41 23 40.550781 23 40 C 23 39.449219 22.550781 39 22 39 Z M 58 39 C 57.449219 39 57 39.449219 57 40 C 57 40.550781 57.449219 41 58 41 C 58.550781 41 59 40.550781 59 40 C 59 39.449219 58.550781 39 58 39 Z M 62 39 C 61.449219 39 61 39.449219 61 40 C 61 40.550781 61.449219 41 62 41 C 62.550781 41 63 40.550781 63 40 C 63 39.449219 62.550781 39 62 39 Z M 13.957031 45.988281 C 13.855469 45.984375 13.757813 45.996094 13.660156 46.019531 C 13.402344 46.089844 13.183594 46.257813 13.050781 46.488281 C 12.917969 46.71875 12.882813 46.992188 12.953125 47.25 C 13.097656 47.78125 13.644531 48.097656 14.175781 47.953125 C 14.710938 47.8125 15.027344 47.265625 14.886719 46.730469 C 14.773438 46.304688 14.394531 46.003906 13.957031 45.988281 Z M 66.070313 45.988281 C 65.621094 45.996094 65.230469 46.296875 65.113281 46.734375 C 64.96875 47.265625 65.285156 47.8125 65.820313 47.957031 C 66.355469 48.101563 66.902344 47.785156 67.046875 47.25 C 67.1875 46.714844 66.871094 46.167969 66.339844 46.027344 C 66.25 46 66.160156 45.988281 66.070313 45.988281 Z M 16.59375 52.5 C 16.425781 52.503906 16.261719 52.550781 16.117188 52.632813 C 15.640625 52.910156 15.472656 53.519531 15.75 54 C 15.882813 54.226563 16.101563 54.394531 16.359375 54.464844 C 16.613281 54.535156 16.886719 54.5 17.117188 54.363281 C 17.347656 54.234375 17.515625 54.015625 17.582031 53.757813 C 17.652344 53.5 17.617188 53.226563 17.484375 53 C 17.300781 52.683594 16.957031 52.492188 16.59375 52.5 Z M 63.332031 52.5 C 62.992188 52.519531 62.683594 52.707031 62.515625 53 C 62.238281 53.480469 62.402344 54.089844 62.878906 54.367188 C 63.109375 54.5 63.382813 54.535156 63.640625 54.46875 C 63.898438 54.398438 64.117188 54.230469 64.25 54 C 64.382813 53.773438 64.417969 53.5 64.347656 53.242188 C 64.277344 52.984375 64.109375 52.765625 63.878906 52.636719 C 63.714844 52.539063 63.523438 52.492188 63.332031 52.5 Z M 40 57 C 39.449219 57 39 57.449219 39 58 C 39 58.550781 39.449219 59 40 59 C 40.550781 59 41 58.550781 41 58 C 41 57.449219 40.550781 57 40 57 Z M 20.921875 58.09375 C 20.652344 58.089844 20.390625 58.195313 20.203125 58.386719 C 19.8125 58.773438 19.8125 59.410156 20.203125 59.796875 C 20.589844 60.1875 21.226563 60.1875 21.613281 59.796875 C 22.003906 59.410156 22.003906 58.773438 21.613281 58.386719 C 21.429688 58.199219 21.183594 58.09375 20.921875 58.09375 Z M 59.105469 58.09375 C 58.835938 58.089844 58.574219 58.195313 58.386719 58.386719 C 57.996094 58.773438 57.996094 59.410156 58.386719 59.796875 C 58.773438 60.1875 59.410156 60.1875 59.796875 59.796875 C 60.1875 59.410156 60.1875 58.773438 59.796875 58.386719 C 59.613281 58.199219 59.367188 58.09375 59.105469 58.09375 Z M 40 61 C 39.449219 61 39 61.449219 39 62 C 39 62.550781 39.449219 63 40 63 C 40.550781 63 41 62.550781 41 62 C 41 61.449219 40.550781 61 40 61 Z M 53.472656 62.378906 C 53.308594 62.386719 53.144531 62.429688 53 62.515625 C 52.519531 62.792969 52.355469 63.402344 52.632813 63.878906 C 52.910156 64.359375 53.519531 64.523438 54 64.25 C 54.226563 64.117188 54.394531 63.898438 54.464844 63.640625 C 54.535156 63.382813 54.5 63.109375 54.363281 62.878906 C 54.183594 62.5625 53.839844 62.371094 53.472656 62.378906 Z M 26.453125 62.386719 C 26.113281 62.402344 25.804688 62.589844 25.632813 62.882813 C 25.5 63.113281 25.464844 63.386719 25.53125 63.640625 C 25.601563 63.898438 25.769531 64.117188 26 64.25 C 26.476563 64.527344 27.089844 64.359375 27.363281 63.882813 C 27.640625 63.40625 27.476563 62.792969 27 62.515625 C 26.832031 62.421875 26.644531 62.375 26.453125 62.386719 Z M 40 65 C 38.894531 65 38 65.894531 38 67 C 38 68.105469 38.894531 69 40 69 C 41.105469 69 42 68.105469 42 67 C 42 65.894531 41.105469 65 40 65 Z M 33 65.082031 C 32.554688 65.085938 32.160156 65.386719 32.046875 65.824219 C 31.902344 66.355469 32.21875 66.902344 32.75 67.046875 C 33.285156 67.191406 33.832031 66.875 33.976563 66.339844 C 34.121094 65.804688 33.804688 65.257813 33.269531 65.113281 C 33.183594 65.09375 33.09375 65.082031 33 65.082031 Z M 47.027344 65.082031 C 46.925781 65.078125 46.824219 65.089844 46.730469 65.113281 C 46.195313 65.257813 45.878906 65.804688 46.019531 66.339844 C 46.164063 66.875 46.710938 67.191406 47.246094 67.046875 C 47.78125 66.902344 48.097656 66.355469 47.953125 65.824219 C 47.839844 65.398438 47.464844 65.097656 47.027344 65.082031 Z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#023FFF" }}>
                Payment confirmation is pending
              </h3>
              <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#727272" }}>
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
              initialValues={{ utrNumber: "", domain: domain, amount: amount }}
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
              {({ isSubmitting, isValid, dirty, errors, touched, handleChange }) => (
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
                    <div className="text-danger" style={{ display: "flex", marginTop: "5px", fontWeight: "500" }}>
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
                        width: "100px"
                      }}
                    >
                      Back
                    </Button>

                    <Button
                      variant="dark"
                      type="submit"
                      disabled={isSubmitting || (!isRecheck && !isValid) || !dirty}

                      style={{
                        background: "var(--them-color)",
                        borderColor: "var(--them-color)",
                        border: "none",
                        width: "100px"
                      }}
                    >
                      {isLoading ? (
                        <>
                          {secondsRemaining > 0 ? (
                            <span>
                              {Math.floor(secondsRemaining / 60)}:
                              {secondsRemaining % 60 < 10
                                ? "0" + (secondsRemaining % 60)
                                : secondsRemaining % 60}{" "}
                            </span>
                          ) : null}
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="ms-2"
                          />
                        </>
                      ) : isRecheck ? (
                        "Recheck UTR"
                      ) : (
                        "Submit"
                      )}
                    </Button>

                    {/* <Button
                      variant="dark"
                      type="submit"
                      disabled={isSubmitting || !isValid || !dirty}
                      style={{
                        background: "var(--them-color)",
                        borderColor: "var(--them-color)",
                        border: "none",
                        width: "100px"
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Spinner animation="border" size="sm" />
                          <span style={{ marginLeft: "5px" }}>Submitting...</span>
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button> */}
                  </div>
                </FormikForm>
              )}
            </Formik>
          </div>
          <div className="utr-image d-flex justify-content-center">
            <img src={utr1} alt="utr1" width="100%" />
            <img src={utr2} alt="utr2" width="100%" />
            <img src={utr3} alt="utr3" width="100%" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderTracking;
