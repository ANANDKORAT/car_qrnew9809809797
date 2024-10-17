import { useEffect, useRef, useState } from "react";
import "./index.css";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import payment_video_loop from "../../assets/cod_lat.gif";
import Countdown from "react-countdown";
import OfferCountdown from "../Header/OfferCountdown";
import { Modal } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import { isAndroid, isIOS } from "react-device-detect";
import html2canvas from "html2canvas";

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
    const [showOptions, setShowOptions] = useState(true);
    const [selectedPayment, setSelectedPayments] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gpayupi = process.env.REACT_APP_GPAY;
    const phonepayupi = process.env.REACT_APP_PHONE_PAY;
    const paytmupi = process.env.REACT_APP_PAYTM
    const payeename = "Test";
    const [amount, setAmount] = useState(2);

    useEffect(() => {
        Set_upi_id_phonepe(process.env.REACT_APP_UPI_ONLYPHONEPE);
        Set_upi_id_all(process.env.REACT_APP_UPI_ALL);
    }, []);

    const timeoutDuration = selectedPayment === "Google Pay" ? 0 : 10000;

    useEffect(() => {
        let loadingTimeout = null;
        if (isLoading) {
            clearInterval(loadingTimeout);
            loadingTimeout = setTimeout(() => {
                setIsPaymentPageLoading(true);
            }, timeoutDuration);
        } else {
            clearInterval(loadingTimeout);
        }
        return () => {
            clearInterval(loadingTimeout);
        }
    }, [isLoading,selectedPayment]);

   
   useEffect(() => {
        let navigateTimeout = null;
        if (isPaymentPageLoading) {
            clearInterval(navigateTimeout);
            navigateTimeout = setTimeout(() => {
                setIsPaymentPageLoading(false);
                setIsLoading(false);
                navigate("/order-comfirmation");
            }, timeoutDuration);
        } else {
            setIsLoading(false);
            clearInterval(navigateTimeout);
        }
        return () => {
            setIsLoading(false);
            clearInterval(navigateTimeout);
        }
    }, [isPaymentPageLoading, selectedPayment]);

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

    const generateUPIURL = (
        gpayupi,
        payeeName,
        amount,
        transactionNote = "Payment"
    ) => {
        //   return `upi://pay?pa=${encodeURIComponent(gpayupi)}&pn=${encodeURIComponent(
        //     payeeName
        //   )}&&mc=8999&cu=INR&tn=9098787675679&am=${encodeURIComponent(
        //     amount
        //   )}&cu=INR&tn=${encodeURIComponent(
        //     transactionNote
        //   )}&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr`;
        // };
        // "intent://h.razor-pay.com/pay/pay.php?pa=MAB0451282A0207967@YESBANK&am=2#Intent;scheme=https;package=com.android.chrome;end";
        return redirect_url;
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let redirect_url = "";
    let orignal_name = window.location.hostname;
    let site_name = orignal_name.slice(0, 2);
   
    function paynoeLogic() {
        let redirect_url = "";
        let orignal_name = window.location.hostname;
        let site_name = orignal_name.slice(0, 2);
     
            switch (selectedPayment) {
                case "Google Pay":
                    redirect_url = `intent://h.razor-pay.com/pay/pay.php?pa=${gpayupi}&am=${amount}#Intent;scheme=https;package=com.android.chrome;end`;
                    break;
                case "Phone Pay":
                    redirect_url =
                        "phonepe://upi//pay?pa=" +
                        phonepayupi +
                        "&pn==" +
                        site_name +
                        "&am=" +
                        amount +
                        "&cu=INR";
                    break;
                case "Paytm":
                    redirect_url =
                        "paytmmp://cash_wallet?pa=" +
                        paytmupi +
                        "&pn=" +
                        site_name +
                        "&am=" +
                        amount +
                        "&tr=&mc=8999&cu=INR&tn=987986756875" +
                        "&url=&mode=02&purpose=00&orgid=159002&sign=MEQCIDsRrRTBN5u+J9c16TUURJ4IMiPQQ/Sj1WXW7Ane85mYAiBuwEHt/lPXmMKRjFFnz6+jekgTsKWwyTx44qlCXFkfpQ==&featuretype=money_transfer";
                    break;
                default:
                    break;
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
        isAndroid && {
            name: "Google Pay",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                    width="35px"
                    height="30px"
                    viewBox="0 -19 256 256"
                    version="1.1"
                    preserveAspectRatio="xMidYMid"
                >
                    <g>
                        <path
                            d="M232.503966,42.1689673 C207.253909,27.593266 174.966113,36.2544206 160.374443,61.5045895 L123.592187,125.222113 C112.948983,143.621675 126.650534,150.051007 141.928772,159.211427 L177.322148,179.639204 C189.30756,186.552676 204.616725,182.448452 211.530197,170.478784 L249.342585,104.997327 C262.045492,82.993425 254.507868,54.8722676 232.503966,42.1689673 Z"
                            fill="#EA4335"
                        ></path>
                        <path
                            d="M190.884248,68.541767 L155.490872,48.1141593 C135.952653,37.2682465 124.888287,36.5503588 116.866523,49.3002175 L64.6660169,139.704135 C50.0900907,164.938447 58.7669334,197.211061 84.0012455,211.755499 C106.005147,224.458406 134.126867,216.920782 146.829774,194.91688 L200.029486,102.764998 C206.973884,90.7801476 202.869661,75.4552386 190.884248,68.541767 Z"
                            fill="#FBBC04"
                        ></path>
                        <path
                            d="M197.696506,22.068674 L172.836685,7.71148235 C145.33968,-8.15950938 110.180221,1.25070674 94.3093189,28.7478917 L46.9771448,110.724347 C39.9857947,122.818845 44.1369141,138.299511 56.2315252,145.275398 L84.0720952,161.34929 C97.8203166,169.292894 115.392174,164.5797 123.335778,150.830917 L177.409304,57.1816314 C188.614245,37.7835939 213.411651,31.1355838 232.809294,42.3404686 L197.696506,22.068674 Z"
                            fill="#34A853"
                        ></path>
                        <path
                            d="M101.033296,52.202526 L74.1604429,36.7216914 C62.1750303,29.8240204 46.8660906,33.9126683 39.9527877,45.8666484 L7.71149357,101.579108 C-8.15952065,128.997954 1.25071234,164.079816 28.7479029,179.904047 L49.2069432,191.685907 L74.0198681,205.980684 L84.7879024,212.176099 C65.670846,199.37985 59.6002612,173.739558 71.2887797,153.545698 L79.6378018,139.126091 L110.20946,86.3008703 C117.107187,74.3784352 113.002964,59.1001971 101.033296,52.202526 Z"
                            fill="#4285F4"
                        ></path>
                    </g>
                </svg>
            ),
        },
        isIOS && {
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
        isAndroid && {
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
        process.env.REACT_APP_COD === "yes" && {
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

    const payment_option_show = payment_option.filter(Boolean);


    const [showModal, setShowModal] = useState(false);
    const handleQrShow = () => setShowModal(true);
    const handleQrClose = () => setShowModal(false);
    const qrRef = useRef();

    const isMobileVerified = process.env.REACT_APP_MOBILE_VERIFIED === "yes";
    const qrcode = process.env.REACT_APP_QR;

    const downloadQRCode = () => {
        const qrElement = qrRef.current; // The element containing the QR code
        if (qrElement) {
            // Use html2canvas to capture the screenshot of the QR code element
            html2canvas(qrElement, { scale: 2 }) // Set scale to 2 for higher resolution
                .then((canvas) => {
                    // Convert the canvas to a data URL and trigger the download
                    const link = document.createElement("a");
                    link.href = canvas.toDataURL("image/png"); // Use PNG format
                    link.download = "qrcode.png"; // File name
                    document.body.appendChild(link);
                    link.click(); // Trigger the download
                    document.body.removeChild(link); // Clean up the link
                })
                .catch((err) => {
                    console.error("Failed to capture QR code screenshot", err);
                });
        }
    };

    const upiURL = `upi://pay?pa=${qrcode}&pn=${"chirag"}&am=${totalPrice}&cu=INR`;

    const svgQR = (
        <svg xmlns="http://www.w3.org/2000/svg" href="http://www.w3.org/1999/xlink" height={35} width={35} version="1.1" id="Layer_1" viewBox="0 0 512 512">
            <g>
                <path d="M428.522,166.957h-66.783c-9.217,0-16.696-7.473-16.696-16.696V83.478   c0-9.223,7.479-16.696,16.696-16.696h66.783c9.217,0,16.696,7.473,16.696,16.696v66.783   C445.217,159.484,437.739,166.957,428.522,166.957z" />
                <rect x="278.261" y="278.261" width="25" height="25" />
                <rect x="278.261" y="345.043" width="25" height="25" />
                <rect x="278.261" y="411.826" width="25" height="25" />
                <rect x="311.652" y="311.652" width="25" height="25" />
                <rect x="311.652" y="378.435" width="25" height="25" />
                <rect x="311.652" y="445.217" width="25" height="25" />
                <rect x="345.043" y="278.261" width="25" height="25" />
                <rect x="345.043" y="345.043" width="25" height="25" />
                <rect x="345.043" y="411.826" width="25" height="25" />
                <rect x="378.435" y="311.652" width="25" height="25" />
                <rect x="378.435" y="378.435" width="25" height="25" />
                <rect x="378.435" y="445.217" width="25" height="25" />
            </g>
            <g>
                <rect x="411.826" y="278.261" width="25" height="25" />
                <rect x="411.826" y="345.043" width="25" height="25" />
                <rect x="411.826" y="411.826" width="25" height="25" />
                <rect x="445.217" y="311.652" width="25" height="25" />
                <rect x="445.217" y="378.435" width="25" height="25" />
                <rect x="445.217" y="445.217" width="25" height="25" />
            </g>
            <g>
                <rect x="278.261" y="478.609" width="25" height="25" />
                <rect x="345.043" y="478.609" width="25" height="25" />
            </g>
            <g>
                <rect x="411.826" y="478.609" width="25" height="25" />
                <rect x="478.609" y="278.261" width="25" height="25" />
                <rect x="478.609" y="345.043" width="25" height="25" />
                <rect x="478.609" y="411.826" width="25" height="25" />
                <rect x="478.609" y="478.609" width="25" height="25" />
            </g>
            <path d="M512,16.696C512,7.473,504.521,0,495.304,0H395.13" />
            <path d="M428.522,66.783H395.13v100.174h33.391c9.217,0,16.696-7.473,16.696-16.696V83.478  C445.217,74.256,437.739,66.783,428.522,66.783z" />
            <path d="M150.261,166.957H83.478c-9.217,0-16.696-7.473-16.696-16.696V83.478  c0-9.223,7.479-16.696,16.696-16.696h66.783c9.217,0,16.696,7.473,16.696,16.696v66.783  C166.957,159.484,159.478,166.957,150.261,166.957z" />
            <path d="M150.261,66.783H116.87v100.174h33.391c9.217,0,16.696-7.473,16.696-16.696V83.478  C166.957,74.256,159.478,66.783,150.261,66.783z" />
            <path d="M150.261,445.217H83.478c-9.217,0-16.696-7.473-16.696-16.696v-66.783  c0-9.223,7.479-16.696,16.696-16.696h66.783c9.217,0,16.696,7.473,16.696,16.696v66.783  C166.957,437.744,159.478,445.217,150.261,445.217z" />
            <path d="M150.261,345.043H116.87v100.174h33.391c9.217,0,16.696-7.473,16.696-16.696v-66.783  C166.957,352.516,159.478,345.043,150.261,345.043z" />
            <g>
                <path d="M217.043,233.739H16.696C7.479,233.739,0,226.266,0,217.043V16.696C0,7.473,7.479,0,16.696,0   h200.348c9.217,0,16.696,7.473,16.696,16.696v200.348C233.739,226.266,226.261,233.739,217.043,233.739z M33.391,200.348h166.957   V33.391H33.391V200.348z" />
                <path d="M217.043,512H16.696C7.479,512,0,504.527,0,495.304V294.957c0-9.223,7.479-16.696,16.696-16.696   h200.348c9.217,0,16.696,7.473,16.696,16.696v200.348C233.739,504.527,226.261,512,217.043,512z M33.391,478.609h166.957V311.652   H33.391V478.609z" />
            </g>
            <g>
                <path d="M217.043,0H116.87v33.391h83.478v166.957H116.87v33.391h100.174c9.217,0,16.696-7.473,16.696-16.696   V16.696C233.739,7.473,226.261,0,217.043,0z" />
                <path d="M217.043,278.261H116.87v33.391h83.478v166.957H116.87V512h100.174   c9.217,0,16.696-7.473,16.696-16.696V294.957C233.739,285.734,226.261,278.261,217.043,278.261z" />
                <rect x="395.13" y="311.652" width="16.696" height="33.391" />
                <rect x="395.13" y="378.435" width="16.696" height="33.391" />
                <rect x="395.13" y="445.217" width="16.696" height="33.391" />
            </g>
            <path d="M495.304,233.739H294.957c-9.217,0-16.696-7.473-16.696-16.696V16.696  C278.261,7.473,285.739,0,294.957,0h200.348C504.521,0,512,7.473,512,16.696v200.348C512,226.266,504.521,233.739,495.304,233.739z   M311.652,200.348h166.957V33.391H311.652V200.348z" />
            <path d="M495.304,0H395.13v33.391h83.478v166.957H395.13v33.391h100.174c9.217,0,16.696-7.473,16.696-16.696  V16.696C512,7.473,504.521,0,495.304,0z" />
        </svg>
    )

    return (
        isPaymentPageLoading && selectedPayment !== "Google Pay" ?
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
                            <div className="container p-3" style={{ textAlign: "center", border: "none" }}>
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
                            {/* <Row className="mt-1 g-2 m-0 p-2" id="payment_options">
                                {payment_option_show.map((item) => (
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
                                            {process.env.REACT_APP_COD === "yes" &&
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
                            </Row> */}

                            {showOptions && (
                                <div className="">
                                    <Row className="g-2 m-0 p-2" id="payment_options">
                                        {/* Filter options based on the platform */}
                                        {isAndroid
                                            ? payment_option_show.map((item) => (
                                                <Col md key={item.name}>
                                                    <div
                                                        className="fw-semibold"
                                                        style={{
                                                            cursor: "pointer",
                                                            border: `1px solid ${selectedPayment === item.name
                                                                ? "#ed143d"
                                                                : "#ddd"
                                                                }`,
                                                            borderRadius: "30px",
                                                            padding: "15px 40px",
                                                            color: "black",
                                                        }}
                                                        onClick={() => {
                                                            setSelectedPayments(item.name);
                                                        }}
                                                    >
                                                        <span className="d-flex align-items-center">
                                                            <span>{item?.icon}</span>
                                                            <span className="ms-4">{item.name}</span>
                                                            {isLoading && selectedPayment === item.name &&  selectedPayment !== "Google Pay" && (
                                                                <Spinner
                                                                    variant="secondary"
                                                                    className="ms-2"
                                                                    size="sm"
                                                                />
                                                            )}
                                                        </span>
                                                        {process.env.REACT_APP_COD === "yes" && (
                                                            <div
                                                                className="text-danger"
                                                                style={{
                                                                    fontSize: "13px",
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                This Payment-Method is Not Allowed For This
                                                                Offer Products. Choose Other Products or Change
                                                                Payment Method.
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                            ))
                                            : payment_option_show
                                                .filter((item) => item.name === "Phone Pay") // Only show Phone Pay on iOS
                                                .map((item) => (
                                                    <Col md key={item.name}>
                                                        <div
                                                            className="fw-semibold"
                                                            style={{
                                                                cursor: "pointer",
                                                                border: `1px solid ${selectedPayment === item.name
                                                                    ? "#ed143d"
                                                                    : "#ddd"
                                                                    }`,
                                                                borderRadius: "30px",
                                                                padding: "15px 40px",
                                                                color: "black",
                                                            }}
                                                            onClick={() => {
                                                                setSelectedPayments(item.name);
                                                            }}
                                                        >
                                                            <span className="d-flex align-items-center">
                                                                <span>{item?.icon}</span>
                                                                <span className="ms-4">{item.name}</span>
                                                                {isLoading && selectedPayment === item.name && (
                                                                    <Spinner
                                                                        variant="secondary"
                                                                        className="ms-2"
                                                                        size="sm"
                                                                    />
                                                                )}
                                                            </span>
                                                            {process.env.REACT_APP_COD === "yes" && (
                                                                <div
                                                                    className="text-danger"
                                                                    style={{
                                                                        fontSize: "13px",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    This Payment-Method is Not Allowed For This
                                                                    Offer Products. Choose Other Products or
                                                                    Change Payment Method.
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Col>
                                                ))}
                                    </Row>
                                </div>
                            )}

                            <Row className="mt-1 g-2 m-0 p-2" id="payment_options">
                                <div data-testid="PAY ONLINE" className="text-pay">
                                    <span style={{ fontWeight: "600", fontSize: "12px" }}>PAY BY SCANNER</span>
                                    <div className="hr-line"></div>
                                </div>
                                <Col md>
                                    <div
                                        className="fw-semibold"
                                        style={{
                                            border: "1px solid #ddd",
                                            borderRadius: "8px",
                                            padding: "10px 30px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "25px"
                                        }}
                                        onClick={handleQrShow}
                                    >
                                        <p style={{ color: "#FF9F19", marginBottom: "0px" }}>{svgQR}</p>
                                        <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0px" }}>Scan to Pay</p>
                                    </div>
                                </Col>
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
                <Modal show={showModal} onHide={handleQrClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Scan to Pay</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            {(isAndroid || isIOS) && isMobileVerified && (
                                <div className="p-3" ref={qrRef}>
                                    {qrcode ? (
                                        <QRCodeCanvas value={upiURL} level={"H"} />
                                    ) : (
                                        <p>No QR code available</p>
                                    )}
                                </div>
                            )}
                            <button
                                style={{
                                    padding: "10px 12px",
                                    background: process.env.REACT_APP_THEAM_COLOR,
                                    borderColor: "var(--them-color)",
                                    border: "none",
                                    borderRadius: "5px",
                                    color: "#000",
                                }}
                                onClick={downloadQRCode}
                            >
                                Download QR Code
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleQrClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

    );
};

export default Payment;
