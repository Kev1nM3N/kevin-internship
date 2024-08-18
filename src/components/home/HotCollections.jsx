import React from "react";
import { Link } from "react-router-dom";

const HotCollections = ({ cards }) => {
  console.log(cards);

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
          {cards.map((card) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={card?.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${card?.nftId}`}>
                    <img src={card?.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={card?.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{card?.title}</h4>
                  </Link>
                  <span>ERC-{card?.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
