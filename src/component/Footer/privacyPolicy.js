import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const PrivacyPolicy = () => {
  return (
    <Container className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p className="mb-4">
          This Privacy Policy describes how {window.location.hostname} and its affiliates (collectively "{window.location.hostname}, we, our, us") collect, use, share, protect, or otherwise process your information/personal data through our website {window.location.hostname} (hereinafter referred to as Platform).
        </p>
        <p className="mb-4">
          Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India, and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information, or availing of any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use, and the applicable service/product terms and conditions, and agree to be governed by the laws of India, including but not limited to the laws applicable to data protection and privacy. If you do not agree, please do not use or access our Platform.
        </p>

        <h2 className="text-xl font-semibold mb-2">Collection</h2>
        <p className="mb-4">
          We collect your personal data when you use our Platform, services, or otherwise interact with us during the course of our relationship and related information provided from time to time. Some of the information we may collect includes but is not limited to personal data/information provided to us during sign-up/registering or using our Platform, such as name, date of birth, address, telephone/mobile number, email ID, and/or any such information shared as proof of identity or address. Sensitive personal data such as payment information or biometric data may also be collected with your consent.
        </p>

        <h2 className="text-xl font-semibold mb-2">Usage</h2>
        <p className="mb-4">
          We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. Other purposes include order handling, customer experience enhancement, fraud detection, marketing research, and compliance with legal obligations.
        </p>

        <h2 className="text-xl font-semibold mb-2">Sharing</h2>
        <p className="mb-4">
          We may share your personal data internally within our group entities and with third parties such as business partners, service providers, and law enforcement agencies, as necessary for providing services, marketing, compliance, or legal obligations.
        </p>

        <h2 className="text-xl font-semibold mb-2">Security Precautions</h2>
        <p className="mb-4">
          To protect your personal data from unauthorized access or misuse, we adopt reasonable security practices and procedures. However, transmission of information over the internet is not completely secure, and users are advised to ensure the protection of their account credentials.
        </p>

        <h2 className="text-xl font-semibold mb-2">Data Deletion and Retention</h2>
        <p className="mb-4">
          You can delete your account through the Platform settings or by contacting us. We retain personal data for the necessary period required for its intended purpose or as mandated by law. Data may be anonymized for analytical purposes.
        </p>

        <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, rectify, update, or delete your personal data. Requests can be made directly on the Platform or through our contact information.
        </p>

        <h2 className="text-xl font-semibold mb-2">Consent</h2>
        <p className="mb-4">
          By using our Platform, you consent to the collection, use, and processing of your personal data as described in this Privacy Policy. You can withdraw your consent by contacting the Grievance Officer, but note that this may restrict your access to certain services.
        </p>

        <h2 className="text-xl font-semibold mb-2">Changes to this Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Significant changes will be communicated as required by applicable laws.
        </p>

        <h2 className="text-xl font-semibold mb-2">Grievance Officer</h2>
        <p className="mb-4">
          <strong>Name:</strong> { process.env.REACT_APP_FAM}<br />
          <strong>Designation:</strong> Proprietor<br />
          <strong>Address:</strong> { process.env.REACT_APP_ADDRESS }<br />
          <strong>Contact:</strong> support@{window.location.hostname}, Phone: { process.env.REACT_APP_MO}<br />
          <strong>Hours:</strong> Monday - Friday (9:00 AM - 6:00 PM)
        </p>
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
            className="mt-3"
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

export default PrivacyPolicy;
