import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const generateOrderID = () => {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const orderId = generateOrderID();

  return (
    <div>
      <div
        style={{
          margin: "20px 140px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h4>YOUR ORDER HAS BEEN RECEIVED</h4>
        <h5>Thank You For Your Payment, it's Processing</h5>
        <p style={{ color: "red" }}>
          Note: If your payment is not successful by you, then your order will
          be canclled automatically! Please make sure do not close any upi app
          untill payment is done!
        </p>
        <h6>
          You Will receive an order confirmation email with details of your
          order and a link to track your process.
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
