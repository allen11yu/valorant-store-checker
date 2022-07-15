import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

function SkinCards({
  bundleSkins,
  handleSelectCallback,
  selectedSkins,
  wishlist,
}) {
  let skinCards = [];
  skinCards = bundleSkins.map((skin, index) => {
    let uuid = skin.levels[0].uuid;
    let icon = skin.levels[0].displayIcon;
    let name = skin.name;
    let price = skin.price;

    let starStatus = null;
    if (wishlist.includes(uuid)) {
      starStatus = (
        <FontAwesomeIcon
          className="info-text"
          icon={filledStar}
          onClick={() => {
            handleSelectCallback(uuid);
          }}
        />
      );
    } else {
      starStatus = (
        <FontAwesomeIcon
          className="info-text"
          icon={outlineStar}
          onClick={() => {
            handleSelectCallback(uuid);
          }}
        />
      );
    }

    return (
      <div className="skin-card" key={index}>
        <div className="skin-img">
          <img src={icon} alt={name}></img>
        </div>
        <div className="skin-info">
          <p className="info-text">{name}</p>
          <p className="info-text">VP: {price}</p>
          {starStatus}
        </div>
      </div>
    );
  });
  return <div>{skinCards}</div>;
}

function SkinList({ handleSelectCallback, selectedSkins, bundles, wishlist }) {
  const exclusiveBundles = ["Champions 2021", "Arcane", "Pride"];

  let skinCards = [];
  let filteredBundles = [...bundles];
  if (bundles.length > 0) {
    filteredBundles = bundles.filter((bundle) => {
      return !exclusiveBundles.includes(bundle.name);
    });

    skinCards = filteredBundles.map((bundle, index) => {
      return (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{bundle.name}</Accordion.Header>
          <Accordion.Body>
            <SkinCards
              bundleSkins={bundle.weapons}
              handleSelectCallback={handleSelectCallback}
              selectedSkins={selectedSkins}
              wishlist={wishlist}
            />
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }

  return <Accordion>{skinCards}</Accordion>;
}

export default SkinList;
