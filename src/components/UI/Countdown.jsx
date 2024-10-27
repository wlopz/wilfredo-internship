import { useState, useEffect } from "react";
import { calculateCountdown } from "../utils/CalculateCountdown";

// React component to display the countdown timer for each NFT item
const Countdown = ({ expiryDate }) => {
  // State to hold the countdown timer value
  const [countdown, setCountdown] = useState(calculateCountdown(expiryDate));

  // useEffect to update the countdown every second
  useEffect(() => {
    // Create an interval that updates the countdown every second (1000 ms)
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(expiryDate)); // Update countdown
    }, 1000);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [expiryDate]); // Dependency on expiryDate ensures recalculation when date changes

  // Render the countdown value inside a styled div
  return <div className="de_countdown">{countdown}</div>;
};

export default Countdown;