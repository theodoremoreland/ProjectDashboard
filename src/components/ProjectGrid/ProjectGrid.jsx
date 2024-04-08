// React
import React from "react";

// Custom Components
import Project from "./Project/Project.jsx";

// Custom styles
import "./ProjectGrid.css";

const ProjectGrid = ({ projects, setSelectedProject }) => {

  return (
    <section id="project-grid">
      {projects &&
        projects.map((project) => {
          return  <Project 
                    key={project.name} 
                    projectData={project} 
                    setSelectedProject={setSelectedProject}
                  />;
        })}
        <div id="project-grid-overlay"></div>
    </section>
  );
};

export default ProjectGrid;
