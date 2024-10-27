// Function to calculate the remaining time until the NFT expires
export const calculateCountdown = (expiryDate) => {
  const expiry = new Date(expiryDate).getTime(); // Convert expiry date string to a timestamp

  const now = new Date().getTime(); // Current time in milliseconds
  const timeRemaining = expiry - now; // Time difference
  
  // Check if the item is still active (not expired)
  if (timeRemaining > 0) {
    // Calculate hours, minutes, and seconds remaining
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Return the formatted countdown string
    return `${hours}h ${minutes}m ${seconds}s`;
  } else {
    return "Expired"; // If time has passed, return "Expired"
  }
  
};