import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";

function SkinCard() {
  return (
    <div>

    </div>
  );
}

function SkinList() {
  let eventId = 0;
//   let skinCards = skins.map((currSkin) => {
//     return (
//       <Accordion.Item eventKey={eventId}>
//         <Accordion.Header>
//           Hello
//         </Accordion.Header>
//         <Accordion.Body>
//           <SkinCard skin={currSkin} />
//         </Accordion.Body>
//       </Accordion.Item>
//     );
//   });

  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      <div></div>
    </Accordion>
  );
}

export default SkinList;
