import { React, useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

function SkinCards({ handleSelectCallback, selectedSkins }) {
  let skinCards = [];
  for (let [uuid, skin] of selectedSkins.entries()) {
    let skinCard = (
      <div className="skin-card" key={skin.index}>
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

function NotifyPage({ handleSelectCallback, selectedSkins }) {
  const [phone, setPhone] = useState("");
  const [disable, setDisable] = useState(true);

  const handleEdit = () => {
    console.log("editing");
  };

  const handleSave = () => {
    console.log("save");
  };

  let editOrSave = null;
  if (phone.length !== 10) {
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
      <h1 className="valorant-heading center">Notify Me</h1>
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
              />
            </FloatingLabel>
          </Form>
        </div>
        <div className="phone-action-btn">{editOrSave}</div>
      </div>
      <SkinCards
        handleSelectCallback={handleSelectCallback}
        selectedSkins={selectedSkins}
      />
    </div>
  );
}

export default NotifyPage;
