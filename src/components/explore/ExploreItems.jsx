import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  // State to track whether the API data is being fetched
  const [loading, setLoading] = useState(true);

  // State to hold filtered items from the API
  const [exploreItemsFilter, setExploreItemsFilter] = useState([]);

  // State for currently displayed data, controlling what is visible in the UI
  const [displayedData, setDisplayedData] = useState([]);

  // State to track how many items are currently visible in the grid
  const [visibleItemCount, setVisibleItemCount] = useState(8);

  // Get search params from URL and navigation helper
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Function to fetch filtered items from the external API using axios
  const fetchFilteredItems = async (filter = "") => {
    // Fetch filtered items based on the filter from the API
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );

    // Stop loading after fetching data
    setLoading(false);

    // Save the filtered items in state
    setExploreItemsFilter(data);

    // Set the initially displayed data (first 8 items)
    setDisplayedData(data.slice(0, visibleItemCount));
  };

  // On mount, check if there’s a filter value in the URL and apply it
  useEffect(() => {
    const filter = searchParams.get("filter") || "";
    fetchFilteredItems(filter);
  }, [searchParams]);

  // Function to handle filtering of explore items based on user selection
  // Handle filter change
  const handleFilterChange = (value) => {
    // Update the URL with the new filter value
    if (value === "price_low_to_high" || value === "price_high_to_low" || value === "likes_high_to_low") {
      setLoading(true);
      navigate(`?filter=${value}`, { replace: true });
    } else if (value === "") {
      setLoading(true);
      navigate(``, { replace: false });
    }
    

    // Fetch the new filtered data from the API
    fetchFilteredItems(value);
  };

  // Function to calculate the remaining time until the NFT expires
  const calculateCountdown = (expiryDate) => {
    const expiry = new Date(expiryDate).getTime(); // Convert expiry date string to a timestamp

    // Inner function to calculate the difference between now and the expiry date
    const updateCountdown = () => {
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
    
    return updateCountdown(); // Return the calculated countdown on function call
  };

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

  // Function to load more items (increases visible item count by 4)
  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => {
      const newCount = prevCount + 4; // Increase the number of visible items by 4
      setDisplayedData(exploreItemsFilter.slice(0, newCount)); // Update displayed items based on the new count
      return newCount; // Return the updated count
    });
  };

  return (
    <>
      {/* Dropdown filter to select sorting criterion */}
      <div>
        <select
          id="filter-items"
          defaultValue={searchParams.get("filter") || ""}
          onChange={(e) => handleFilterChange(e.target.value)} // Call filter function when the value changes
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* Render the list of displayed data */}
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="60px" height="60px" borderRadius="50px" />
                </div>
                <div className="de_countdown" style={{ right: 6, border: "none" }}>
                  <Skeleton width="80px" height="20px" borderRadius="5px" />
                </div>

                <div className="nft__item_wrap">
                  <Skeleton width="200px" height="250px" borderRadius="5px" top="28px" />
                </div>

                <div className="nft__item_info">
                  <Skeleton width="80px" height="20px" borderRadius="5px" />
                  <div>
                    <Skeleton width="45px" height="20px" borderRadius="5px" />
                    <Skeleton width="33px" height="20px" borderRadius="5px" left="62%" />
                  </div>
                </div>
              </div>
            </div>
          ))
        : displayedData.map((exploreItem) => (
        <div
          key={exploreItem.id} // Use unique key for each item
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                {/* Display author image */}
                <img className="lazy" src={exploreItem.authorImage} alt="" />
                <i className="fa fa-check"></i> {/* Check icon */}
              </Link>
            </div>

            {/* Countdown timer for item expiry */}
            <Countdown expiryDate={exploreItem.expiryDate} />

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    {/* Social media share buttons */}
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* NFT item preview */}
              <Link to="/item-details">
                <img
                  src={exploreItem.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>

            {/* NFT item details */}
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{exploreItem.title}</h4>
              </Link>
              <div className="nft__item_price">{exploreItem.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{exploreItem.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* "Load More" button to show additional items */}
      {/* Disappear load more when there are no more items */}
      {exploreItemsFilter.length > displayedData.length && (
        <div className="col-md-12 text-center">
          <Link to="" id="loadmore" className="btn-main lead" onClick={handleLoadMore}>
            Load more
          </Link>
        </div>
      )}
      
    </>
  );
};

export default ExploreItems;
