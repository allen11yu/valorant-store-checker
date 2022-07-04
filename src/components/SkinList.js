import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { fetch } from "whatwg-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

function SkinCards({ bundleSkins, handleSelectCallback, selectedSkins }) {
  let skinCards = [];
  skinCards = bundleSkins.map((skin, index) => {
    let uuid = skin.uuid;
    let icon = skin.chromas[0].fullRender;
    let name = skin.name;
    let price = skin.price;

    let skinObj = {
      "name": name,
      "price": price,
      "icon": icon,
      "index": index
    }
    let starStatus = null;
    if (selectedSkins.has(uuid)) {
      starStatus = (
        <FontAwesomeIcon
          className="info-text"
          icon={filledStar}
          onClick={() => {
            handleSelectCallback(uuid, skinObj);
          }}
        />
      );
    } else {
      starStatus = (
        <FontAwesomeIcon
          className="info-text"
          icon={outlineStar}
          onClick={() => {
            handleSelectCallback(uuid, skinObj);
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

function SkinList({ handleSelectCallback, selectedSkins }) {
  const [bundles, setBundles] = useState([]);
  const exclusiveBundles = ["Champions 2021", "Arcane"];

  const fetchBundles = async () => {
    await fetch("https://api.valtracker.gg/bundles")
      .then((res) => res.json())
      .then((data) => {
        setBundles(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBundles();
  }, []);

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
            />
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }

  return <Accordion>{skinCards}</Accordion>;
}

export default SkinList;
