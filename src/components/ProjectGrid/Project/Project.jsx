// React
import React from "react";

// Bootstrap
import Card from "react-bootstrap/Card";

// Images
import alt from "../../../images/under-construction-thumbnail.jpg";
import htmlIcon from "../../../images/languages/html.png"; // TODO replace with image without background
import javascriptIcon from "../../../images/languages/javascript.png";
import typescriptIcon from "../../../images/languages/typescript.png";
import pythonIcon from "../../../images/languages/python.png";
import javaIcon from "../../../images/languages/java.png";
import vbaIcon from "../../../images/languages/vba.png";
import sqlIcon from "../../../images/languages/sql.png";

// Custom styles
import "./Project.css";

const renderLanguageIcon = (topic) => {
  switch (topic) {
    case "html":
      return <li><img src={htmlIcon} alt="HTML" className="language-icon" /></li>;
    case "javascript":
      return <li><img src={javascriptIcon} alt="JavaScript" className="language-icon" /></li>;
    case "typescript":
      return <li><img src={typescriptIcon} alt="TypeScript" className="language-icon" /></li>;
    case "python":
      return <li><img src={pythonIcon} alt="Python" className="language-icon" /></li>;
    case "java":
      return <li><img src={javaIcon} alt="Java" className="language-icon" /></li>;
    case "vba":
      return <li key={topic}><img src={vbaIcon} alt="VBA" className="language-icon" /></li>;
    case "sql":
      return <li key={topic}><img src={sqlIcon} alt="SQL" className="language-icon" /></li>;
    default:
      return null;
  }
};

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
            <h2 className="project-name">{projectData.name}</h2>
          </div>
          <div className="row">
            <ul>
              {projectData.demo_link && 
                <li>
                  <a
                    href={projectData.demo_link} 
                    target="_blank"
                    rel="noreferrer"
                    title={`Click to view a live demo of the ${projectData.name} project.`}
                    className="live-demo-link"
                  >
                    Live Demo{" "}<span className="circle"></span>
                  </a>
                </li>
              }
              <li 
                onClick={() => {}}
                className="learn-more"
                title={`Click to learn more about the ${projectData.name} project.`}
              >
                Learn More
              </li>
            </ul>
          </div>
          <div className="row">
            <ul className="language-icons">
              {projectData.topics.map(topic => renderLanguageIcon(topic))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Project;
