import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";
const ThankYou = () => {
  const navigate = useNavigate();
  const { handleSetCartProducts, totalPrice } = useAuth();
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
  const [utr, setUTR] = useState(() => localStorage.getItem("utrNumber") || "");
  const [orderId, setOrderId] = useState(() => {
    const savedUTR = localStorage.getItem("utrNumber");
    return savedUTR ? getOrderIDForUTR(savedUTR) : null;
  });

  const utrNumber = localStorage.getItem("utrNumber");

  useEffect(() => {
    if (utr) {
      const newOrderId = getOrderIDForUTR(utr);
      setOrderId(newOrderId);
      localStorage.setItem("utrNumber", utr);
    }
    localStorage.removeItem("cartProducts");
    localStorage.removeItem("slectedData");
    localStorage.removeItem("address");
    handleSetCartProducts([]);
  }, [utr]);
  return (
    <div>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px 20px",
        }}
      >
        <h4>YOUR ORDER HAS BEEN RECEIVED</h4>
        <h5>Confirmation of Order Receipt and Payment Processing</h5>
        <p style={{ color: "red" }}>
          Please note that if your payment is unsuccessful, your order will be
          automatically canceled. Kindly ensure that you do not close any UPI
          app until the payment process is completed.
        </p>
        <h6>
          Upon successful processing, you will receive an order confirmation
          email containing detailed information about your order and a link to
          track its progress.
        </h6>
        <h6>
          {`Thank you for choosing ${
            window.location.hostname || ""
          }. If you have any questions or concerns, feel free to reach out to us.`}
        </h6>
        <p>
          <strong>Your Order id is:</strong>
          &nbsp;{utrNumber}
        </p>
        <strong>Your Amount is:</strong>
        &nbsp;{totalPrice}
      </div>
      <Button
        variant="dark"
        className="btn my-3 primary d-flex m-auto justify-content-center align-items-center ripple animated"
        style={{
          padding: "10px 20px",
          background: "var(--them-color)",
          borderColor: "var(--them-color)",
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
        Go to Home
      </Button>
    </div>
  );
};
export default ThankYou;
