import React, { useState, useEffect } from "react";
import FlipCountdown from "@rumess/react-flip-countdown";
import { useHistory } from "react-router-dom";

function SkinCards({ storeOffers }) {
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

  skinCards = skinInfos.map((dataJson, index) => {
    return (
      <div className="store-skin-card" key={dataJson.data.uuid}>
        <div className="store-skin-img">
          <img
            src={dataJson.data.displayIcon}
            alt={dataJson.data.displayName}
          ></img>
        </div>
        <div className="store-skin-info">
          <p className="store-info-text center">{dataJson.data.displayName}</p>
          <p className="store-info-text center">VP: {"XXXX"}</p>
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
      <SkinCards storeOffers={storeOffers} />
      <button className="action-btn" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
export default StorePage;
