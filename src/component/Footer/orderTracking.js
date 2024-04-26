import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderTracking = ({ isAfterPayment = false }) => {
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    /*useEffect(() => {
        if (isAfterPayment) {
            setTimeout(() => {
                navigate("/ThankYou");
            }, 120000);
        }
    }, []);*/

    return (
        <Container>
            <Row>
                <Col>
                    <div className="text-center mt-5">
                        <h3
                            style={{
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "#727272",
                                textAlign: "center",
                            }}
                        >
                            {`Track Your ${isAfterPayment ? "UTR Number" : "Order"}`}
                        </h3>
                        {!isAfterPayment && (
                            <div className="Footer__Content Rte">
                                Enter your order id and Track here your order here.
                            </div>
                        )}
                        <Form
                            method="post"
                            action="#"
                            accept-charset="UTF-8"
                            className="my-3"
                        >
                            <Form.Control
                                size="lg"
                                type="text"
                                onChange={(e) => setValue(e.target.value)}
                                onBlur={() => {
                                    isAfterPayment && value ? setError(false) : setError(true);
                                }}
                                placeholder={isAfterPayment ? "UTR number" : "Order Id"}
                            />
                            {error && (
                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        color: "#ff0000",
                                        textAlign: "center",
                                    }}
                                >
                                    {`Invalid ${isAfterPayment ? "UTR number" : "order id"}.`}
                                </div>
                            )}
                            <div className="d-flex justify-content-center">
                                {isAfterPayment && <Button
                                    type="button"
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                    variant="dark"
                                    className="mt-3 me-2"
                                    style={{
                                        background: "var(--them-color)",
                                        borderColor: "var(--them-color)",
                                    }}
                                >
                                    Back
                                </Button>}
                                <Button
                                    type="button"
                                    onClick={() => {
                                        if (isAfterPayment && !error && value) {
                                            navigate("/ThankYou");
                                        } else {
                                            setError(true);
                                        }
                                    }}
                                    variant="dark"
                                    className="mt-3"
                                    style={{
                                        background: "var(--them-color)",
                                        borderColor: "var(--them-color)",
                                    }}
                                >
                                    {isAfterPayment ? "Submit" : "Track"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderTracking;
