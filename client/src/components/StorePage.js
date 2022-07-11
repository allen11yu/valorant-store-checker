import React, { useState, useEffect } from "react";
import FlipCountdown from "@rumess/react-flip-countdown";
import { useHistory } from "react-router-dom";

function SkinCards({ storeOffers, bundles }) {
  const [skinInfos, setSkinInfos] = useState([]);
  let skinCards = [];

  useEffect(() => {
    async function fetchSkinByLevel() {
      let temp = [];
      for await (let uuid of storeOffers) {
        let skinInfo = await fetch(
          "https://valorant-api.com/v1/weapons/skinlevels/" + uuid
        ).then((res) => res.json());
        temp.push(skinInfo);
      }
      setSkinInfos(temp);
    }
    fetchSkinByLevel();
  }, []);

  skinCards = skinInfos.map((dataJson) => {
    let uuid = dataJson.data.uuid;
    let skinName = dataJson.data.displayName;
    let skinIcon = dataJson.data.displayIcon;
    let skinPrice = 9999;

    for (let i = 0; i < bundles.length; i++) {
      let bundleWeapons = bundles[i].weapons;
      for (let j = 0; j < bundleWeapons.length; j++) {
        let bundleWeaponUuid = bundleWeapons[j].levels[0].uuid;
        if (bundleWeaponUuid === uuid) {
          skinPrice = bundleWeapons[j].price;
        }
      }
    }

    return (
      <div className="store-skin-card" key={uuid}>
        <div className="store-skin-img">
          <img src={skinIcon} alt={skinName}></img>
        </div>
        <div className="store-skin-info">
          <p className="store-info-text center">{skinName}</p>
          <p className="store-info-text center">VP: {skinPrice}</p>
        </div>
      </div>
    );
  });
  return <div className="store-items">{skinCards}</div>;
}

function StorePage({
  setIsLoginCallback,
  storeOffers,
  storeTimeLeft,
  playerName,
  setIsLoadingCallback,
  bundles,
}) {
  let countdownEndTime = new Date(
    Date.now() + 1000 * storeTimeLeft
  ).toUTCString();
  const history = useHistory();

  const handleLogout = () => {
    setIsLoginCallback(false);
    setIsLoadingCallback(false);
    history.push("/login");
  };

  return (
    <div className="store-page page-padding">
      <h1 className="valorant-heading center">{playerName}</h1>
      <div className="flip-clock">
        <FlipCountdown
          hideYear
          hideMonth
          hideDay
          titlePosition="top"
          size="medium"
          endAt={countdownEndTime}
        />
      </div>
      <SkinCards storeOffers={storeOffers} bundles={bundles} />
      <button className="action-btn" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
export default StorePage;
