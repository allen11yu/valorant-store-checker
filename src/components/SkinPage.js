import React from "react";
import SkinList from "./SkinList";

function SkinPage() {
  return (
    <div className="skin-page page-padding">
      <h1 className="valorant-heading center">VALORANT SKINS</h1>
      <h2 className="center">Star the skin if you wish to be notify</h2>
      <div className="accordion-container">
        <SkinList />
      </div>
    </div>
  );
}

export default SkinPage;
