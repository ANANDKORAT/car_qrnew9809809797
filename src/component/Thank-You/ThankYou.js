import React from "react";
import {Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <div>
        <img
          src="https://media.istockphoto.com/id/1332555216/vector/thank-you-for-your-order-card-design-for-online-buyers-illustration-vector.jpg?s=612x612&w=0&k=20&c=nqK6xXTZ9VSl38sjIylEBdTiqFRUjuKAkvHp8z32mKU="
          alt="Thank You Image"
          width={"100%"}
        />
        <Button
            variant="dark"
            className="btn my-3 primary d-flex m-auto justify-content-center align-items-center ripple animated"
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
            Go to Home
        </Button>
    </div>
  );
};

export default ThankYou;
