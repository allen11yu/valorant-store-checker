import React from "react";
import SkinList from "./SkinList";

function BundlePage({ handleSelectCallback, selectedSkins }) {
  return (
    <div className="skin-page page-padding">
      <h1 className="valorant-heading center">VALORANT Bundles</h1>
      <h2 className="center">Star the skin if you wish to be notify</h2>
      <div className="skin-container">
        <SkinList
          handleSelectCallback={handleSelectCallback}
          selectedSkins={selectedSkins}
        />
      </div>
    </div>
  );
}

export default BundlePage;
