import { React, useState } from "react";
import validator from "validator";
import { Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

function SkinCards({ handleSelectCallback, selectedSkins }) {
  let skinCards = [];
  for (let [uuid, skin] of selectedSkins.entries()) {
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
              handleSelectCallback(uuid, skin);
            }}
          />
        </div>
      </div>
    );
    skinCards.push(skinCard);
  }
  return <div className="skin-container">{skinCards}</div>;
}

function WishListPage({ handleSelectCallback, selectedSkins }) {
  const [phone, setPhone] = useState("");
  const [disable, setDisable] = useState(false);
  const [wrongPhone, setWrongPhone] = useState(false);

  const handleWrongPhone = (
    <p className="error-msg center">Please check your phone number.</p>
  );

  const handleEdit = () => {
    setDisable(false);
  };

  const handleSave = () => {
    if (validator.isMobilePhone(phone, ["en-US"])) {
      console.log("valid phone number");
      setWrongPhone(false);
      setDisable(true);
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
        selectedSkins={selectedSkins}
      />
    </div>
  );
}

export default WishListPage;
