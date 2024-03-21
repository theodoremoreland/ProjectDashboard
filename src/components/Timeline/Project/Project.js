// React
import React from "react";

// Bootstrap
import Card from "react-bootstrap/Card";

// Images
import alt from "../../../images/under-construction-thumbnail.jpg";

// Custom styles
import "./Project.css";

export default function Project({ projectData }) {
  return (
    <Card className="projectCard">
      <Card.Img
        className="projectImage"
        variant="top"
        src={projectData.image}
        alt={""}
        onError={(e) => {
          if (e.target.src !== alt) {
            e.target.src = alt;
          }
        }}
      />
      <Card.ImgOverlay className="projectCardOverlay">
        <h3>Learn more</h3>
      </Card.ImgOverlay>
    </Card>
  );
}
