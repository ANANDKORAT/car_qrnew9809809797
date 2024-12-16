import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const Shippingpolicy = () => {
  const hostname = window.location.hostname;

  return (
    <Container className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          At {hostname}, We Aim to Provide Efficient Delivery Services Across India
        </h2>
        <section className="mb-4">
          <h3 className="text-xl font-medium text-gray-700">Delivery Timeframe</h3>
          <p className="text-gray-600">
            All items purchased from our store are shipped across India and are typically delivered within 🚛 3 to 7 days from the order placement date and time.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-medium text-gray-700">Possible Delays</h3>
          <p className="text-gray-600">
            While we strive to ensure timely delivery, please understand that occasional delays may occur due to unforeseen circumstances beyond our control. We appreciate your patience and understanding in such situations.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-medium text-gray-700">Contact Us</h3>
          <p className="text-gray-600">
            If you have any questions or require assistance regarding your order or delivery, please don't hesitate to reach out to us at{" "}
            <a href={`mailto:support@${hostname}`} className="text-blue-600">
              support@{hostname}
            </a>
            . Our dedicated customer support team is here to help.
          </p>
        </section>
      </div>

      <div className="text-center mt-6">
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#727272", textAlign: "center" }}>
          Get Our Newsletter
        </h3>
        <div className="Footer__Content Rte">
          Subscribe to receive updates, access to exclusive deals, and more.
        </div>
        <Form
          method="post"
          action="/contact#footer-newsletter"
          id="footer-newsletter"
          acceptCharset="UTF-8"
          className="my-3"
        >
          <input type="hidden" name="form_type" value="customer" />
          <input type="hidden" name="utf8" value="✓" />
          <input type="hidden" name="contact[tags]" value="newsletter" />
          <Form.Control size="lg" type="email" placeholder="Enter email" className="mb-3" />
          <Button
            type="submit"
            variant="dark"
            style={{
              background: "var(--them-color)",
              borderColor: "var(--them-color)",
            }}
          >
            Subscribe
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Shippingpolicy;
