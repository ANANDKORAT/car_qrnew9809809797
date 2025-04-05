import { UseCountdown } from "./UseCountdown";
import "./OfferCountdown.css";

const OfferCountdown = () => {
  const { hours, minutes, seconds } = UseCountdown();
  const remainingSeconds = hours * 3600 + minutes * 60 + seconds;
  const progress = (remainingSeconds / (24*3600)) * 100;
  const isCompleted = remainingSeconds <= 0;

  if (isCompleted) {
    return (
      <div className="offer-card expired">
        <span className="icon">⏰</span>
        <h4>Offer Expired</h4>
        <button>Check New Offers</button>
      </div>
    );
  }

  return (
    <div className="offer-card">
      <h5>🔥 Limited Time Deal 🔥 </h5>
      <div className="timer">
        {[hours, minutes, seconds].map((value, i) => (
          <div key={i} className="time-unit">
            <span>{String(value).padStart(2, "0")}</span>
            <small>{["Hours","Minutes","Seconds"][i]}</small>
            {i < 2 && <span className="colon">:</span>}
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default OfferCountdown;