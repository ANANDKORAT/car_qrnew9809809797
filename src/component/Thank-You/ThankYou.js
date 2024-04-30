import React, {useEffect} from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

const ThankYou = () => {
  const navigate = useNavigate();
  const {handleSetCartProducts}= useAuth();

  const generateOrderID = () => {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const orderId = generateOrderID();

    useEffect(() => {
        localStorage.removeItem("cartProducts");
        localStorage.removeItem("slectedData");
        localStorage.removeItem("address");
        handleSetCartProducts([]);
    }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
            padding: '10px 20px'
        }}
      >
        <h4>YOUR ORDER HAS BEEN RECEIVED</h4>
        <h5>Confirmation of Order Receipt and Payment Processing</h5>
        <p style={{ color: "red" }}>
            Please note that if your payment is unsuccessful, your order will be automatically canceled. Kindly ensure that you do not close any UPI app until the payment process is completed.
        </p>
        <h6>
            Upon successful processing, you will receive an order confirmation email containing detailed information about your order and a link to track its progress.
        </h6>
          <h6>
              {`Thank you for choosing ${window.location.hostname || ''}. If you have any questions or concerns, feel free to reach out to us.`}
          </h6>
        <p>
          <strong>Your Order id is:</strong>
          &nbsp;{orderId}
        </p>
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
