import React from "react";

import { zeroPad } from 'react-countdown';


const OfferCountdown = (e) => {
    const { hours, minutes, seconds, completed,isButton }= e 
    return (
        <>
  
     <span><span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>{isButton&& <span className="ms-1">Hurry Up!</span>}</span>
  
        </>
    )
}

export default OfferCountdown;
