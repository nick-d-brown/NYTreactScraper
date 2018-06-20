import React from "react";
import './Nav.css'

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
    <a className="navbar-brand" href="/">
      NYT Article Scraper
    </a>
    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
    <div className="navbar-nav nav-link-styling">
      <a className="nav-item nav-link" href="/articles">Search Articles</a>
      <a className="nav-item nav-link" href="/saved">Saved Articles</a>
    {/* </div> */}
  </div>
  </nav>
);

export default Nav;
