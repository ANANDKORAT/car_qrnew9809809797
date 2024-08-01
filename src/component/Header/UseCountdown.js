import { useEffect, useState } from 'react';

const UseCountdown = (initialMinutes = 8) => {
  const initialTime = initialMinutes * 60 * 1000;
  const [countDown, setCountDown] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prevCount) => (prevCount > 0 ? prevCount - 10 : 0));
    }, 10); // Update every 10 milliseconds

    return () => clearInterval(interval);
  }, []);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const hours = String(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((countDown % (1000 * 60)) / 1000)).padStart(2, '0');

  return { hours, minutes, seconds };
};

export { UseCountdown };
