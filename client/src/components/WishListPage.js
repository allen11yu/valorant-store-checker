import { React, useEffect, useState } from "react";
import validator from "validator";
import { Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

function SkinCards({ handleSelectCallback, bundles, wishlist }) {
  const getSkinInfo = (bundles, uuid) => {
    let skinInfo = {
      name: "",
      price: "",
      icon: "",
    };
    for (let i = 0; i < bundles.length; i++) {
      let bundleWeapons = bundles[i].weapons;
      for (let j = 0; j < bundleWeapons.length; j++) {
        let currWeapon = bundleWeapons[j];
        if (currWeapon.levels[0].uuid === uuid) {
          skinInfo.name = currWeapon.name;
          skinInfo.price = currWeapon.price;
          skinInfo.icon = currWeapon.levels[0].displayIcon;
        }
      }
    }
    return skinInfo;
  };

  let skinCards = [];
  for (let i = 0; i < wishlist.length; i++) {
    let uuid = wishlist[i];
    let skin = getSkinInfo(bundles, uuid);

    let skinCard = (
      <div className="skin-card" key={uuid}>
        <div className="skin-img">
          <img src={skin.icon} alt={skin.name}></img>
        </div>
        <div className="skin-info">
          <p className="info-text">{skin.name}</p>
          <p className="info-text">VP: {skin.price}</p>
          <FontAwesomeIcon
            className="info-text"
            icon={filledStar}
            onClick={() => {
              handleSelectCallback(uuid);
            }}
          />
        </div>
      </div>
    );
    skinCards.push(skinCard);
  }
  return <div className="skin-container">{skinCards}</div>;
}

function WishListPage({ handleSelectCallback, playerId, bundles, wishlist }) {
  const [phone, setPhone] = useState("");
  const [disable, setDisable] = useState(false);
  const [wrongPhone, setWrongPhone] = useState(false);

  const handleWrongPhone = (
    <p className="error-msg center">Please check your phone number.</p>
  );

  const handleEdit = () => {
    setDisable(false);
  };

  const handleData = (data) => {
    if (data["phone_number"] !== null) {
      setPhone(data["phone_number"]);
      setWrongPhone(false);
      setDisable(true);
    } else {
      setPhone("");
    }
  };

  const getPhone = async (puuid) => {
    await fetch("/getphone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ puuid }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleData(data);
      });
  };

  const updatePhone = async (puuid, phone) => {
    await fetch("/updatephone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ puuid, phone }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleSave = () => {
    if (validator.isMobilePhone(phone, ["en-US"])) {
      console.log("valid phone number");
      setWrongPhone(false);
      setDisable(true);
      updatePhone(playerId, phone);
    } else {
      console.log("not valid phone number");
      setWrongPhone(true);
    }
  };

  let editOrSave = null;
  if (!disable) {
    editOrSave = (
      <button className="action-btn" type="button" onClick={handleSave}>
        Save
      </button>
    );
  } else {
    editOrSave = (
      <button className="action-btn" type="button" onClick={handleEdit}>
        Edit
      </button>
    );
  }

  useEffect(() => {
    getPhone(playerId);
  }, []);
  return (
    <div className="notify-page page-padding">
      <h1 className="valorant-heading center">WISH LIST</h1>
      <h2 className="center">Enter your mobile number to get notify</h2>
      <div className="phone-form-container">
        <div>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Mobile"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                type="text"
                placeholder="Mobile"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                defaultValue={phone}
                disabled={disable}
                readOnly={disable}
              />
            </FloatingLabel>
          </Form>
        </div>
        <div className="phone-action-btn">{editOrSave}</div>
      </div>
      {wrongPhone ? handleWrongPhone : <div></div>}
      <SkinCards
        handleSelectCallback={handleSelectCallback}
        bundles={bundles}
        playerId={playerId}
        wishlist={wishlist}
      />
    </div>
  );
}

export default WishListPage;
