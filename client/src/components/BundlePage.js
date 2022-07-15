import React from "react";
import SkinList from "./SkinList";

function BundlePage({
  handleSelectCallback,
  selectedSkins,
  bundles,
  wishlist,
}) {
  return (
    <div className="skin-page page-padding">
      <h1 className="valorant-heading center">VALORANT Bundles</h1>
      <h2 className="center">Star the skin if you wish to be notify</h2>
      <div className="skin-container">
        <SkinList
          handleSelectCallback={handleSelectCallback}
          selectedSkins={selectedSkins}
          bundles={bundles}
          wishlist={wishlist}
        />
      </div>
    </div>
  );
}

export default BundlePage;
