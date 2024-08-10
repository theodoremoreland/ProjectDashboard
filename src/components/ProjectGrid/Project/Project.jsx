// React
import React from "react";

// Third party
import { useInView } from "react-intersection-observer";

// Images
import alt from "../../../images/under-construction-thumbnail.jpg";
import htmlIcon from "../../../images/languages/html.png";
import javascriptIcon from "../../../images/languages/javascript.png";
import typescriptIcon from "../../../images/languages/typescript.png";
import pythonIcon from "../../../images/languages/python.png";
import javaIcon from "../../../images/languages/java.png";
import vbaIcon from "../../../images/languages/vba.png";
import sqlIcon from "../../../images/languages/sql.png";

// Custom styles
import "./Project.css";

const renderLanguageIcon = (topic) => {
  const titleTemplate = "This project was written with ";

  switch (topic) {
    case "html":
      return <li key={topic} title={titleTemplate + "HTML"}><img src={htmlIcon} alt="HTML" className="language-icon" /></li>;
    case "javascript":
      return <li key={topic} title={titleTemplate + "JavaScript"}><img src={javascriptIcon} alt="JavaScript" className="language-icon" /></li>;
    case "typescript":
      return <li key={topic} title={titleTemplate + "TypeScript"}><img src={typescriptIcon} alt="TypeScript" className="language-icon" /></li>;
    case "python":
      return <li key={topic} title={titleTemplate + "Python"}><img src={pythonIcon} alt="Python" className="language-icon" /></li>;
    case "java":
      return <li key={topic} title={titleTemplate + "Java"}><img src={javaIcon} alt="Java" className="language-icon" /></li>;
    case "vba":
      return <li key={topic} title={titleTemplate + "VBA"}><img src={vbaIcon} alt="VBA" className="language-icon" /></li>;
    case "sql":
      return <li key={topic} title={titleTemplate + "SQL"}><img src={sqlIcon} alt="SQL" className="language-icon" /></li>;
    default:
      return null;
  }
};

const Project = ({ projectData, setSelectedProject }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div
      ref={ref}
      className={`project-card ${projectData.isFeatured ? 'featured' : 'not-featured'}`}
    >
      <img
        className="project-image"
        loading="lazy"
        src={projectData.image}
        alt={projectData.name}
        onError={(e) => {
          if (e.target.src !== alt) {
            e.target.src = alt;
          }
        }}
      />
      { inView &&
        <div className="project-overlay"> 
          <div id="content">
            <div className="row">
              <h2 className="project-name">{projectData.name}</h2>
            </div>
            <div className="row">
              <ul>
                {projectData.demo_link && projectData.name !== "ProjectList" &&
                  // <a> tag needs to wrap the <li> tag to make the entire list item clickable.
                  <a
                    href={projectData.demo_link} 
                    target="_blank"
                    rel="noreferrer"
                    title={`Click to view a live demo of the ${projectData.name} project.`}
                    className="live-demo-link"
                  >
                    <li className="live-demo">
                        Live Demo{" "}<span className="circle"></span>
                    </li>
                  </a>
                }
                {/* Putting the onClick handler on the div because
                    the padding on the button wasn't triggering to onClick event.
                    This is a workaround to make the button padding clickable. 
                */}
                <li 
                  onClick={() => setSelectedProject(projectData)}
                  role="presentation"
                  className="learn-more"
                  title={`Click to learn more about the ${projectData.name} project.`}
                >
                  <button
                    type="button"
                    className="learn-more-button"
                  >
                    Learn More
                  </button>
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
      }
    </div>
  );
};

export default Project;
