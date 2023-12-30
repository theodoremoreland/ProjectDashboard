// React
import React, { useState } from "react";

// Bootstrap
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Icons
import { AiOutlineFileMarkdown } from "react-icons/ai";

// Controller
import { getLastUpdatedDateInDaysString } from "./Project.controller";

// Custom Components
import README from "../README/README";

// Custom styles
import alt from "../../../images/under-construction-thumbnail.jpg";
import "./Project.css";

export default function Project(props) {
  const { projectData } = props;
  const [readmeIsActive, setReadmeIsActive] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="readmeTooltip" {...props}>
      Click to view README.md file
    </Tooltip>
  );

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
        <Card.Body className="projectCardBody">
          <Card.Title className="projectCardTitle">
            {projectData.name}
            <span className="infoIcon" onClick={() => setReadmeIsActive(true)}>
              <OverlayTrigger
                placement="right"
                delay={{ show: 200, hide: 200 }}
                overlay={renderTooltip}
              >
                <AiOutlineFileMarkdown />
              </OverlayTrigger>
            </span>
          </Card.Title>
          <Card.Text className="projectDesc">{projectData.desc}</Card.Text>
          {projectData.demo_link !== "" && projectData.demo_link !== null ? (
            <Card.Link
              title="Click to view a live demo"
              className="demoLinks"
              href={projectData.demo_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </Card.Link>
          ) : (
            ""
          )}
          <footer className="projectFooter">
            <div className="projectDates">
              Date created:{" "}
              {`${new Date(projectData.date_created).toLocaleDateString()}`}
            </div>
            <div className="projectDates">
              {getLastUpdatedDateInDaysString(projectData.date_updated)}
            </div>
            <div className="projectSizes">
              {projectData.size.toLocaleString()}kb
            </div>
          </footer>
        </Card.Body>
      </Card>
      <README
        name={projectData.name}
        link={projectData.readme}
        readmeIsActive={readmeIsActive}
        setReadmeIsActive={setReadmeIsActive}
      />
    </>
  );
}
