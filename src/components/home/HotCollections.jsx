import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { PreviousArrow, NextArrow } from "../../components/UI/CustomArrowsCarousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleHotCollections = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
    setLoading(false);  // Stop loading after fetching data
  };

  useEffect(() => {
    handleHotCollections();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 10000,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Slider {...settings}>
            {loading
              ? Array(6).fill().map((_, index) => (
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    key={index}
                  >
                    <div className="nft_coll">
                      <Skeleton width="100%" height="150px" borderRadius="8px" /> {/* nft_wrap */}
                      <div style={{ marginTop: "-40px", textAlign: "center" }}>
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius="50%"
                        /> {/* nft_coll_pp */}
                      </div>
                      <div
                        className="nft_coll_info"
                        style={{ marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}  // Stack vertically
                      >
                        <Skeleton width="120px" height="20px" borderRadius="4px" /> {/* Title */}
                        <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                          <Skeleton
                            width="80px"
                            height="16px"
                            borderRadius="4px"
                          /> {/* ERC code */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : hotCollections.slice(0, 6).map((collection) => (
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    key={collection.id}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt={collection.author}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
