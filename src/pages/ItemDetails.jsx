import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [itemDetails, setItemDetails] = useState([]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
        // console.log(data)
        setItemDetails([data]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchItemDetails();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading 
            ? new Array(1).fill(0).map((_, index) => (
              <div className="row" key={index}>
                <div className="col-md-6 text-center">
                <Skeleton width="100%" height="500px" borderRadius="5px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                      <Skeleton width="80%" height="40px" borderRadius="5px" />
                    <div>
                      <Skeleton width="80px" height="20px" borderRadius="5px" />
                      <Skeleton width="80px" height="20px" borderRadius="5px" left="5%" />
                    </div>
                    <p>
                      <Skeleton width="100%" height="20px" borderRadius="5px" />
                      <Skeleton width="80%" height="20px" borderRadius="5px" />
                      <Skeleton width="60%" height="20px" borderRadius="5px" />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton width="60px" height="60px" borderRadius="50px" />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="80px" height="20px" borderRadius="5px" />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton width="60px" height="60px" borderRadius="50px" />
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="80px" height="20px" borderRadius="5px" />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <Skeleton width="30px" height="30px" borderRadius="50px" />
                        <span> <Skeleton width="80px" height="20px" borderRadius="5px" /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            : itemDetails.map((item) => (
              <div className="row" key={item.id}>
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{item.title} #{item.tag}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {item.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {item.likes}
                      </div>
                    </div>
                    <p>
                      {item.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.ownerId}`}>
                              <img className="lazy" src={item.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.creatorId}`}>
                              <img className="lazy" src={item.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
