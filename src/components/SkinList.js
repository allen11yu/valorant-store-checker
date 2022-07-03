import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { fetch } from "whatwg-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

function SkinCard({ bundleSkins }) {
  let skinCards = [];
  skinCards = bundleSkins.map((skin, index) => {
    let icon = skin.chromas[0].fullRender;
    let name = skin.name;
    let price = skin.price;

    return (
      <div className="skin-card" key={index}>
        <div className="skin-img">
          <img src={icon} alt={name}></img>
        </div>
        <div className="skin-info">
          <p className="info-text">{name}</p>
          <p className="info-text">VP: {price}</p>
          <FontAwesomeIcon className="info-text" icon={outlineStar} />
        </div>
      </div>
    );
  });
  return <div className="skin-container">{skinCards}</div>;
}

function SkinList() {
  const [bundles, setBundles] = useState([]);

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

  console.log(bundles);
  let skinCards = [];
  if (bundles.length > 0) {
    skinCards = bundles.map((bundle, index) => {
      return (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{bundle.name}</Accordion.Header>
          <Accordion.Body>
            <SkinCard bundleSkins={bundle.weapons} />
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }

  return <Accordion>{skinCards}</Accordion>;
}

export default SkinList;
