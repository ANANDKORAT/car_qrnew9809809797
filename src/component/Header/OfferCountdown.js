import { zeroPad } from 'react-countdown';
import { UseCountdown } from './UseCountdown';


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
const OfferCountdown = () => {


  const { minutes, seconds, milliseconds } = UseCountdown();

  const isCompleted = minutes <= 0 && seconds <= 0 && milliseconds <= 0;


  if (isCompleted) {
    return <span>Hurry Up!</span>;
  } else {
    return (
      <div className="countdown-container">
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