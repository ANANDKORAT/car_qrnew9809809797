import { useEffect, useRef, useState } from "react";
import "./index.css";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import payment_video_loop from "../../assets/cod_lat.gif";
import Countdown from "react-countdown";
import OfferCountdown from "../Header/OfferCountdown";


const Payment = () => {
    const {
        selectedProduct,
        totalPrice,
        totalDiscount,
        totalMRP,
        totalExtraDiscount,
        isPaymentPageLoading,
        setIsPaymentPageLoading
    } = useAuth();

    const [time, setTime] = useState(300);
    const [SelectedPaymentUpi, setSelectedPayment] = useState("Phone Pay");
    const [upi_id_phonepe, Set_upi_id_phonepe] = useState("");
    const [upi_id_all, Set_upi_id_all] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        Set_upi_id_phonepe(process.env.REACT_APP_UPI_ONLYPHONEPE);
        Set_upi_id_all(process.env.REACT_APP_UPI_ALL);
    }, []);

    useEffect(() => {
        let loadingTimeout = null;
        if (isLoading) {
            clearInterval(loadingTimeout);
            loadingTimeout = setTimeout(() => {
                setIsPaymentPageLoading(true);
            }, 10000);
        } else {
            clearInterval(loadingTimeout);
        }
        return () => {
            clearInterval(loadingTimeout);
        }
    }, [isLoading]);

    useEffect(() => {
        let navigateTimeout = null;
        if (isPaymentPageLoading) {
            clearInterval(navigateTimeout);
            navigateTimeout = setTimeout(() => {
                setIsPaymentPageLoading(false);
                setIsLoading(false);
                navigate("/order-comfirmation");
            }, 10000);
        } else {
            setIsLoading(false);
            clearInterval(navigateTimeout);
        }
        return () => {
            setIsLoading(false);
            clearInterval(navigateTimeout);
        }
    }, [isPaymentPageLoading]);

    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    return 0;
                } else return time - 1;
            });
        }, 1000);
    }, []);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            const payment_options = document.querySelector('#payment_options');
            const payment_bottom_block = document.querySelector('#payment_bottom_block');
            if (!payment_options?.contains(e.target) && !payment_bottom_block?.contains(e.target)) {
                if (isLoading) {
                    setIsLoading(false);
                }
            }
        });
    }, [isLoading]);

    function paynoeLogic() {
        let redirect_url = "";
        let orignal_name = window.location.hostname;
        let site_name = orignal_name.slice(0, 2);

        if (process.env.REACT_APP_ONLYPHONE_PE == "yes") {
            switch (SelectedPaymentUpi) {
                case "Phone Pay":
                    redirect_url =
                        "phonepe://pay?pa=" +
                        upi_id_phonepe +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&cu=INR&tn=" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "Paytm":
                    redirect_url =
                        "phonepe://pay?pa=" +
                        upi_id_phonepe +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&cu=INR&tn=" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "BHIM UPI":
                    redirect_url =
                        "phonepe://pay?pa=" +
                        upi_id_phonepe +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "Whatsapp Pay":
                    redirect_url =
                        "phonepe://pay?pa=" +
                        upi_id_phonepe +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;
            }
        }
        if (process.env.REACT_APP_ONLYPHONE_PE == "no") {
            switch (SelectedPaymentUpi) {
                case "Phone Pay":
                    redirect_url =
                        "phonepe://pay?pa=" +
                        upi_id_all +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&cu=INR&tn=phonepe-" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "Paytm":
                    redirect_url =
                        "paytmmp://pay?pa=" +
                        upi_id_all +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=paytm-" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "BHIM UPI":
                    redirect_url =
                        "bhim://pay?pa=" +
                        upi_id_all +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=bhim-" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "Whatsapp Pay":
                    redirect_url =
                        "whatsapp://pay?pa=" +
                        upi_id_all +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=whats-" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;
            }
        }
        if (process.env.REACT_APP_ONLYPHONE_PE == "twoupi") {
            switch (SelectedPaymentUpi) {
                case "Phone Pay":
                    redirect_url =
                        "phonepe://pay?pa=" +
                        upi_id_phonepe +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&cu=INR&tn=" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "Paytm":
                    redirect_url =
                        "paytmmp://pay?pa=" +
                        upi_id_all +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=paytm-" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "BHIM UPI":
                    redirect_url =
                        "bhim://pay?pa=" +
                        upi_id_all +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=bhim-" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;

                case "Whatsapp Pay":
                    redirect_url =
                        "whatsapp://pay?pa=" +
                        upi_id_all +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        totalPrice +
                        "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=whats-" +
                        site_name +
                        "&sign=4875421245fgjdjjhcbdfg";
                    break;
            }
        }
        if (SelectedPaymentUpi != "COD") {
            window.location.href = redirect_url;
            setIsLoading(true);
        } else if (process.env.REACT_APP_COD != "no") {
            navigate("/ThankYou");
        }
    }

    const handleMyPayment = (item) => {
        setSelectedPayment(item.name);
        setIsLoading(false);
    };

    const payment_option = [
        {
            name: "Phone Pay",
            icon: (
                <svg
                    version="1.1"
                    height={30}
                    width={30}
                    id="Layer_2"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="-51 -5 122 122"
                >
                    <g>
                        <circle className="st0" cx="10" cy="56" r="61" fill="#5F259F" />
                        <path
                            className="st1"
                            d="M37.7,40.1c0-2.4-2-4.4-4.4-4.4h-8.2L6.3,14.2c-1.7-2-4.4-2.7-7.2-2l-6.5,2c-1,0.3-1.4,1.7-0.7,2.4L12.5,36
h-31c-1,0-1.7,0.7-1.7,1.7v3.4c0,2.4,2,4.4,4.4,4.4h4.8v16.4c0,12.3,6.5,19.4,17.4,19.4c3.4,0,6.1-0.3,9.5-1.7v10.9
c0,3.1,2.4,5.5,5.5,5.5h4.8c1,0,2-1,2-2V45.2H36c1,0,1.7-0.7,1.7-1.7C37.7,43.5,37.7,40.1,37.7,40.1z M15.9,69.4
c-2,1-4.8,1.4-6.8,1.4c-5.5,0-8.2-2.7-8.2-8.9V45.5h15C15.9,45.5,15.9,69.4,15.9,69.4z"
                            fill="#ffffff"
                        />
                    </g>
                </svg>
            ),
        },
        {
            name: "Paytm",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="30px"
                    height="30px"
                >
                    <path
                        fill="#0d47a1"
                        d="M5.446 18.01H.548c-.277 0-.502.167-.503.502L0 30.519c-.001.3.196.45.465.45.735 0 1.335 0 2.07 0C2.79 30.969 3 30.844 3 30.594 3 29.483 3 28.111 3 27l2.126.009c1.399-.092 2.335-.742 2.725-2.052.117-.393.14-.733.14-1.137l.11-2.862C7.999 18.946 6.949 18.181 5.446 18.01zM4.995 23.465C4.995 23.759 4.754 24 4.461 24H3v-3h1.461c.293 0 .534.24.534.535V23.465zM13.938 18h-3.423c-.26 0-.483.08-.483.351 0 .706 0 1.495 0 2.201C10.06 20.846 10.263 21 10.552 21h2.855c.594 0 .532.972 0 1H11.84C10.101 22 9 23.562 9 25.137c0 .42.005 1.406 0 1.863-.008.651-.014 1.311.112 1.899C9.336 29.939 10.235 31 11.597 31h4.228c.541 0 1.173-.474 1.173-1.101v-8.274C17.026 19.443 15.942 18.117 13.938 18zM14 27.55c0 .248-.202.45-.448.45h-1.105C12.201 28 12 27.798 12 27.55v-2.101C12 25.202 12.201 25 12.447 25h1.105C13.798 25 14 25.202 14 25.449V27.55zM18 18.594v5.608c.124 1.6 1.608 2.798 3.171 2.798h1.414c.597 0 .561.969 0 .969H19.49c-.339 0-.462.177-.462.476v2.152c0 .226.183.396.422.396h2.959c2.416 0 3.592-1.159 3.591-3.757v-8.84c0-.276-.175-.383-.342-.383h-2.302c-.224 0-.355.243-.355.422v5.218c0 .199-.111.316-.29.316H21.41c-.264 0-.409-.143-.409-.396v-5.058C21 18.218 20.88 18 20.552 18c-.778 0-1.442 0-2.22 0C18.067 18 18 18.263 18 18.594L18 18.594z"
                    />
                    <path
                        fill="#00adee"
                        d="M27.038 20.569v-2.138c0-.237.194-.431.43-.431H28c1.368-.285 1.851-.62 2.688-1.522.514-.557.966-.704 1.298-.113L32 18h1.569C33.807 18 34 18.194 34 18.431v2.138C34 20.805 33.806 21 33.569 21H32v9.569C32 30.807 31.806 31 31.57 31h-2.14C29.193 31 29 30.807 29 30.569V21h-1.531C27.234 21 27.038 20.806 27.038 20.569L27.038 20.569zM42.991 30.465c0 .294-.244.535-.539.535h-1.91c-.297 0-.54-.241-.54-.535v-6.623-1.871c0-1.284-2.002-1.284-2.002 0v8.494C38 30.759 37.758 31 37.461 31H35.54C35.243 31 35 30.759 35 30.465V18.537C35 18.241 35.243 18 35.54 18h1.976c.297 0 .539.241.539.537v.292c1.32-1.266 3.302-.973 4.416.228 2.097-2.405 5.69-.262 5.523 2.375 0 2.916-.026 6.093-.026 9.033 0 .294-.244.535-.538.535h-1.891C45.242 31 45 30.759 45 30.465c0-2.786 0-5.701 0-8.44 0-1.307-2-1.37-2 0v8.44H42.991z"
                    />
                </svg>
            ),
        },
        {
            name: "BHIM UPI",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Layer_1"
                    width={24}
                    height={24}
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.88 60.05"
                >
                    <g>
                        <path
                            className="st2"
                            d="M111.45,19.26l-5.17,4.81l-0.17-0.13c0.59-2.19,1.18-4.39,1.78-6.58c1.5-5.45,3-10.89,4.51-16.34 c0-0.02,0-0.04,0-0.05c0-0.27,0.14-0.52,0.38-0.65c0.36-0.06,0.35,0.35,0.48,0.58c0.77,1.42,1.35,2.93,2.25,4.28 c0.85,2.06,1.84,4.11,2.91,6.06c0.13,0.2,0.21,0.43,0.21,0.67c0,0.41-0.21,0.8-0.56,1.02C115.82,15.02,113.64,17.15,111.45,19.26 L111.45,19.26z"
                        />
                        <path
                            className="st4"
                            d="M111.45,19.26c2.2-2.11,4.38-4.24,6.61-6.32c0.35-0.22,0.56-0.61,0.56-1.02c0-0.24-0.07-0.48-0.21-0.67 c-1.08-1.95-2.06-4-2.91-6.06l1.54-5.17c0.64,1.23,1.17,2.24,1.68,3.26c1.29,2.57,2.55,5.16,3.89,7.71 c0.18,0.25,0.27,0.55,0.27,0.86c0,0.51-0.26,0.99-0.7,1.26c-3.66,3.39-7.25,6.86-10.86,10.3c-0.23,0.3-0.54,0.53-0.9,0.65 C110.88,22.49,111.23,20.88,111.45,19.26L111.45,19.26L111.45,19.26z"
                        />
                        <path
                            className="st3"
                            d="M30.37,12.17c0.76,0.35,1.25,1.11,1.25,1.94c0,0.34-0.08,0.68-0.24,0.98c-0.6,1.95-1.09,3.92-1.63,5.89 c-0.15,1.86-1.71,3.29-3.57,3.29c-0.21,0-0.42-0.02-0.63-0.06c-8.27,0-16.53,0.01-24.8,0.02c-0.65,0-0.89-0.06-0.68-0.79 C2.2,15.9,4.3,8.35,6.39,0.8C6.44,0.35,6.82,0,7.27,0c0.04,0,0.09,0,0.13,0.01c8.51,0.02,17.03,0.01,25.54,0.03 C33.06,0.02,33.18,0,33.3,0c0.95,0,1.71,0.77,1.71,1.71c0,0.24-0.05,0.47-0.15,0.69c-0.64,2.52-1.34,5.02-2.07,7.52 C32.4,11.02,31.5,11.86,30.37,12.17L30.37,12.17z M85.39,59.94h-4.84l6.72-24.26h4.83L85.39,59.94L85.39,59.94z M45.21,58.42 c-0.26,0.96-1.15,1.63-2.14,1.63H18.15c-0.68,0-1.19-0.23-1.52-0.69c-0.33-0.46-0.41-1.04-0.21-1.72l6.08-21.9l4.84,0l-5.43,19.56 h19.34l5.43-19.56l4.83,0L45.21,58.42L45.21,58.42L45.21,58.42z M82.88,36.44c-0.33-0.46-0.85-0.69-1.55-0.69l-26.57,0l-1.31,4.76 h24.17l-1.41,5.08H56.87v-0.01h-4.83l-4.01,14.48h4.83l2.69-9.71h21.73c0.68,0,1.32-0.23,1.92-0.69s0.99-1.04,1.18-1.72l2.69-9.71 C83.27,37.49,83.21,36.9,82.88,36.44L82.88,36.44L82.88,36.44z M50.48,9.77c2.78,0,5.56-0.05,8.34,0.03 C58.88,9.8,58.94,9.81,59,9.81c0.7,0,1.27-0.54,1.32-1.23c0.65-2.48,1.35-4.95,1.96-7.44C62.3,0.5,62.82,0,63.45,0 c0.09,0,0.17,0.01,0.26,0.03c0.46,0.03,0.92,0.05,1.39,0.05c0.45,0,0.91-0.02,1.36-0.05c0.74-0.04,0.91,0.18,0.7,0.91 c-1.05,3.72-2.05,7.46-3.07,11.18c-0.98,3.59-1.98,7.18-2.93,10.78c-0.02,0.75-0.63,1.35-1.38,1.35c-0.11,0-0.22-0.01-0.33-0.04 c-0.46-0.04-0.92-0.06-1.38-0.06c-0.42,0-0.84,0.02-1.26,0.05c-0.71,0.03-0.82-0.2-0.63-0.86c0.76-2.6,1.44-5.22,2.19-7.82 c0.22-0.76,0.12-1.07-0.78-1.06c-5.66,0.04-11.33,0.04-16.99,0.01c-0.06-0.01-0.12-0.01-0.18-0.01c-0.62,0-1.13,0.48-1.16,1.1 c-0.66,2.62-1.43,5.22-2.12,7.83c-0.04,0.48-0.44,0.84-0.92,0.84c-0.06,0-0.12-0.01-0.18-0.02c-0.48-0.03-0.98-0.04-1.46-0.04 c-0.5,0-1,0.02-1.49,0.05c-1.03,0.07-0.86-0.46-0.68-1.1c1.11-4.03,2.22-8.07,3.32-12.1c0.93-3.39,1.86-6.78,2.77-10.17 c0.03-0.46,0.41-0.82,0.87-0.82c0.04,0,0.09,0,0.13,0.01c1.05,0.05,2.11,0.05,3.16,0c0.73-0.03,0.81,0.24,0.63,0.88 c-0.75,2.67-1.44,5.36-2.21,8.03c-0.21,0.71-0.03,0.85,0.64,0.84C44.64,9.75,47.56,9.77,50.48,9.77L50.48,9.77z M73,0.11 c0.35,0,0.7,0,1.05,0c1.4,0,1.41,0,1.05,1.29c-1.96,7.1-3.92,14.21-5.89,21.31c-0.44,1.59-0.46,1.59-2.09,1.59 c-0.77,0-1.55-0.02-2.32,0.01c-0.69,0.03-0.83-0.2-0.64-0.88c1.87-6.66,3.71-13.33,5.55-20c0.23-0.7,0.42-1.41,0.56-2.13 c0-0.02,0-0.03,0-0.05c0-0.67,0.54-1.2,1.21-1.2c0.12,0,0.25,0.02,0.36,0.06c0.21,0.02,0.43,0.02,0.65,0.02 C72.65,0.12,72.83,0.12,73,0.11L73,0.11L73,0.11z M100.08,13.09c-0.81,0.72-1.62,1.42-2.41,2.15c-3.03,2.78-6.04,5.58-9.06,8.38 c-0.5,0.47-0.76,0.55-1.15-0.14c-2.23-3.91-4.5-7.79-6.76-11.68c-0.07-0.1-0.16-0.2-0.25-0.28c-0.34,0.43-0.56,0.96-0.61,1.51 c-0.95,3.38-1.87,6.77-2.77,10.17c-0.02,0.58-0.49,1.03-1.07,1.03c-0.07,0-0.14-0.01-0.21-0.02c-1.01-0.08-2.04-0.03-3.06-0.01 c-0.47,0.01-0.73-0.06-0.56-0.66c2.12-7.65,4.23-15.31,6.33-22.97c0.05-0.08,0.11-0.16,0.18-0.23c0.41,0.37,0.74,0.82,0.97,1.32 c2.86,4.76,5.71,9.52,8.56,14.29c0.64,1.07,0.62,1.05,1.58,0.23c5.16-4.4,10.32-8.8,15.5-13.18c1.04-0.88,2.07-1.77,3.2-2.73 c0.02,0.12,0.03,0.25,0.03,0.38c0,0.39-0.1,0.78-0.28,1.12c-1.96,7.19-3.95,14.37-5.9,21.55c-0.03,0.51-0.46,0.91-0.97,0.91 c-0.06,0-0.12-0.01-0.17-0.02c-0.5-0.03-1.01-0.04-1.51-0.04c-0.48,0-0.97,0.01-1.45,0.04c-0.84,0.05-0.91-0.26-0.7-0.99 c0.89-3.14,1.74-6.3,2.6-9.45c0.05-0.09,0.08-0.19,0.08-0.29C100.22,13.33,100.17,13.19,100.08,13.09L100.08,13.09L100.08,13.09z M11.05,4.76c5.39,0.07,10.76-0.01,16.14-0.01c0.95,0,1.72,0.77,1.72,1.72c0,0.24-0.05,0.48-0.15,0.71c-0.27,1.5-1.58,2.6-3.11,2.6 C20.33,9.77,15,9.77,9.67,9.8c-0.88,0-0.91-0.35-0.69-1.03c0.35-1,0.64-2.01,0.86-3.04c0.01-0.55,0.46-0.98,1.01-0.98 C10.92,4.74,10.98,4.75,11.05,4.76L11.05,4.76z M8.11,14.47c5.35,0,10.71,0.01,16.07,0.03c1.84,0.01,2.57,1.7,1.49,3.44 c-0.58,0.98-1.63,1.58-2.77,1.58c-5.25,0-10.49-0.06-15.74,0.01c-0.81,0.01-1.19-0.1-0.86-1.04c0.37-1.06,0.63-2.16,0.9-3.24 C7.27,14.8,7.66,14.47,8.11,14.47L8.11,14.47z"
                        />
                        <polygon
                            className="st0"
                            points="100.46,35.72 106.57,47.88 93.71,60.04 95.24,54.53 102.27,47.88 98.93,41.23 100.46,35.72"
                        />
                        <polygon
                            className="st1"
                            points="96.16,35.72 102.27,47.88 89.41,60.04 96.16,35.72"
                        />
                    </g>
                </svg>
            ),
        },
        {
            name: "Whatsapp Pay",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="30px"
                    height="30px"
                    clip-rule="evenodd"
                >
                    <path
                        fill="#fff"
                        d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                    />
                    <path
                        fill="#fff"
                        d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                    />
                    <path
                        fill="#cfd8dc"
                        d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                    />
                    <path
                        fill="#40c351"
                        d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                    />
                    <path
                        fill="#fff"
                        fill-rule="evenodd"
                        d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                        clip-rule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: "COD",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                    viewBox="0 0 122.88 63.89"
                >
                    <path
                        d="M0 0h122.88v63.89H0V0zm54.49 21.42h13.9c.11 0 .22.11.22.22v2.14c0 .11-.11.22-.22.22h-4.35c.7.81 1.18 1.77 1.4 2.8h2.95c.11 0 .22.11.22.22v2.14c0 .11-.11.22-.22.22h-2.95c-.26 1.25-.92 2.4-1.84 3.28-1.18 1.14-2.84 1.84-4.65 1.84h-.18l7.82 8.89c.22.26-.15.77-.33.77l-3.61.04-8.33-9.51c-.07-.07-.07-.18-.07-.29v-3.47h4.72c.85 0 1.62-.33 2.18-.85.22-.22.41-.44.55-.7h-7.23c-.11 0-.22-.11-.22-.22v-2.14c0-.11.11-.22.22-.22h7.23c-.15-.26-.33-.48-.55-.7-.55-.52-1.33-.85-2.18-.85h-4.72v-3.58c0-.11.11-.22.22-.22l.02-.03zm6.93-8.26c10.4 0 18.8 8.41 18.8 18.8 0 10.4-8.41 18.8-18.8 18.8-10.4 0-18.8-8.41-18.8-18.8s8.4-18.8 18.8-18.8zM20.5 9.73h81.7c0 5.2 4.24 9.44 9.44 9.44v25.25c-5.2 0-9.44 4.24-9.44 9.44H20.5c0-5.2-4.24-9.44-9.44-9.44V19.17c5.2 0 9.44-4.24 9.44-9.44z"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                    />
                </svg>
            ),
        },
    ];

    return (
        isPaymentPageLoading ?
            <Container
                className="p-0 pt-3 pb-3 flex-column position-relative d-flex justify-content-center align-items-center"
                style={{ background: "#f2f2f3", height: '250px' }}
            >
                <div>
                    Please Wait...
                </div>
                <Spinner />
            </Container>
            : <Container
                className="p-0 pt-3 pb-3 position-relative d-flex flex-column justify-content-between"
                style={{ background: "#f2f2f3" }}
            >

                <div>
                    {/* <div className="m-0">
                        <Image
                            src={
                                "https://assets.myntassets.com/assets/images/retaillabs/2019/9/27/628c860b-eb02-46cb-a25d-4741cd5ba7131569578624285-banner--1-.png"
                            }
                            className="p-0 w-100"
                        />
                    </div> */}
                    <div>
                        <div className="line-draw"></div>
                        <div style={{ background: "white", display: "flex", justifyContent: "space-between" }}
                            className="p-3">

                            <h6
                                className="card-title px-4 text-start fw-bold pt-1 text-uppercase"
                                style={{ fontSize: "12px" }}
                            >
                                Recommended Payment Options
                            </h6>
                            <svg width="80" height="24" viewBox="0 0 80 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.1172 3C10.3409 3 9.04382 3.29813 7.82319 3.63C6.57444 3.9675 5.31557 4.36687 4.57532 4.60875C4.26582 4.71096 3.99143 4.8984 3.78367 5.14954C3.57591 5.40068 3.44321 5.70533 3.40082 6.0285C2.73032 11.0651 4.28619 14.7979 6.17394 17.2672C6.97447 18.3236 7.92897 19.2538 9.00557 20.0269C9.43982 20.334 9.84257 20.5691 10.1845 20.73C10.4995 20.8785 10.8382 21 11.1172 21C11.3962 21 11.7337 20.8785 12.0498 20.73C12.4621 20.5296 12.8565 20.2944 13.2288 20.0269C14.3054 19.2538 15.2599 18.3236 16.0604 17.2672C17.9482 14.7979 19.504 11.0651 18.8335 6.0285C18.7912 5.70518 18.6586 5.40035 18.4508 5.14901C18.2431 4.89768 17.9686 4.71003 17.659 4.60762C16.5845 4.25529 15.5015 3.92894 14.4112 3.62888C13.1905 3.29925 11.8934 3 11.1172 3ZM13.5314 9.68925C13.637 9.58363 13.7803 9.52429 13.9297 9.52429C14.079 9.52429 14.2223 9.58363 14.3279 9.68925C14.4335 9.79487 14.4929 9.93813 14.4929 10.0875C14.4929 10.2369 14.4335 10.3801 14.3279 10.4858L10.9529 13.8608C10.9007 13.9131 10.8386 13.9547 10.7703 13.9831C10.7019 14.0114 10.6287 14.026 10.5547 14.026C10.4807 14.026 10.4074 14.0114 10.3391 13.9831C10.2707 13.9547 10.2087 13.9131 10.1564 13.8608L8.46894 12.1733C8.41664 12.121 8.37516 12.0589 8.34685 11.9905C8.31855 11.9222 8.30398 11.849 8.30398 11.775C8.30398 11.701 8.31855 11.6278 8.34685 11.5595C8.37516 11.4911 8.41664 11.429 8.46894 11.3767C8.52124 11.3244 8.58333 11.283 8.65166 11.2547C8.71999 11.2264 8.79323 11.2118 8.86719 11.2118C8.94115 11.2118 9.01439 11.2264 9.08272 11.2547C9.15105 11.283 9.21314 11.3244 9.26544 11.3767L10.5547 12.6671L13.5314 9.68925Z"
                                    fill="#ADC6FF"></path>
                                <path
                                    d="M24.1172 3.53998L24.2472 4.65998L26.0372 3.67998V9.49998H27.1472V2.49998H26.1472L24.1172 3.53998Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M31.5958 9.64998C33.2058 9.64998 34.2458 8.19998 34.2458 5.99998C34.2458 3.79998 33.2058 2.34998 31.5658 2.34998C29.9458 2.34998 28.9158 3.79998 28.9158 5.99998C28.9158 8.19998 29.9458 9.64998 31.5958 9.64998ZM31.5958 8.62998C30.5958 8.62998 30.0658 7.55998 30.0658 5.99998C30.0658 4.43998 30.5858 3.36998 31.5658 3.36998C32.5658 3.36998 33.0958 4.43998 33.0958 5.99998C33.0958 7.55998 32.5658 8.62998 31.5958 8.62998Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M38.149 9.64998C39.759 9.64998 40.799 8.19998 40.799 5.99998C40.799 3.79998 39.759 2.34998 38.119 2.34998C36.499 2.34998 35.469 3.79998 35.469 5.99998C35.469 8.19998 36.499 9.64998 38.149 9.64998ZM38.149 8.62998C37.149 8.62998 36.619 7.55998 36.619 5.99998C36.619 4.43998 37.139 3.36998 38.119 3.36998C39.119 3.36998 39.649 4.43998 39.649 5.99998C39.649 7.55998 39.119 8.62998 38.149 8.62998Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M43.4923 6.24998C44.3823 6.24998 45.0923 5.55998 45.0923 4.29998C45.0923 3.03998 44.3823 2.34998 43.4923 2.34998C42.6123 2.34998 41.9023 3.03998 41.9023 4.29998C41.9023 5.55998 42.6123 6.24998 43.4923 6.24998ZM48.2923 2.49998H47.4323L42.7823 9.49998H43.6423L48.2923 2.49998ZM43.4923 5.43998C43.0623 5.43998 42.7623 5.06998 42.7623 4.29998C42.7623 3.52998 43.0623 3.15998 43.4923 3.15998C43.9223 3.15998 44.2323 3.52998 44.2323 4.29998C44.2323 5.06998 43.9223 5.43998 43.4923 5.43998ZM47.5823 9.64998C48.4723 9.64998 49.1823 8.95998 49.1823 7.69998C49.1823 6.43998 48.4723 5.74998 47.5823 5.74998C46.7023 5.74998 45.9923 6.43998 45.9923 7.69998C45.9923 8.95998 46.7023 9.64998 47.5823 9.64998ZM47.5823 8.83998C47.1523 8.83998 46.8523 8.46998 46.8523 7.69998C46.8523 6.92998 47.1523 6.55998 47.5823 6.55998C48.0223 6.55998 48.3223 6.92998 48.3223 7.69998C48.3223 8.46998 48.0223 8.83998 47.5823 8.83998Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M55.4541 9.64998C56.9141 9.64998 57.9341 8.78998 57.9341 7.47998C57.9341 4.79998 54.3341 5.96998 54.3341 4.29998C54.3341 3.69998 54.8141 3.34998 55.4641 3.34998C56.2141 3.34998 56.6841 3.78998 56.7941 4.42998L57.9041 4.22998C57.7241 3.12998 56.8241 2.34998 55.4941 2.34998C54.1441 2.34998 53.1741 3.16998 53.1741 4.39998C53.1741 7.07998 56.7641 5.90998 56.7641 7.59998C56.7641 8.22998 56.2541 8.65998 55.4841 8.65998C54.7941 8.65998 54.1341 8.28998 54.0141 7.57998L52.9041 7.81998C53.1041 8.98998 54.2041 9.64998 55.4541 9.64998Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M65.2964 9.49998L62.6764 2.45998H61.4064L58.7864 9.49998H59.9964L60.6264 7.68998H63.4264L64.0664 9.49998H65.2964ZM62.0564 3.73998L63.0864 6.65998H60.9964L62.0164 3.73998H62.0564Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M71.3322 2.49998H66.7522V9.49998H67.8922V6.54998H70.4722V5.50998H67.8922V3.53998H71.3322V2.49998Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M77.6917 2.49998H73.0417V9.49998H77.6917V8.45998H74.1817V6.49998H76.8417V5.44998H74.1817V3.53998H77.6917V2.49998Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M27.307 18.9C28.657 18.9 29.627 17.95 29.627 16.7C29.627 15.33 28.537 14.5 27.207 14.5H24.717V21.5H25.857V18.9H27.307ZM28.447 16.7C28.447 17.31 28.027 17.85 27.117 17.85H25.857V15.55H27.007C28.037 15.55 28.447 16.11 28.447 16.7Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M36.4524 21.5L33.8324 14.46H32.5624L29.9424 21.5H31.1524L31.7824 19.69H34.5824L35.2224 21.5H36.4524ZM33.2124 15.74L34.2424 18.66H32.1524L33.1724 15.74H33.2124Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M39.6613 21.5V18.57L42.0913 14.5H40.8413L39.1513 17.45H39.1013L37.4113 14.5H36.0813L38.5213 18.57V21.5H39.6613Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M50.8513 21.5V14.5H49.1513L47.1513 19.76H47.1113L45.1213 14.5H43.3513V21.5H44.4913V15.98H44.5313L46.6113 21.5H47.5913L49.6713 15.98H49.7113V21.5H50.8513Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M57.5103 14.5H52.8604V21.5H57.5103V20.46H54.0004V18.5H56.6604V17.45H54.0004V15.54H57.5103V14.5Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M65.3439 21.54V14.5H64.2039V19.78L60.5339 14.46H59.2639V21.5H60.4039V16.22L64.0739 21.54H65.3439Z"
                                    className="fill-grey-t2"></path>
                                <path d="M72.0671 14.5H66.7571V15.55H68.8471V21.5H69.9871V15.55H72.0671V14.5Z"
                                    className="fill-grey-t2"></path>
                                <path
                                    d="M75.4028 21.65C76.8628 21.65 77.8828 20.79 77.8828 19.48C77.8828 16.8 74.2828 17.97 74.2828 16.3C74.2828 15.7 74.7628 15.35 75.4128 15.35C76.1628 15.35 76.6328 15.79 76.7428 16.43L77.8528 16.23C77.6728 15.13 76.7728 14.35 75.4428 14.35C74.0928 14.35 73.1228 15.17 73.1228 16.4C73.1228 19.08 76.7128 17.91 76.7128 19.6C76.7128 20.23 76.2028 20.66 75.4328 20.66C74.7428 20.66 74.0828 20.29 73.9628 19.58L72.8528 19.82C73.0528 20.99 74.1528 21.65 75.4028 21.65Z"
                                    className="fill-grey-t2"></path>
                            </svg>
                        </div>
                        <div className="line-draw"></div>
                        <div className="mt-3 py-2 pt-3 pb-3" style={{ background: "#fff" }}>
                            {/* <div className="Offers-count">
                                <span className="text-decore">Offes Ends In</span>
                                <span style={{color: "#f38901", fontSize: "22px", fontWeight: "700"}}>
                                    {` ${Math.floor(time / 60)}`.padStart(2, 0)}min:
                                    {`${time % 60}`.padStart(2, 0)}sec
                                </span>
                            </div> */}
                            <div className="container p-3" style={{ textAlign: "center" , border : "none" }}>
                                 <span>
                                    <Countdown date={Date.now() + parseInt(process.env.REACT_APP_OFFER_TIME)} ref={ref} renderer={(e) => <OfferCountdown />} intervalDelay={1000} />
                                </span>
                            </div>
                            <div className="m-2">

                                <div
                                    className="mt-2"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        backgroundColor: "rgb(231, 238, 255)",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        borderRadius: "4px"
                                    }}
                                >
                                    <img src={payment_video_loop} style={{ width: "15%" }}></img>
                                    Pay online & get EXTRA ₹33 off
                                </div>
                            </div>

                            <div data-testid="PAY ONLINE" className="text-pay">
                                <span style={{ fontWeight: "600", fontSize: "12px" }}>PAY ONLINE</span>
                                <div className="hr-line"></div>
                            </div>
                            <Row className="mt-1 g-2 m-0 p-2" id="payment_options">
                                {payment_option.map((item) => (
                                    <Col md>
                                        <div
                                            className="fw-semibold"
                                            style={{
                                                border: `1px solid ${SelectedPaymentUpi === item.name ? "#ed143d" : "#ddd"
                                                    }`,
                                                borderRadius: "8px",
                                                padding: "15px 40px",
                                            }}
                                            onClick={() => {
                                                handleMyPayment(item);
                                            }}
                                        >
                                            <span className="d-flex align-items-center">
                                                <span>{item?.icon}</span>
                                                <span className="ms-2">{item.name}</span>
                                                {isLoading && SelectedPaymentUpi === item.name &&
                                                    <Spinner variant="secondary" className="ms-2" size="sm" />}
                                            </span>
                                            {process.env.REACT_APP_COD == "no" &&
                                                SelectedPaymentUpi === "COD" &&
                                                item.name === "COD" && (
                                                    <div
                                                        className="text-danger"
                                                        style={{ fontSize: "13px", textAlign: "center" }}
                                                    >
                                                        This Payment-Method are Not Allowed For This Offer
                                                        Products Choose Other Products Otherwise Change
                                                        Payment Method.
                                                    </div>
                                                )}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                    <div className="mt-3">
                        {selectedProduct?.length && (
                            <div className="bg-white px-4 py-4">
                                <h6
                                    id="product_details"
                                    className="card-title text-start fw-bold border-bottom pb-2"
                                >{`PRICE DETAILS (${selectedProduct?.length === 1
                                    ? "1 Item"
                                    : `${selectedProduct?.length} Items`
                                    })`}</h6>
                                <div className="mt-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center ">
                                        <span>Total MRP</span>
                                        <span className="ms-2">
                                            <span>
                                                <span className="">₹</span>
                                                {totalMRP}
                                            </span>
                                        </span>
                                    </div>
                                    {totalDiscount ? (
                                        <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                                            <span>Discount on MRP</span>
                                            <span className="ms-2 text-success">
                                                <span>
                                                    - <span className="">₹</span>
                                                    {totalDiscount}
                                                </span>
                                            </span>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {totalExtraDiscount &&
                                        process.env.REACT_APP_COUPON_APPLY == "true" ? (
                                        <>
                                            <div
                                                className="d-flex flex-row justify-content-between align-items-center mt-2 border-top pt-2">
                                                <span>Total Price</span>
                                                <span className="ms-2">
                                                    <span>
                                                        <span className="">₹</span>
                                                        {totalMRP - totalDiscount}
                                                    </span>
                                                </span>
                                            </div>
                                            <div
                                                className="d-flex flex-row justify-content-between align-items-center mt-2 ">
                                                <span>Coupon Applied (Buy 2 Get 1 free)</span>
                                                <span className="ms-2 text-success">
                                                    <span>
                                                        -<span className="">₹</span>
                                                        {totalExtraDiscount}
                                                    </span>
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    <div
                                        className="d-flex flex-row justify-content-between align-items-center mt-2 fw-bold border-top pt-3">
                                        <span>Total Amount</span>
                                        <span className="ms-2">
                                            <span>
                                                <span className="">₹</span>
                                                {totalPrice}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="position-sticky bottom-0 pb-3 bg-white px-4 mt-3 py-4 d-flex align-content-center justify-content-between"
                    id="payment_bottom_block">
                    <div
                        style={{
                            display: "inline-block",
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "#282c3f",
                            textAlign: "start",
                        }}
                    >
                        <h6 className="mb-0" style={{ fontWeight: "bold", fontSize: "22px" }}>₹{totalPrice}</h6>
                        <a
                            href="#product_details"
                            style={{
                                fontSize: "12px",
                                textDecoration: "none",
                                color: "#ff3f6c",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            VIEW DETAILS
                        </a>
                    </div>
                    <Button
                        className="d-flex justify-content-center align-items-center"
                        variant="dark"
                        style={{
                            width: "60%",
                            padding: "10px",
                            background: "var(--them-color)",
                            borderColor: "var(--them-color)",
                        }}
                        onClick={() => paynoeLogic()}
                    >
                        PAY NOW
                    </Button>
                </div>
            </Container>
    );
};

export default Payment;
