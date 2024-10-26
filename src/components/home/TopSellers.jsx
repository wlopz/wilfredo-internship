import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopSellers = async () => {
    const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
    const data = await response.json();
    setTopSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSellers();
  }, [])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div 
            className="row"
            data-aos="fade-in" 
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
          >
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading 
              ? new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <Skeleton width="50px" height="50px" borderRadius="50px" />
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <div>
                      <Skeleton width="90px" height="20px" borderRadius="5px" />
                    </div>
                    <div>
                      <Skeleton width="50px" height="20px" borderRadius="5px" />
                    </div>
                  </div>
                </li>
              )) 
              : topSellers.sort((a, b) => b.price - a.price).map((seller) => (
                <li key={seller.index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>
                      {seller.authorName}
                    </Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
