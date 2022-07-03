import React from "react";
import SkinList from "./SkinList";

function BundlePage() {
  return (
    <div className="skin-page page-padding">
      <h1 className="valorant-heading center">VALORANT Bundles</h1>
      <h2 className="center">Star the skin if you wish to be notify</h2>
      <div className="accordion-container">
        <SkinList />
      </div>
    </div>
  );
}

export default BundlePage;
