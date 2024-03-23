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
    <Card className="project-card">
      <Card.Img
        className="project-image"
        variant="top"
        src={projectData.image}
        alt={""}
        onError={(e) => {
          if (e.target.src !== alt) {
            e.target.src = alt;
          }
        }}
      />
      <Card.Body className="project-card-body">
        <Card.Title className="project-card-title">
          {projectData.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Project;
