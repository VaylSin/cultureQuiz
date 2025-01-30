import {useEffect } from 'react';

const Timer = ({dispatch, secondsRemaining}) => {

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: "clock" });
        }, 1000);
        return () => clearInterval(timer)
    },
    [dispatch]);

    return (
        <div className="timer">
        <strong>{minutes < 10 ? `0${minutes}` : minutes} min </strong>
        <strong>{seconds < 10 ? `0${seconds}` : seconds} sec</strong>
        </div>
    );
}

export default Timer;
