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
      <div className="project-overlay"> 
        <div id="content">
          <div className="row">
            <ul>
              {projectData.demo_link && 
                <li>
                  <a href={projectData.demo_link} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                </li>
              }
              <li onClick={() => {}}>
                Learn More
              </li>
            </ul>
          </div>
          <div className="row">
            <h2 className="project-name">{projectData.name}</h2>
          </div>
          <div className="row">
            <ul className="language-icons"></ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Project;
