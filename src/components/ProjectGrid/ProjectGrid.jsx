// React
import React, { useMemo } from "react";

// Custom Components
import Project from "./Project/Project.jsx";

import { defaultOrder } from "./ProjectGrid.controller";

// Custom styles
import "./ProjectGrid.css";

const ProjectGrid = ({ projects }) => {
  const orderedProjects = useMemo(() => defaultOrder(projects), [projects]);

  return (
    <section id="project-grid">
      {orderedProjects &&
        orderedProjects.map((project) => {
          return <Project key={project.name} projectData={project} />;
        })}
        <div id="project-grid-overlay"></div>
    </section>
  );
};

export default ProjectGrid;
