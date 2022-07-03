import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { fetch } from "whatwg-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

function SkinCard({ weaponSkins }) {
  let skinCards = [];
  skinCards = weaponSkins.map((skin, index) => {
    let icon = skin.chromas[0].fullRender;
    let name = skin.displayName;

    return (
      <div className="skin-card" key={index}>
        <div className="skin-img">
          <img src={icon} alt={name}></img>
        </div>
        <div className="skin-info">
          <p className="info-text">{name}</p>
          <FontAwesomeIcon className="info-text" icon={outlineStar} />
        </div>
      </div>
    );
  });
  return <div className="skin-container">{skinCards}</div>;
}

function SkinList() {
  const [weapons, setWeapons] = useState([]);

  const fetchWeapons = async () => {
    await fetch("https://valorant-api.com/v1/weapons")
      .then((res) => res.json())
      .then((data) => {
        setWeapons(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  console.log(weapons);
  let skinCards = [];
  if (weapons.length > 0) {
    skinCards = weapons.map((weapon, index) => {
      return (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{weapon.displayName}</Accordion.Header>
          <Accordion.Body>
            <SkinCard weaponSkins={weapon.skins} />
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }

  return <Accordion>{skinCards}</Accordion>;
}

export default SkinList;
