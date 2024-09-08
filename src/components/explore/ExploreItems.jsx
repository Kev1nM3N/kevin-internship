import TimerCountDown from "../home/TimerCountDown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExploreItems = ({ exploreItems }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (exploreItems.length > 0) {
      setFilteredData(exploreItems);
      setLoading(false);
    }
  }, [exploreItems]);
  
  async function filterExploreItems(filter) {
    setLoading(true);
    try {
      const fetchFilteredExploreItems = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      );
      let receiveFilteredExploreItems = fetchFilteredExploreItems.data;
      setFilteredData(receiveFilteredExploreItems);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  function loadMore(receivedItem) {
    setVisibleItems((prevItem) => {
      if (prevItem + 4 > receivedItem.length) {
        return receivedItem.length;
      }
      return prevItem + 4;
    });
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    filterExploreItems(e.target.value);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          <div className="skeleton-explore-wrapper">
            <div className="skeleton skeleton-explore"></div>
            <div className="skeleton skeleton-explore"></div>
            <div className="skeleton skeleton-explore"></div>
            <div className="skeleton skeleton-explore"></div>
          </div>
          <div className="skeleton-explore-wrapper">
            <div className="skeleton skeleton-explore"></div>
            <div className="skeleton skeleton-explore"></div>
            <div className="skeleton skeleton-explore"></div>
            <div className="skeleton skeleton-explore"></div>
          </div>
        </>
      ) : (
        filteredData.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate && (
                <TimerCountDown key={item.id} endTime={item.expiryDate} />
              )}

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
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
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
        ))
      )}
      <div className="col-md-12 text-center">
        {visibleItems < filteredData.length && (
          <button onClick={() => loadMore(filteredData)} className="btn-main lead">
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;