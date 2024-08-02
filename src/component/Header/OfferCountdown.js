import { UseCountdown } from './UseCountdown';

const OfferCountdown = () => {


  const { hours , minutes, seconds } = UseCountdown();

  const isCompleted =  hours <= 0 && minutes <= 0 && seconds <= 0 ;


  if (isCompleted) {
    return <span>Hurry Up!</span>;
  } else {
    return (
      <div className="countdown-container">
      <div className="countdown-box">
        <div className='hour-count-text'>{hours}</div>
        <div>Hours</div>
      </div>
      <span className='dot-timer'>{':'}</span>
      <div className="countdown-box">
        <div className='hour-count-text'>{minutes}</div>
        <div>Minutes</div>
      </div>
      <span className='dot-timer'>{':'}</span>
      <div className="countdown-box">
        <div className='hour-count-text'>{seconds}</div>
        <div>Seconds</div>
      </div>
    </div>
    );
  }
};


export default OfferCountdown;