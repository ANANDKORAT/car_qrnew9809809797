import React, { useState } from "react";
import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";

const OrderTracking = () => {
  const [error, setError] = useState(false);
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
              Track Your Order
            </h3>
            <div class="Footer__Content Rte">
              Enter your order id and Track here your order here.
            </div>
            <Form
              method="post"
              action="#"
              accept-charset="UTF-8"
              className="my-3"
            >
              <input type="hidden" name="form_type" value="customer" />
              <input type="hidden" name="utf8" value="✓" />
              <input type="hidden" name="contact[tags]" value="newsletter" />
              <Form.Control size="lg" type="text" placeholder="Order Id" />
              {error && (
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#ff0000",
                    textAlign: "center",
                  }}
                >
                  Invalid order id.
                </div>
              )}
              <Button
                type="button"
                onClick={() => {
                  setError(true);
                }}
                variant="dark"
                className="mt-3"
              >
                Track
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderTracking;
