import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from 'react-router-dom';
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const AuthorItems = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [authorItems, setAuthorItems] = useState(null);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
        // console.log(data)
        setAuthorItems(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchAuthorItems();
  }, [id]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
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
          : authorItems && authorItems.nftCollection.map((author) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={author.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorItems.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                      src={author.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{author.title}</h4>
                  </Link>
                  <div className="nft__item_price">{author.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{author.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
