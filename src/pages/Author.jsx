import React, { useEffect, useState} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [authorItems, setAuthorItems] = useState([]);
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
        setAuthorItems(data);
        setFollowCount(data.followers); // Set initial follower count
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchAuthorItems();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${authorItems.address}`)
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const handleFollowCount = () => {
    setFollow((prevFollow) => !prevFollow);
    setFollowCount((prevCount) => (follow ? prevCount - 1 : prevCount + 1));
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              { loading ? 
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
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
                        <div className="profile_follower">
                          <Skeleton width="60px" height="20px" borderRadius="5px" />
                        </div>
                        <Skeleton width="60px" height="30px" borderRadius="5px" />
                      </div>
                    </div>
                  </div>
                </div> 
                :
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorItems.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorItems.authorName}
                            <span className="profile_username">@{authorItems.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorItems.address}
                            </span>
                            <button id="btn_copy" title="Copy Text" onClick={handleCopy}>
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{followCount} followers</div>
                        <Link to="#" className="btn-main" onClick={handleFollowCount}>
                          {follow ? "UnFollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              }
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
