// React
import React from "react";

// Bootstrap
import Card from "react-bootstrap/Card";

// Images
import alt from "../../../images/under-construction-thumbnail.jpg";

// Custom styles
import "./Project.css";

// TODO: Hover effect slides up the overlay to reveal the title, whether live demo is available, and tech icons.
const Project = ({ projectData }) => {
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
};

export default Project;
