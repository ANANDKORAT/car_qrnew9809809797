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
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((countDown % 1000) / 10); // Get two digits of milliseconds

  return { minutes, seconds, milliseconds };
};

export { UseCountdown };
