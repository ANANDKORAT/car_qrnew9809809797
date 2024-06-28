import {zeroPad} from 'react-countdown';


// const OfferCountdown = (e) => {
//     const {hours, minutes, seconds, isButton} = e
//     return (
//         <>
//             <span>
//                 <span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>
//                 {isButton && <span className="ms-1">Hurry Up!</span>}
//             </span>
//         </>
//     )
// }

// export default OfferCountdown;


const OfferCountdown = ({  milliseconds , minutes, seconds, completed }) => {
    if (completed) {
      return <span>Hurry Up!</span>;
    } else {
      return (
        <div className="countdown-container">
          {/* <div className="countdown-box">
            <div className='hour-count-text'>{hours}</div>
            <div>Hours</div>
          </div>
          <span className='dot-timer'>{':'}</span> */}
          <div className="countdown-box">
            <div className='hour-count-text'>{minutes}</div>
            <div>Minutes</div>
          </div>
          <span className='dot-timer'>{':'}</span>
          <div className="countdown-box">
            <div className='hour-count-text'>{seconds}</div>
            <div>Seconds</div>
          </div>
          <span className='dot-timer'>{':'}</span>
          <div className="countdown-box">
            <div className='hour-count-text'>{milliseconds}</div>
            <div>Milliseconds</div>
          </div>
        </div>
      );
    }
  };


  export default OfferCountdown;