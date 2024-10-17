import { useEffect, useRef, useState } from "react";
import "./index.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const defaultLensSettingValue = {
    fullname: "",
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
        setStep(3);
        navigate("/checkout/payment");
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

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required("Full Name is required"),
        mobile: Yup.string().matches(phoneRegExp, 'Mobile No is not valid').required('Mobile No is required').min(10),
        // pincode: Yup.string().required("Pincode is required"),
        pincode: Yup.number()
            .required("Pincode is required")
            .integer("Pincode must be a whole number"),
        address1: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required")
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
                    {({ values, getFieldProps, errors, touched }) => {
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
                                        <Col md className="mb-2">
                                            <TextField id="outlined-basic" fullWidth controlId="fullname"
                                                label="Full Name" name="fullname"
                                                placeholder="Please Enter FullName"
                                                variant="outlined" {...getFieldProps("fullname")} />

                                            <ErrorMessage
                                                component="span"
                                                name={"fullname"}
                                                className={`text-danger`}
                                            />
                                        </Col>
                                        <Col md className="mb-2">
                                            <TextField id="outlined-basic" fullWidth type="number" controlId="mobile" label="Mobile"
                                                name="mobile" placeholder="Please Enter Mobile Number!"
                                                variant="outlined" {...getFieldProps("mobile")} />
                                            <ErrorMessage
                                                component="span"
                                                name={"mobile"}
                                                className={`text-danger`}
                                            />
                                        </Col>

                                        <Col md className="mb-2">
                                            <TextField id="outlined-basic" type="number" fullWidth controlId="pincode"
                                                label="Pincode" name="pincode"
                                                placeholder="Please Enter Pincode!"
                                                variant="outlined" {...getFieldProps("pincode")} />
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
                                            <TextField id="outlined-basic" type="text" fullWidth controlId="address"
                                                label="Address (House No, Building, Street, Area)"
                                                name="address1" placeholder="Please Enter Address"
                                                variant="outlined" {...getFieldProps("address1")} />
                                            <ErrorMessage
                                                component="span"
                                                name={"address1"}
                                                className={`text-danger`}
                                            />
                                        </Col>
                                        <Col md className="mb-3">
                                            <TextField id="outlined-basic" type="text" fullWidth controlId="address"
                                                label="Address (House No, Building, Street, Area)"
                                                name="address2" placeholder="Please Enter Address"
                                                variant="outlined" {...getFieldProps("address2")} />
                                        </Col>

                                        <div className="d-flex align-items-center pe-3">
                                            <Col md={6} xs={6} className="me-3">
                                                <TextField id="outlined-basic" type="text" fullWidth controlId="city"
                                                    label="City" name="city" placeholder="Please Enter City"
                                                    variant="outlined" {...getFieldProps("city")} />
                                                <ErrorMessage
                                                    component="span"
                                                    name={"city"}
                                                    className={`text-danger`}
                                                />
                                            </Col>
                                            <Col md={6} xs={6}>
                                                <TextField
                                                    id="outlined-select"
                                                    select
                                                    label="State"
                                                    name="state"
                                                    defaultValue="Andhra Pradesh"
                                                    fullWidth
                                                >
                                                    {state.map((item) => (
                                                        <MenuItem key={item} value={item}>
                                                            {item}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <ErrorMessage
                                                    component="span"
                                                    name={"state"}
                                                    className={`text-danger`}
                                                />
                                            </Col>
                                        </div>
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

                            </div>
                            <div className="addressDetails-base-address">
                                <div className="addressDetails-base-addressField">
                                    {address?.address}
                                </div>
                                <div>{address?.town}</div>
                                <div>
                                    Address As
                                    :- {address?.city}, {address?.address1} , {address?.address2} , {address?.pincode}
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

            <div className="position-sticky bottom-0 pb-3 bg-white px-4 mt-4 py-4" style={{ zIndex: "3" }}>
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
