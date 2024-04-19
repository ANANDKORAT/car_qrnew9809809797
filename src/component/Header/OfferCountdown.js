import React, { useEffect, useRef } from "react";
import Countdown, {zeroPad} from 'react-countdown';
import { useLocation } from "react-router-dom";

const OfferCountdown=()=>{
    const ref = useRef(null);
    let location = useLocation();

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <span>Buy Now!</span>;
        } else {
          // Render a countdown
          return <span><span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span><span className="ms-1">Hurry Up!</span></span>;
        }
      };

      useEffect(()=>{
        if(ref?.current) {
            if(["STOPPED" , "COMPLETED"].includes(ref?.current?.state?.status)) {
                ref?.current?.start();
            }
        }
      },[location, ref])

    return (
        <Countdown date={Date.now() + parseInt(process.env.REACT_APP_OFFER_TIME)} ref={ref} renderer={renderer} intervalDelay={1000} />
    )
}

export default OfferCountdown;