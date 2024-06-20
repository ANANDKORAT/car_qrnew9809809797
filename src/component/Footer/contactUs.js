import {ErrorMessage, Formik} from "formik";
import {useState} from "react";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    mobile: Yup.number().required("Mobile No is required"),
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    message: Yup.string().required("Message is required"),
});

const ContactUs = () => {
    const [show, setShow] = useState(false);

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
                            Contact Us
                        </h3>
                        <div className="Footer__Content Rte">
                            <strong>Email us :- </strong> care@{window.location.hostname}
                            <br></br><br></br>
                            <strong>Address :- </strong> {process.env.REACT_APP_ADDRESS}
                            <br></br><br></br>
                        </div>
                        <div className="Footer__Content Rte">
                            We're here to help nd answer any question you might have. we look
                            forward to hearing from you
                        </div>
                        {show && (
                            <div className="text-success mt-3">
                                Your request submitted successfully! Our team will contact you
                                shortly.
                            </div>
                        )}
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{name: "", email: "", mobile: "", message: ""}}
                            enableReinitialize
                            onSubmit={(e, helpers) => {
                                setShow(true);

                                helpers.resetForm({
                                    name: "",
                                    email: "",
                                    mobile: "",
                                    message: "",
                                });
                            }}
                        >
                            {({getFieldProps, handleSubmit}) => {
                                return (
                                    <Row>
                                        <Form
                                            method="post"
                                            action="#"
                                            accept-charset="UTF-8"
                                            className="my-3"
                                        >
                                            <Col className="mb-3">
                                                <FloatingLabel controlId="name" label="Full Name">
                                                    <Form.Control
                                                        size="lg"
                                                        type="text"
                                                        placeholder="Full Name"
                                                        name="name"
                                                        {...getFieldProps("name")}
                                                    />
                                                </FloatingLabel>
                                                <ErrorMessage
                                                    component="span"
                                                    name={"name"}
                                                    className={`text-danger`}
                                                />
                                            </Col>
                                            <Col className="mb-3">
                                                <FloatingLabel controlId="Email" label="Email">
                                                    <Form.Control
                                                        size="lg"
                                                        type="email"
                                                        placeholder="Email"
                                                        name="email"
                                                        {...getFieldProps("email")}
                                                    />
                                                </FloatingLabel>
                                                <ErrorMessage
                                                    component="span"
                                                    name={"email"}
                                                    className={`text-danger`}
                                                />
                                            </Col>
                                            <Col className="mb-3">
                                                <FloatingLabel controlId="Mobile" label="Mobile">
                                                    <Form.Control
                                                        size="lg"
                                                        type="number"
                                                        placeholder="Mobile"
                                                        name="mobile"
                                                        {...getFieldProps("mobile")}
                                                    />
                                                </FloatingLabel>
                                                <ErrorMessage
                                                    component="span"
                                                    name={"mobile"}
                                                    className={`text-danger`}
                                                />
                                            </Col>
                                            <Col className="mb-3">
                                                <FloatingLabel
                                                    controlId="floatingTextarea2"
                                                    label="Message"
                                                >
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder="Leave a message here"
                                                        style={{height: "100px"}}
                                                        name="message"
                                                        {...getFieldProps("message")}
                                                    />
                                                </FloatingLabel>
                                                <ErrorMessage
                                                    component="span"
                                                    name={"message"}
                                                    className={`text-danger`}
                                                />
                                            </Col>
                                            <Button
                                                type="button"
                                                variant="dark"
                                                className="mt-3"
                                                onClick={handleSubmit}
                                                style={{
                                                    background: "var(--them-color)",
                                                    borderColor: "var(--them-color)",
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    </Row>
                                );
                            }}
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;
