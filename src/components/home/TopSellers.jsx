import React from "react";
import { Link } from "react-router-dom";

const TopSellers = ({ topSellers }) => {

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.length ? topSellers.map((profile) => (
                <li key={profile.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${profile.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={profile.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${profile.authorId}`}>{profile.authorName}</Link>
                    <span>{profile.price} ETH</span>
                  </div>
                </li>
              )) : ( 
                <div className="skeleton-wrapper">
                  {new Array(5).fill(0).map((_, index) => (
                    <div key={index} className="box">
                      <div className="skeleton skeleton-avatar"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  ))}
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
