import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

function SkinPage() {
  return (
    <div className="skin-page page-padding">
      <h1 className="valorant-heading center">VALORANT SKINS</h1>
      <h2 className="center">Star the skin if you wish to be notify</h2>
      <div className="skin-card">
        <div className="skin-img">
          <img src="./img/prime.png" alt="Prime Vandal"></img>
        </div>
        <div className="skin-info">
          <p className="info-text">Prime Vandal</p>
          <p className="info-text">VP: 1775</p>
          <FontAwesomeIcon className="info-text" icon={outlineStar} />
        </div>
      </div>
    </div>
  );
}

export default SkinPage;
