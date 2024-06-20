import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const MyAccount = () => {
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
              My Account
            </h3>
            <Form
              method="post"
              action="#"
              accept-charset="UTF-8"
              className="my-3"
            >
              {error && (
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#ff0000",
                    textAlign: "center",
                  }}
                  className="mb-3"
                >
                  Invalid Email or Password.
                </div>
              )}
              <Form.Control
                size="lg"
                type="email"
                placeholder="Enter your email"
                className="mb-3"
              />
              <Form.Control
                size="lg"
                type="password"
                placeholder="Enter your password"
              />
              <Button
                type="button"
                onClick={() => {
                  setError(true);
                }}
                variant="dark"
                className="mt-3"
                style={{
                    background: "var(--them-color)",
                    borderColor: "var(--them-color)",
                }}
              >
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccount;
