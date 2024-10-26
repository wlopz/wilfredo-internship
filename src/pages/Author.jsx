import React, { useEffect, useState} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  // Extracts the "id" parameter from the route URL
  const { id } = useParams();

  // State variables for component
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [authorItems, setAuthorItems] = useState([]); // Stores author data
  const navigate = useNavigate(); // Used for navigation within the component
  const [follow, setFollow] = useState(false); // Tracks follow status of the user
  const [followCount, setFollowCount] = useState(0); // Stores follower count
  const [hasCopied, setHasCopied] = useState(false); // Tracks copy-to-clipboard action

  // Fetch author data from the server when the component mounts or "id" changes
  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        // Fetches author details from API
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
        setAuthorItems(data); // Updates author items with fetched data
        setFollowCount(data.followers); // Initializes follower count
        setLoading(false); // Ends loading state once data is fetched
      } catch (error) {
        console.error(error); // Logs any error encountered
        setLoading(false); // Ends loading even if there’s an error
      }
    };
    fetchAuthorItems(); // Calls the data fetch function
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [id]);

  // Handles copying the author address to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(`${authorItems.address}`); // Copies address
    setHasCopied(true); // Sets copied state to true for visual feedback

    // Resets copy feedback after 2 seconds
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  // Toggles follow status and updates follower count accordingly
  const handleFollowCount = () => {
    setFollow((prevFollow) => !prevFollow); // Toggles follow state
    setFollowCount((prevCount) => (follow ? prevCount - 1 : prevCount + 1)); // Adjusts follower count
  };

  // JSX returned for the Author page layout
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Author banner section */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        {/* Author profile section */}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {/* Conditionally render Skeleton loading or Author profile data */}
              {loading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        {/* Display loading skeleton for avatar and text */}
                        <Skeleton width="120px" height="120px" borderRadius="80px" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width="60px" height="20px" borderRadius="5px" />
                            <span className="profile_username">
                              <Skeleton width="60px" height="20px" borderRadius="5px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="120px" height="20px" borderRadius="5px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        {/* Display loading skeleton for follower count and follow button */}
                        <div className="profile_follower">
                          <Skeleton width="60px" height="20px" borderRadius="5px" />
                        </div>
                        <Skeleton width="60px" height="30px" borderRadius="5px" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Render actual author data when not loading
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        {/* Display author avatar image */}
                        <img src={authorItems.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorItems.authorName} {/* Display author name */}
                            <span className="profile_username">@{authorItems.tag}</span> {/* Display username */}
                            <span id="wallet" className="profile_wallet">
                              {authorItems.address} {/* Display wallet address */}
                            </span>
                            {/* Copy button to copy wallet address */}
                            <button id="btn_copy" title="Copy Text" onClick={handleCopy}>
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        {/* Display and update follower count */}
                        <div className="profile_follower">{followCount} followers</div>
                        {/* Follow/unfollow button with conditional text */}
                        <Link to="#" className="btn-main" onClick={handleFollowCount}>
                          {follow ? "UnFollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Render additional author items component */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;