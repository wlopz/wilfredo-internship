import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [exploreItemsFilter, setExploreItemsFilter] = useState([]);

  // Fetch items from API
  const fetchExploreItems = async () => {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    setExploreItems(data);
    setExploreItemsFilter(data); // Initialize filter with all items
  };

  useEffect(() => {
    fetchExploreItems();
  }, []);

  // Countdown calculation
  const calculateCountdown = (expiryDate) => {
    const expiry = new Date(expiryDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeRemaining = expiry - now;

      if (timeRemaining > 0) {
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        return "Expired";
      }
    };

    return updateCountdown();
  };

  // Countdown component
  const Countdown = ({ expiryDate }) => {
    const [countdown, setCountdown] = useState(calculateCountdown(expiryDate));

    useEffect(() => {
      const interval = setInterval(() => {
        setCountdown(calculateCountdown(expiryDate));
      }, 1000);

      return () => clearInterval(interval);
    }, [expiryDate]);

    return <div className="de_countdown">{countdown}</div>;
  };

  // Filter items by selected value
  const filterExploreItems = (value) => {
    let sortedItems = [...exploreItems]; // Make a copy of the original array to avoid mutating state

    if (value === "price_low_to_high") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (value === "price_high_to_low") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (value === "likes_high_to_low") {
      sortedItems.sort((a, b) => b.likes - a.likes);
    }

    setExploreItemsFilter(sortedItems); // Update the filtered state with sorted items
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => filterExploreItems(e.target.value)} // Moved onChange to the select
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItemsFilter.map((exploreItem) => (
        <div
          key={exploreItem.id}
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
                <img className="lazy" src={exploreItem.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <Countdown expiryDate={exploreItem.expiryDate} />

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
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
              <Link to="/item-details">
                <img
                  src={exploreItem.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
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
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
