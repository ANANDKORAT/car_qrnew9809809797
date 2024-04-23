import React, {useEffect, useRef, useState} from "react";
import Countdown, {zeroPad} from 'react-countdown';
import { useLocation } from "react-router-dom";

const Renderer = ({ hours, minutes, seconds, completed }) => {
    const [show, setShow]=useState(false);

    useEffect(() => {
        setTimeout(()=>{
            setShow(!show);
        }, 3000);
    }, [show]);

    if (completed || show) {
        // Render a completed state
        return <span>Buy 2 Get 1 free!</span>;
    } else {
        // Render a countdown
        return <span><span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span><span className="ms-1">Hurry Up!</span></span>;
    }
};

const OfferCountdown=()=>{
    const ref = useRef(null);
    let location = useLocation();

      useEffect(()=>{
        if(ref?.current) {
            if(["STOPPED" , "COMPLETED"].includes(ref?.current?.state?.status)) {
                ref?.current?.start();
            }
        }
      },[location, ref])

    return (
        <Countdown date={Date.now() + parseInt(process.env.REACT_APP_OFFER_TIME)} ref={ref} renderer={(e)=><Renderer {...e}/>} intervalDelay={1000} />
    )
}

export default OfferCountdown;
