import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-menu">
        <Link className="menu-item" to="/about">
          About
        </Link>
        <Link className="menu-item" to="/store">
          Store
        </Link>
        <Link className="menu-item" to="/bundles">
          Bundles
        </Link>
        <Link className="menu-item" to="/notify">
          Notify
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
