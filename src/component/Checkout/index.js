import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  InputGroup,
  Nav,
  Navbar,
  Form,
  Card,
  Row,
  Col,
  Button,
  Offcanvas,
  FloatingLabel,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultLensSettingValue = {
  mobile: "",
  pincode: "",
  address1: "",
  address2: "",
  town: "",
  city: "",
  state: "",
  saveAs: "",
};

const Checkout = () => {
  const {
    selectedProduct,
    setStep,
    address,
    setAddress,
    hideAddress,
    setHideAddress,
  } = useAuth();
  const navigate = useNavigate();
  const formikRef = useRef(null);

  const handleAddress = (values) => {
    setAddress(values);
    setHideAddress(true);
  };
  const [initialValues, setInitialValues] = useState({
    ...defaultLensSettingValue,
    ...address,
  });

  useEffect(() => {
    setInitialValues({ ...defaultLensSettingValue, ...address });
  }, [address]);

  useEffect(() => {
    if (hideAddress) {
      window.scrollTo(0, 0);
    }
  }, [hideAddress]);

  const validationSchema = Yup.object().shape({
    mobile: Yup.string().required("Mobile No is required"),
    // pincode: Yup.string().required("Pincode is required"),
    pincode: Yup.number()
      .required("Pincode is required")
      .integer("Pincode must be a whole number")
      .min(100000, "Pincode must be at least 6 digits")
      .max(999999, "Pincode must be at most 6 digits"),
    address1: Yup.string().required("Address is required"),
    town: Yup.string().required("Locality/Town is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    saveAs: Yup.string().required("SAVE ADDRESS AS is required"),
  });

  const state = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <Container
      className="p-0 pt-3 pb-3 position-relative d-flex flex-column justify-content-between"
      style={{ background: "#f2f2f3" }}
    >
      {!hideAddress ? (
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleAddress}
          innerRef={formikRef}
        >
          {({ values, getFieldProps, errors, touched, setFieldValue }) => {
            return (
              <Form>
                <Row className="g-2 ms-0 me-0">
                  <h6
                    className="card-title px-4 text-start fw-bold mb-2"
                    style={{ fontSize: "12px" }}
                  >
                    CONTACT DETAILS
                  </h6>
                  <div className="bg-white px-4 py-3">
                    <Col md className="mb-3">
                      <FloatingLabel controlId="mobile" label="Mobile">
                        <Form.Control
                          type="text"
                          name="mobile"
                          placeholder="Please enter Mobile Number!"
                          {...getFieldProps("mobile")}
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="span"
                        name={"mobile"}
                        className={`text-danger`}
                      />
                    </Col>

                    <Col md className="mb-3">
                      <FloatingLabel controlId="pincode" label="Pincode">
                        <Form.Control
                          type="number"
                          name="pincode"
                          placeholder="Please enter Pincode!"
                          {...getFieldProps("pincode")}
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="span"
                        name={"pincode"}
                        className={`text-danger`}
                      />
                    </Col>
                  </div>

                  <h6
                    className="card-title px-4 text-start fw-bold mb-2 mt-3"
                    style={{ fontSize: "12px" }}
                  >
                    ADDRESS
                  </h6>
                  <div className="bg-white px-4 py-3">
                    <Col md className="mb-3">
                      <FloatingLabel
                        controlId="address"
                        label="Address (House No, Building, Street, Area)"
                      >
                        <Form.Control
                          type="text"
                          name="address1"
                          placeholder="Please enter Address"
                          {...getFieldProps("address1")}
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="span"
                        name={"address1"}
                        className={`text-danger`}
                      />
                    </Col>
                    <Col md className="mb-3">
                      <FloatingLabel
                        controlId="address"
                        label="Address (House No, Building, Street, Area)"
                      >
                        <Form.Control
                          type="text"
                          name="address2"
                          placeholder="Please enter Address"
                          {...getFieldProps("address2")}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md className="mb-3">
                      <FloatingLabel controlId="town" label="Locality/Town">
                        <Form.Control
                          type="text"
                          name="town"
                          placeholder="Please enter locality/town"
                          {...getFieldProps("town")}
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="span"
                        name={"town"}
                        className={`text-danger`}
                      />
                    </Col>
                    <div className="d-flex align-items-center pe-3">
                      <Col md={6} xs={6} className="me-3">
                        <FloatingLabel controlId="city" label="City">
                          <Form.Control
                            type="text"
                            name="city"
                            placeholder="Please enter city"
                            {...getFieldProps("city")}
                          />
                        </FloatingLabel>
                        <ErrorMessage
                          component="span"
                          name={"city"}
                          className={`text-danger`}
                        />
                      </Col>
                      <Col md={6} xs={6}>
                        <FloatingLabel controlId="state" label="State">
                          <Form.Select name="state" {...getFieldProps("state")}>
                            {state.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                        <ErrorMessage
                          component="span"
                          name={"state"}
                          className={`text-danger`}
                        />
                      </Col>
                    </div>
                  </div>
                  <h6
                    className="card-title px-4 text-start fw-bold mb-2 mt-3"
                    style={{ fontSize: "12px" }}
                  >
                    SAVE ADDRESS AS
                  </h6>
                  <div className="bg-white px-4 py-3">
                  <div className="d-flex align-items-center">
                    <div
                      className={`addressFormUI-base-addressTypeIcon ${
                        values.saveAs === "Home"
                          ? "addressFormUI-base-selectedAddressType"
                          : ""
                      }`}
                      onClick={() => setFieldValue("saveAs", "Home")}
                    >
                      Home
                    </div>
                    <div
                      className={`addressFormUI-base-addressTypeIcon ${
                        values.saveAs === "Work"
                          ? "addressFormUI-base-selectedAddressType"
                          : ""
                      }`}
                      onClick={() => setFieldValue("saveAs", "Work")}
                    >
                      Work
                    </div>
                  </div>
                  <ErrorMessage
                    component="span"
                    name={"saveAs"}
                    className={`text-danger mb-3`}
                  />
                  </div>                  
                </Row>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div>
          <div className="addressBlocks-base-finalAddress">
            <div>
              <div className="addressDetails-base-addressTitle">
                <div className="addressDetails-base-name">{address?.name}</div>
                <div className="addressDetails-base-addressType ">
                  {address?.saveAs}
                </div>
              </div>
              <div className="addressDetails-base-address">
                <div className="addressDetails-base-addressField">
                  {address?.address}
                </div>
                <div>{address?.town}</div>
                <div>
                  {address?.city}, {address?.state} {address?.pincode}
                </div>
                <div className="addressDetails-base-mobile">
                  <span>Mobile: </span>
                  <span>{address.mobile}</span>
                </div>
              </div>
            </div>
            <Button
              className="addressBlocks-base-changeOrAddBtn w-100"
              variant="outline-secondary"
              onClick={() => {
                setHideAddress(false);
              }}
            >
              CHANGE OR ADD ADDRESS
            </Button>
          </div>
          <div className="mt-4 px-4">
            <h6 className="card-title text-start fw-bold">
              DELIVERY ESTIMATES
            </h6>
            {selectedProduct?.map((item) => (
              <div className="serviceability-base-list">
                <div className="serviceability-base-deliveryContainer d-flex align-items-center">
                  <img
                    src={item?.images?.[0]}
                    className="serviceability-base-imgStyle"
                  />
                  <div className="serviceability-base-deliveryInfo">
                    <div>
                      <div>
                        <span>Delivery between </span>
                        <span className="serviceability-base-estimatedDate">
                          {`${new Date(
                            Date.now() + 5 * 24 * 60 * 60 * 1000
                          ).getDate()} ${new Date(
                            Date.now() + 5 * 24 * 60 * 60 * 1000
                          ).toLocaleString("default", {
                            month: "short",
                          })}`}{" "}
                          -{" "}
                          {`${new Date(
                            Date.now() + 8 * 24 * 60 * 60 * 1000
                          ).getDate()} ${new Date(
                            Date.now() + 8 * 24 * 60 * 60 * 1000
                          ).toLocaleString("default", { month: "short" })}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="position-sticky bottom-0 pb-3 bg-white px-4 mt-4 py-4">
        <Button
          className="d-flex justify-content-center align-items-center"
          variant="dark"
          style={{
                        width: "100%",
            padding: "10px",
            background: "var(--them-color)",
            borderColor: "var(--them-color)",
          }}
          onClick={() => {
            if (hideAddress) {
              setStep(3);
              navigate("/checkout/payment");
            } else {
              formikRef?.current?.submitForm();
            }
          }}
        >
          {hideAddress ? "CONTINUE" : "ADD ADDRESS"}
        </Button>
      </div>
    </Container>
  );
};

export default Checkout;
