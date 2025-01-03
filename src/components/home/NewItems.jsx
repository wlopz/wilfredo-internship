import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PreviousArrow, NextArrow } from "../../components/UI/CustomArrowsCarousel";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNewItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
    setLoading(false);
  };

  useEffect(() => {
    handleNewItems();
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div 
            className="row"
            data-aos="fade-in" 
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
          >
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading
              ? new Array(7).fill(0).map((_, index) => (
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton width="60px" height="60px" borderRadius="50px" />
                      </div>
                      <div className="de_countdown" style={{ right: 6, border: "none" }}>
                        <Skeleton width="80px" height="20px" borderRadius="5px" />
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton width="160px" height="250px" borderRadius="5px" top="28px" />
                      </div>

                      <div className="nft__item_info">
                        <Skeleton width="80px" height="20px" borderRadius="5px" />
                        <div>
                          <Skeleton width="45px" height="20px" borderRadius="5px" />
                          <Skeleton width="33px" height="20px" borderRadius="5px" left="95px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : newItems.slice(0, 7).map((item) => (
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top" title="Creator: Monica Lucas">
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <Countdown expiryDate={item.expiryDate} />

                      <div className="nft__item_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
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

export default NewItems;
