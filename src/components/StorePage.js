import React from "react";
import FlipCountdown from "@rumess/react-flip-countdown";

function StorePage() {
  // In GMT time zone
  // Valorant store refreshes at 12AM GMT
  let countdownEndTime = "2022-07-01 11:59:59";
  let gamerTag = "IcyCreamFan #NA1"

  return (
    <div className="store-page page-padding">
      <h1 className="valorant-heading center">{gamerTag}</h1>
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
      <div className="store-items">
        <div className="store-item"></div>
        <div className="store-item"></div>
        <div className="store-item"></div>
        <div className="store-item"></div>
      </div>
    </div>
  );
}
export default StorePage;
