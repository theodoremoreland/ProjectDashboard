// React
import React from "react";

// Bootstrap
import Card from "react-bootstrap/Card";

// Custom styles
import alt from "../../../images/under-construction-thumbnail.jpg";
import "./Project.css";

export default function Project(props) {
  const { projectData } = props;

  return (
    <>
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
        <a href={projectData.url} target="_blank" rel="noopener noreferrer">
          <Card.ImgOverlay className="projectCardOverlay">
            <h3>View on GitHub</h3>
          </Card.ImgOverlay>
        </a>
      </Card>
    </>
  );
}
