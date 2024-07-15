import React, { useState, useEffect } from 'react';
import OfferCountdown from './OfferCountdown';

const CustomCountdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference > 0) {
            return {
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                milliseconds: Math.floor((difference % 1000) / 10), // Adjusting for better readability
                completed: false,
            };
        } else {
            return { completed: true };
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 10);

        return () => clearInterval(timer);
    }, []);

    return <OfferCountdown {...timeLeft} />;
};

export default CustomCountdown;
